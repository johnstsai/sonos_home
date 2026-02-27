"""Sonos utilities"""
import time
import json
from pathlib import Path
from flask import current_app

try:
    from soco import SoCo, discover
    from soco.exceptions import SoCoException
    HAVE_SOCO = True
except ImportError:
    HAVE_SOCO = False
    SoCo = None
    discover = None


def get_sonos_status():
    """Get status of all Sonos players"""
    if not HAVE_SOCO:
        return {"error": "SoCo not installed", "players": []}
    
    timeout = current_app.config['SONOS_DISCOVERY_TIMEOUT']
    devices = discover(timeout=timeout)
    
    if not devices:
        return {"players": [], "timestamp": time.time()}
    
    players = []
    for p in devices:
        try:
            player_info = {
                "name": getattr(p, 'player_name', None),
                "ip": getattr(p, 'ip_address', None),
                "uid": getattr(p, 'uid', None),
            }
            
            # Get transport info
            try:
                player_info['transport'] = p.get_current_transport_info()
            except Exception:
                player_info['transport'] = None
            
            # Get track info
            try:
                player_info['track'] = p.get_current_track_info()
            except Exception:
                player_info['track'] = None
            
            # Get volume and mute
            try:
                player_info['volume'] = p.volume
            except Exception:
                player_info['volume'] = None
            
            try:
                player_info['mute'] = p.mute if hasattr(p, 'mute') else None
            except Exception:
                player_info['mute'] = None
            
            # Get coordinator status
            try:
                player_info['is_coordinator'] = getattr(p, 'is_coordinator', None)
            except Exception:
                player_info['is_coordinator'] = None
            
            players.append(player_info)
        except Exception as e:
            players.append({
                "name": getattr(p, "player_name", "unknown"), 
                "ip": getattr(p, "ip_address", None), 
                "error": str(e)
            })
    
    result = {"timestamp": time.time(), "players": players}
    
    # Save to file
    data_dir = Path(current_app.config['DATA_DIR'])
    with open(data_dir / "last_sonos.json", "w", encoding="utf-8") as f:
        json.dump(result, f, ensure_ascii=False, indent=2)
    
    return result


def run_diagnostics(action):
    """Run Sonos diagnostic operations"""
    if not HAVE_SOCO:
        return {'error': 'SoCo not installed', 'success': False}
    
    results = {'action': action, 'success': False, 'details': []}
    timeout = current_app.config['SONOS_DISCOVERY_TIMEOUT']
    
    try:
        if action == 'refresh':
            devices = discover(timeout=timeout)
            if devices:
                results['details'] = [{'name': d.player_name, 'ip': d.ip_address} for d in devices]
                results['success'] = True
                results['message'] = f'Found {len(devices)} device(s)'
            else:
                results['message'] = 'No devices found'
                
        elif action == 'ungroup_all':
            devices = discover(timeout=timeout)
            if devices:
                ungrouped = 0
                for device in devices:
                    try:
                        device.unjoin()
                        ungrouped += 1
                        results['details'].append({'name': device.player_name, 'status': 'ungrouped'})
                    except Exception as e:
                        results['details'].append({'name': device.player_name, 'error': str(e)})
                results['success'] = ungrouped > 0
                results['message'] = f'Ungrouped {ungrouped} device(s)'
            else:
                results['message'] = 'No devices found'
                
        elif action == 'mute_all':
            devices = discover(timeout=timeout)
            if devices:
                muted = 0
                for device in devices:
                    try:
                        device.mute = True
                        muted += 1
                        results['details'].append({'name': device.player_name, 'status': 'muted'})
                    except Exception as e:
                        results['details'].append({'name': device.player_name, 'error': str(e)})
                results['success'] = muted > 0
                results['message'] = f'Muted {muted} device(s)'
            else:
                results['message'] = 'No devices found'
                
        elif action == 'unmute_all':
            devices = discover(timeout=timeout)
            if devices:
                unmuted = 0
                for device in devices:
                    try:
                        device.mute = False
                        unmuted += 1
                        results['details'].append({'name': device.player_name, 'status': 'unmuted'})
                    except Exception as e:
                        results['details'].append({'name': device.player_name, 'error': str(e)})
                results['success'] = unmuted > 0
                results['message'] = f'Unmuted {unmuted} device(s)'
            else:
                results['message'] = 'No devices found'
                
        elif action == 'check_network':
            import subprocess
            devices = discover(timeout=timeout)
            if devices:
                for device in devices:
                    try:
                        # Ping test
                        result = subprocess.run(['ping', '-c', '1', '-W', '1', device.ip_address], 
                                              capture_output=True, timeout=2)
                        ping_ok = result.returncode == 0
                        
                        # Try to get basic info
                        try:
                            info = device.get_speaker_info()
                            info_ok = True
                        except:
                            info_ok = False
                            
                        results['details'].append({
                            'name': device.player_name,
                            'ip': device.ip_address,
                            'ping': 'OK' if ping_ok else 'FAIL',
                            'api': 'OK' if info_ok else 'FAIL',
                            'status': 'healthy' if (ping_ok and info_ok) else 'issue'
                        })
                    except Exception as e:
                        results['details'].append({
                            'name': device.player_name,
                            'ip': device.ip_address,
                            'error': str(e)
                        })
                results['success'] = True
                results['message'] = f'Checked {len(devices)} device(s)'
            else:
                results['message'] = 'No devices found'
                
        elif action == 'check_sync':
            devices = discover(timeout=timeout)
            if devices:
                for device in devices:
                    try:
                        group_state = device.group
                        is_coordinator = device.is_coordinator
                        transport = device.get_current_transport_info()
                        
                        results['details'].append({
                            'name': device.player_name,
                            'ip': device.ip_address,
                            'coordinator': is_coordinator,
                            'group_members': len(group_state.members),
                            'transport_state': transport.get('current_transport_state', 'UNKNOWN')
                        })
                    except Exception as e:
                        results['details'].append({
                            'name': device.player_name,
                            'error': str(e)
                        })
                results['success'] = True
                results['message'] = f'Checked sync for {len(devices)} device(s)'
            else:
                results['message'] = 'No devices found'
        else:
            results['message'] = f'Unknown action: {action}'
            
    except Exception as e:
        results['error'] = str(e)
        results['message'] = f'Error: {str(e)}'
    
    return results


def control_speaker(action, speaker_ips, params=None):
    """
    Control Sonos speakers
    
    Args:
        action: play, pause, next, previous, volume_up, volume_down, mute, unmute, set_volume, play_uri
        speaker_ips: List of speaker IP addresses
        params: Additional parameters (volume, uri, etc.)
    """
    if not HAVE_SOCO:
        return {'error': 'SoCo not installed', 'status': 'failed'}
    
    if not speaker_ips:
        return {'error': 'No speakers specified', 'status': 'failed'}
    
    params = params or {}
    results = []
    
    for ip in speaker_ips:
        if not ip:
            continue
            
        try:
            speaker = SoCo(ip)
            result = {'speaker': ip, 'name': speaker.player_name}
            
            if action == 'play':
                speaker.play()
                result['status'] = 'playing'
                
            elif action == 'pause':
                speaker.pause()
                result['status'] = 'paused'
                
            elif action == 'next':
                speaker.next()
                result['status'] = 'next track'
                
            elif action == 'previous':
                speaker.previous()
                result['status'] = 'previous track'
                
            elif action == 'volume_up':
                current = speaker.volume
                new_vol = min(100, current + 5)
                speaker.volume = new_vol
                result['status'] = f'volume: {new_vol}'
                
            elif action == 'volume_down':
                current = speaker.volume
                new_vol = max(0, current - 5)
                speaker.volume = new_vol
                result['status'] = f'volume: {new_vol}'
                
            elif action == 'set_volume':
                volume = params.get('volume', 30)
                speaker.volume = max(0, min(100, int(volume)))
                result['status'] = f'volume: {volume}'
                
            elif action == 'mute':
                speaker.mute = True
                result['status'] = 'muted'
                
            elif action == 'unmute':
                speaker.mute = False
                result['status'] = 'unmuted'
                
            elif action == 'play_uri':
                uri = params.get('uri', '')
                if uri:
                    speaker.play_uri(uri)
                    result['status'] = 'playing uri'
                else:
                    result['error'] = 'No URI specified'
                    
            elif action == 'play_content':
                uri = params.get('uri', '')
                if uri:
                    print(f"[INFO] Playing content on {speaker.player_name}: {uri}")
                    # Clear queue and play
                    speaker.clear_queue()
                    speaker.add_uri_to_queue(uri)
                    speaker.play_from_queue(0)
                    result['status'] = f'播放中於 {speaker.player_name}'
                else:
                    result['error'] = 'No URI specified'
            else:
                result['error'] = f'Unknown action: {action}'
                
            results.append(result)
            
        except Exception as e:
            print(f"[ERROR] Speaker control failed for {ip}: {e}")
            import traceback
            traceback.print_exc()
            results.append({'speaker': ip, 'error': str(e)})
    
    # Check if all failed
    all_failed = all('error' in r for r in results)
    if all_failed and results:
        return {'error': results[0].get('error', 'Unknown error'), 'status': 'failed', 'results': results}
    
    return {'status': 'OK', 'action': action, 'results': results}


def search_music(query, service='library'):
    """
    Search for music in Sonos library or streaming services
    
    Args:
        query: Search query string (empty string = browse all)
        service: 'library', 'spotify', 'apple_music', 'tunein', etc.
    """
    if not HAVE_SOCO:
        return []
    
    try:
        # Get first available device for searching
        devices = discover(timeout=2)
        if not devices:
            return []
        
        device = list(devices)[0]
        results = []
        
        if service == 'library':
            # If query is empty, browse all library content
            if not query:
                try:
                    # Get all tracks (up to 100)
                    track_result = device.music_library.get_tracks(max_items=100)
                    for track in track_result:
                        results.append({
                            'type': 'track',
                            'title': track.title,
                            'artist': getattr(track, 'creator', '未知演出者'),
                            'album': getattr(track, 'album', ''),
                            'uri': track.get_uri(),
                            'id': track.item_id
                        })
                    print(f"[INFO] Browsing library: found {len(results)} tracks (total: {track_result.total_matches})")
                except Exception as e:
                    print(f"Browse library error: {e}")
                    import traceback
                    traceback.print_exc()
            else:
                # Search music library
                try:
                    # Search tracks
                    tracks = device.music_library.search_track(query, max_items=20)
                    for track in tracks:
                        results.append({
                            'type': 'track',
                            'title': track.title,
                            'artist': getattr(track, 'creator', '未知演出者'),
                            'album': getattr(track, 'album', ''),
                            'uri': track.get_uri(),
                            'id': track.item_id
                        })
                except Exception as e:
                    print(f"Track search error: {e}")
                
                # Search albums
                try:
                    albums = device.music_library.search_album(query, max_items=10)
                    for album in albums:
                        results.append({
                            'type': 'album',
                            'title': album.title,
                            'artist': getattr(album, 'creator', '未知演出者'),
                            'uri': album.get_uri(),
                            'id': album.item_id
                        })
                except Exception as e:
                    print(f"Album search error: {e}")
                
        elif service in ['spotify', 'apple_music', 'amazon_music', 'tidal', 'deezer']:
            # Search using music services API
            try:
                from soco.music_services import MusicService
                
                # Get available music services
                services = device.music_services
                service_map = {
                    'spotify': 'Spotify',
                    'apple_music': 'Apple Music',
                    'amazon_music': 'Amazon Music',
                    'tidal': 'Tidal',
                    'deezer': 'Deezer',
                    'youtube_music': 'YouTube Music'
                }
                
                target_service_name = service_map.get(service, service)
                music_service = None
                
                # Find the requested service
                debug_services = [svc.service_name for svc in services]
                print(f"[DEBUG] Available music_services: {debug_services}")
                # Find the requested service
                for svc in services:
                    if target_service_name.lower() in svc.service_name.lower():
                        music_service = svc
                        break
                if music_service:
                    # Search tracks
                    try:
                        search_results = music_service.search(
                            category='tracks',
                            term=query,
                            start=0,
                            max_items=20
                        )
                        if not search_results:
                            print(f"[DEBUG] No tracks found for {service} with query '{query}'")
                        for item in search_results:
                            results.append({
                                'type': 'track',
                                'title': getattr(item, 'title', 'Unknown'),
                                'artist': getattr(item, 'creator', 'Unknown'),
                                'album': getattr(item, 'album', ''),
                                'uri': item.get_uri() if hasattr(item, 'get_uri') else '',
                                'id': getattr(item, 'item_id', ''),
                                'service': service
                            })
                    except Exception as e:
                        print(f"{service} track search error: {e}")
                        results.append({
                            'type': 'error',
                            'title': f'{target_service_name} 搜尋失敗',
                            'artist': str(e),
                            'uri': '',
                            'service': service
                        })
                    # Search albums
                    try:
                        album_results = music_service.search(
                            category='albums',
                            term=query,
                            start=0,
                            max_items=10
                        )
                        if not album_results:
                            print(f"[DEBUG] No albums found for {service} with query '{query}'")
                        for item in album_results:
                            results.append({
                                'type': 'album',
                                'title': getattr(item, 'title', 'Unknown'),
                                'artist': getattr(item, 'creator', 'Unknown'),
                                'uri': item.get_uri() if hasattr(item, 'get_uri') else '',
                                'id': getattr(item, 'item_id', ''),
                                'service': service
                            })
                    except Exception as e:
                        print(f"{service} album search error: {e}")
                        results.append({
                            'type': 'error',
                            'title': f'{target_service_name} 專輯搜尋失敗',
                            'artist': str(e),
                            'uri': '',
                            'service': service
                        })
                else:
                    print(f"[DEBUG] {target_service_name} not found in music_services: {debug_services}")
                    results.append({
                        'type': 'info',
                        'title': f'{target_service_name} 未配對或 API 不支援',
                        'artist': f'請在 Sonos App 中設定 {target_service_name} 服務，或該服務不支援搜尋',
                        'uri': '',
                        'service': service
                    })
                    
            except Exception as e:
                print(f"Music service search error: {e}")
                results.append({
                    'type': 'error',
                    'title': '搜尋錯誤',
                    'artist': str(e),
                    'uri': '',
                    'service': service
                })
                
        elif service == 'tunein':
            # Search TuneIn radio stations
            try:
                from soco.music_services import MusicService
                # This is a simplified version - real implementation would need proper TuneIn integration
                results.append({
                    'type': 'info',
                    'title': 'TuneIn 搜尋尚未完整實作',
                    'artist': '請使用 Sonos App 搜尋 TuneIn',
                    'uri': ''
                })
            except Exception as e:
                print(f"TuneIn search error: {e}")
        
        return results[:30]  # Limit to 30 results
        
    except Exception as e:
        print(f"Search error: {e}")
        return []


def get_queue(speaker_ip=None):
    """Get current playback queue for a speaker"""
    if not HAVE_SOCO:
        return []
    
    try:
        if speaker_ip:
            speaker = SoCo(speaker_ip)
        else:
            # Get first available device
            devices = discover(timeout=2)
            if not devices:
                return []
            speaker = list(devices)[0]
        
        queue = speaker.get_queue(max_items=50)
        
        results = []
        for idx, item in enumerate(queue):
            results.append({
                'position': idx,
                'title': item.title,
                'artist': item.creator,
                'album': item.album,
                'uri': item.get_uri()
            })
        
        return results
        
    except Exception as e:
        print(f"Queue error: {e}")
        return []


def text_to_speech(text, speaker_ips, language='zh-TW', slow=False, volume=40):
    """
    Convert text to speech and play on Sonos speakers
    
    Args:
        text: Text to convert to speech
        speaker_ips: List of speaker IP addresses
        language: Language code (zh-TW, en, etc.)
        slow: Speak slowly
    """
    if not HAVE_SOCO:
        return {'error': 'SoCo not installed', 'status': 'failed'}
    
    if not speaker_ips:
        return {'error': 'No speakers specified', 'status': 'failed'}
    
    if not text or not text.strip():
        return {'error': 'No text provided', 'status': 'failed'}
    
    try:
        from gtts import gTTS
        import tempfile
        import os
        from flask import url_for, request
        
        # Generate TTS MP3
        print(f"[TTS] Generating speech: '{text}' in {language}")
        tts = gTTS(text=text, lang=language, slow=slow)
        
        # Save to temp file
        temp_dir = Path(current_app.config['DATA_DIR']) / 'tts'
        temp_dir.mkdir(parents=True, exist_ok=True)
        
        # Use timestamp to make unique filename
        filename = f"tts_{int(time.time())}.mp3"
        filepath = temp_dir / filename
        tts.save(str(filepath))
        
        print(f"[TTS] Saved to: {filepath}")
        
        # Get the URL for Sonos to access
        # Sonos needs to access via local network IP, not 127.0.0.1
        import socket
        try:
            # Get local IP address
            s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
            s.connect(("8.8.8.8", 80))
            local_ip = s.getsockname()[0]
            s.close()
        except:
            local_ip = request.host.split(':')[0]
        
        # Use /api/tts prefix since blueprint is registered with /api
        port = request.host.split(':')[1] if ':' in request.host else '5000'
        tts_url = f"http://{local_ip}:{port}/api/tts/{filename}"
        
        print(f"[TTS] URL: {tts_url}")
        
        # Play on selected speakers
        results = []
        for ip in speaker_ips:
            try:
                speaker = SoCo(ip)
                
                # Save current volume
                original_volume = speaker.volume
                
                # Stop current playback and clear queue
                try:
                    speaker.stop()
                    speaker.clear_queue()
                except:
                    pass  # Ignore errors if already stopped
                
                # Set volume to 40 for TTS (loud enough to hear)
                speaker.volume = volume
                print(f"[TTS] Set volume to {volume} (was {original_volume})")
                
                # Add TTS to queue and play
                # Use add_uri_to_queue instead of play_uri to avoid UPnP Error 701
                speaker.add_uri_to_queue(tts_url)
                speaker.play_from_queue(0)  # Play first item in queue
                
                results.append({
                    'speaker': ip,
                    'name': speaker.player_name,
                    'status': 'playing TTS',
                    'volume': volume,
                    'original_volume': original_volume,
                    'success': True
                })
                print(f"[TTS] Playing on {speaker.player_name}")
            except Exception as e:
                print(f"[TTS] Error on {ip}: {e}")
                results.append({
                    'speaker': ip,
                    'error': str(e),
                    'success': False
                })
        
        # Check if any succeeded
        success_count = sum(1 for r in results if r.get('success', False))
        
        return {
            'success': success_count > 0,
            'status': 'OK' if success_count > 0 else 'failed',
            'message': f'TTS播放到 {success_count} 個喇叭',
            'file': filename,
            'url': tts_url,
            'results': results
        }
        
    except Exception as e:
        print(f"[TTS] Error: {e}")
        import traceback
        traceback.print_exc()
        return {
            'success': False,
            'error': str(e),
            'status': 'failed'
        }
