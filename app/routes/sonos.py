"""Sonos API routes"""
from flask import Blueprint, jsonify, request, send_file
from pathlib import Path
from app.utils.sonos import (
    get_sonos_status, run_diagnostics, control_speaker, 
    search_music, get_queue, text_to_speech, HAVE_SOCO
)

bp = Blueprint('sonos', __name__)


@bp.route("/sonos_status")
def api_sonos_status():
    """Get Sonos player status"""
    try:
        res = get_sonos_status()
        if not res or not isinstance(res, dict):
            return jsonify({
                "error": "No Sonos data.",
                "players": []
            })
        if "players" not in res:
            res["players"] = []
        return jsonify(res)
    except Exception as e:
        return jsonify({
            "error": f"Exception: {str(e)}",
            "players": []
        })


@bp.route('/sonos_diagnostics', methods=['POST'])
def api_sonos_diagnostics():
    """Sonos diagnostic and fix operations"""
    if not HAVE_SOCO:
        return jsonify({'error': 'SoCo not installed'}), 400
    
    action = request.json.get('action') if request.json else None
    if not action:
        return jsonify({'error': 'No action specified'}), 400
    
    results = run_diagnostics(action)
    return jsonify(results)


@bp.route('/sonos_group', methods=['POST'])
def api_sonos_group():
    """Group Sonos speakers"""
    if not HAVE_SOCO:
        return jsonify({'error': 'SoCo not installed'}), 400
    
    # Placeholder for grouping functionality
    return jsonify({'status': 'grouping not yet implemented'})


@bp.route('/sonos_search')
def api_sonos_search():
    """Search for music content"""
    if not HAVE_SOCO:
        return jsonify({'error': 'SoCo not installed'}), 400
    
    q = request.args.get('q') or ''
    service = request.args.get('service', 'library')  # library, spotify, tunein
    
    try:
        results = search_music(q, service)
        return jsonify({'results': results, 'query': q, 'service': service})
    except Exception as e:
        return jsonify({'error': str(e), 'results': []})


@bp.route('/sonos_control', methods=['POST'])
def api_sonos_control():
    """Control Sonos speakers (play, pause, volume, etc.)"""
    if not HAVE_SOCO:
        return jsonify({'error': 'SoCo not installed'}), 400
    
    data = request.json or {}
    action = data.get('action')
    speakers = data.get('speakers', [])
    params = data.get('params', {})
    
    if not action:
        return jsonify({'error': 'No action specified'}), 400
    
    print(f"[DEBUG] Received control request: action={action}, speakers={speakers}, params={params}")
    
    try:
        result = control_speaker(action, speakers, params)
        return jsonify(result)
    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({'error': str(e), 'status': 'failed'})


@bp.route('/sonos_queue')
def api_sonos_queue():
    """Get current playback queue"""
    if not HAVE_SOCO:
        return jsonify({'error': 'SoCo not installed'}), 400
    
    speaker_ip = request.args.get('speaker')
    
    try:
        queue = get_queue(speaker_ip)
        return jsonify({'queue': queue})
    except Exception as e:
        return jsonify({'error': str(e), 'queue': []})


@bp.route('/sonos_tts', methods=['POST'])
def api_sonos_tts():
    """Text to speech on Sonos"""
    if not HAVE_SOCO:
        return jsonify({'error': 'SoCo not installed'}), 400
    
    data = request.json or {}
    text = data.get('text', '')
    speakers = data.get('speakers', [])
    language = data.get('language', 'zh-TW')
    slow = data.get('slow', False)
    volume = data.get('volume', 40)  # Default volume 40
    
    if not text:
        return jsonify({'error': 'No text provided'}), 400
    
    if not speakers:
        return jsonify({'error': 'No speakers selected'}), 400
    
    try:
        result = text_to_speech(text, speakers, language, slow, volume)
        return jsonify(result)
    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({'error': str(e), 'status': 'failed'})


@bp.route('/tts/<filename>')
def serve_tts_file(filename):
    """Serve TTS audio files"""
    from flask import current_app
    tts_dir = Path(current_app.config['DATA_DIR']) / 'tts'
    filepath = tts_dir / filename
    
    if not filepath.exists():
        return jsonify({'error': 'File not found'}), 404
    
    return send_file(filepath, mimetype='audio/mpeg')


@bp.route('/broadcast_audio', methods=['POST'])
def api_broadcast_audio():
    """Broadcast recorded audio to Sonos"""
    if not HAVE_SOCO:
        return jsonify({'error': 'SoCo not installed'}), 400
    
    if 'audio' not in request.files:
        return jsonify({'error': 'No audio file provided'}), 400
    
    audio_file = request.files['audio']
    speaker_ip = request.form.get('speaker')
    volume = int(request.form.get('volume', 40))
    
    if not speaker_ip:
        return jsonify({'error': 'No speaker specified'}), 400
    
    try:
        from flask import current_app
        from pydub import AudioSegment
        import tempfile
        import os
        
        # Create recordings directory
        recordings_dir = Path(current_app.config['DATA_DIR']) / 'recordings'
        recordings_dir.mkdir(parents=True, exist_ok=True)
        
        # Save uploaded file temporarily
        temp_path = tempfile.mktemp(suffix='.webm')
        audio_file.save(temp_path)
        
        # Convert WebM to MP3
        audio = AudioSegment.from_file(temp_path, format='webm')
        
        # Generate filename
        import time
        filename = f'recording_{int(time.time())}.mp3'
        mp3_path = recordings_dir / filename
        
        # Export as MP3
        audio.export(str(mp3_path), format='mp3', bitrate='128k')
        
        # Clean up temp file
        os.remove(temp_path)
        
        print(f"[Recording] Saved to: {mp3_path}")
        
        # Get the URL for Sonos
        import socket
        try:
            s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
            s.connect(("8.8.8.8", 80))
            local_ip = s.getsockname()[0]
            s.close()
        except:
            local_ip = request.host.split(':')[0]
        
        port = request.host.split(':')[1] if ':' in request.host else '5050'
        audio_url = f"http://{local_ip}:{port}/api/recordings/{filename}"
        
        print(f"[Recording] URL: {audio_url}")
        
        # Play on Sonos
        from soco import SoCo
        speaker = SoCo(speaker_ip)
        
        # Save current volume
        original_volume = speaker.volume
        
        # Stop and clear
        try:
            speaker.stop()
            speaker.clear_queue()
        except:
            pass
        
        # Set volume
        speaker.volume = volume
        print(f"[Recording] Set volume to {volume} (was {original_volume})")
        
        # Add to queue and play
        speaker.add_uri_to_queue(audio_url)
        speaker.play_from_queue(0)
        
        print(f"[Recording] Playing on {speaker.player_name}")
        
        return jsonify({
            'success': True,
            'status': 'OK',
            'message': f'錄音播放到 {speaker.player_name}',
            'file': filename,
            'url': audio_url
        })
        
    except ImportError as e:
        return jsonify({
            'success': False,
            'error': 'pydub library not installed. Install it with: pip install pydub'
        }), 500
    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@bp.route('/recordings/<filename>')
def serve_recording_file(filename):
    """Serve recorded audio files"""
    from flask import current_app
    recordings_dir = Path(current_app.config['DATA_DIR']) / 'recordings'
    filepath = recordings_dir / filename
    
    if not filepath.exists():
        return jsonify({'error': 'File not found'}), 404
    
    return send_file(filepath, mimetype='audio/mpeg')


@bp.route('/audio_files')
def api_list_audio_files():
    """List all audio files (TTS and recordings)"""
    from flask import current_app
    import os
    from datetime import datetime
    
    try:
        data_dir = Path(current_app.config['DATA_DIR'])
        
        def get_file_info(filepath):
            stat = filepath.stat()
            size_bytes = stat.st_size
            if size_bytes < 1024:
                size_str = f"{size_bytes} B"
            elif size_bytes < 1024 * 1024:
                size_str = f"{size_bytes / 1024:.1f} KB"
            else:
                size_str = f"{size_bytes / (1024 * 1024):.1f} MB"
            
            mod_time = datetime.fromtimestamp(stat.st_mtime)
            date_str = mod_time.strftime('%Y-%m-%d %H:%M')
            
            return {
                'name': filepath.name,
                'size': size_str,
                'date': date_str,
                'timestamp': stat.st_mtime
            }
        
        # Get TTS files
        tts_dir = data_dir / 'tts'
        tts_files = []
        if tts_dir.exists():
            for f in tts_dir.glob('*.mp3'):
                tts_files.append(get_file_info(f))
        tts_files.sort(key=lambda x: x['timestamp'], reverse=True)
        
        # Get recording files
        recordings_dir = data_dir / 'recordings'
        recording_files = []
        if recordings_dir.exists():
            for f in recordings_dir.glob('*.mp3'):
                recording_files.append(get_file_info(f))
        recording_files.sort(key=lambda x: x['timestamp'], reverse=True)
        
        return jsonify({
            'success': True,
            'files': {
                'tts': tts_files,
                'recordings': recording_files
            }
        })
        
    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@bp.route('/audio_files/delete', methods=['POST'])
def api_delete_audio_file():
    """Delete a specific audio file"""
    from flask import current_app
    import os
    
    try:
        data = request.json
        file_type = data.get('type')  # 'tts' or 'recordings'
        filename = data.get('filename')
        
        if not file_type or not filename:
            return jsonify({'success': False, 'error': 'Missing parameters'}), 400
        
        data_dir = Path(current_app.config['DATA_DIR'])
        filepath = data_dir / file_type / filename
        
        if not filepath.exists():
            return jsonify({'success': False, 'error': 'File not found'}), 404
        
        os.remove(filepath)
        
        return jsonify({
            'success': True,
            'message': f'Deleted {filename}'
        })
        
    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@bp.route('/audio_files/clear', methods=['POST'])
def api_clear_audio_files():
    """Clear all files of a specific type"""
    from flask import current_app
    import os
    
    try:
        data = request.json
        file_type = data.get('type')  # 'tts' or 'recordings'
        
        if not file_type:
            return jsonify({'success': False, 'error': 'Missing type parameter'}), 400
        
        data_dir = Path(current_app.config['DATA_DIR'])
        target_dir = data_dir / file_type
        
        if not target_dir.exists():
            return jsonify({'success': True, 'deleted': 0})
        
        deleted = 0
        for f in target_dir.glob('*.mp3'):
            try:
                os.remove(f)
                deleted += 1
            except:
                pass
        
        return jsonify({
            'success': True,
            'deleted': deleted
        })
        
    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@bp.route('/audio_files/clear_all', methods=['POST'])
def api_clear_all_audio_files():
    """Clear all audio files (TTS and recordings)"""
    from flask import current_app
    import os
    
    try:
        data_dir = Path(current_app.config['DATA_DIR'])
        deleted = 0
        
        # Clear TTS files
        tts_dir = data_dir / 'tts'
        if tts_dir.exists():
            for f in tts_dir.glob('*.mp3'):
                try:
                    os.remove(f)
                    deleted += 1
                except:
                    pass
        
        # Clear recording files
        recordings_dir = data_dir / 'recordings'
        if recordings_dir.exists():
            for f in recordings_dir.glob('*.mp3'):
                try:
                    os.remove(f)
                    deleted += 1
                except:
                    pass
        
        return jsonify({
            'success': True,
            'deleted': deleted
        })
        
    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@bp.route('/audio_files/rename', methods=['POST'])
def api_rename_audio_file():
    """Rename an audio file"""
    from flask import current_app
    import os
    
    try:
        data = request.json
        file_type = data.get('type')  # 'tts' or 'recordings'
        old_filename = data.get('oldFilename')
        new_filename = data.get('newFilename')
        
        if not file_type or not old_filename or not new_filename:
            return jsonify({'success': False, 'error': 'Missing parameters'}), 400
        
        data_dir = Path(current_app.config['DATA_DIR'])
        old_path = data_dir / file_type / old_filename
        new_path = data_dir / file_type / new_filename
        
        if not old_path.exists():
            return jsonify({'success': False, 'error': 'File not found'}), 404
        
        if new_path.exists():
            return jsonify({'success': False, 'error': 'File with new name already exists'}), 400
        
        os.rename(old_path, new_path)
        
        return jsonify({
            'success': True,
            'message': f'Renamed to {new_filename}'
        })
        
    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@bp.route('/play_audio_file', methods=['POST'])
def api_play_audio_file():
    """Play an existing audio file to a speaker"""
    from flask import current_app
    
    try:
        data = request.json
        file_type = data.get('type')  # 'tts' or 'recordings'
        filename = data.get('filename')
        speaker_ip = data.get('speaker')
        volume = data.get('volume', 40)
        
        if not file_type or not filename or not speaker_ip:
            return jsonify({'success': False, 'error': 'Missing parameters'}), 400
        
        if not HAVE_SOCO:
            return jsonify({'success': False, 'error': 'SoCo library not installed'}), 500
        
        data_dir = Path(current_app.config['DATA_DIR'])
        audio_path = data_dir / file_type / filename
        
        if not audio_path.exists():
            return jsonify({'success': False, 'error': 'Audio file not found'}), 404
        
        # Get the URL for Sonos
        import socket
        try:
            s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
            s.connect(("8.8.8.8", 80))
            local_ip = s.getsockname()[0]
            s.close()
        except:
            local_ip = request.host.split(':')[0]
        
        port = request.host.split(':')[1] if ':' in request.host else '5050'
        audio_url = f"http://{local_ip}:{port}/api/{file_type}/{filename}"
        
        # Play on Sonos
        from soco import SoCo
        speaker = SoCo(speaker_ip)
        
        # Save current volume
        original_volume = speaker.volume
        
        # Stop and clear
        try:
            speaker.stop()
            speaker.clear_queue()
        except:
            pass
        
        # Set volume
        speaker.volume = volume
        
        # Add to queue and play
        speaker.add_uri_to_queue(audio_url)
        speaker.play_from_queue(0)
        
        return jsonify({
            'success': True,
            'message': f'Playing {filename} on {speaker.player_name}'
        })
        
    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


# ========== Voice Assistant Routes ==========

@bp.route('/assistant/transcribe', methods=['POST'])
def api_assistant_transcribe():
    """Transcribe audio to text (supports local Whisper, OpenAI Whisper API, and Google Speech-to-Text)"""
    try:
        if 'audio' not in request.files:
            return jsonify({'success': False, 'error': 'No audio file'}), 400
        
        audio_file = request.files['audio']
        language = request.form.get('language', 'zh')
        
        # Save temporary file
        from flask import current_app
        import tempfile
        import os
        
        temp_dir = Path(tempfile.gettempdir())
        temp_path = temp_dir / f"question_{os.urandom(8).hex()}.webm"
        audio_file.save(temp_path)
        
        try:
            # Get speech provider
            speech_provider = current_app.config.get('SPEECH_PROVIDER', 'whisper-local')
            
            if speech_provider == 'whisper-local':
                # Use local Whisper (free, no API key needed)
                import whisper
                
                # Get model size from config (tiny, base, small, medium, large)
                model_size = current_app.config.get('WHISPER_MODEL', 'base')
                
                # Load model (will download on first use, then cache locally)
                model = whisper.load_model(model_size)
                
                # Transcribe audio
                result = model.transcribe(str(temp_path), language=language)
                text = result['text']
                
                # Clean up temp file
                os.remove(temp_path)
                
            elif speech_provider == 'google':
                # Use Google Speech-to-Text
                from google.cloud import speech
                import requests
                
                # Get API key
                api_key = os.environ.get('GOOGLE_CLOUD_API_KEY')
                if not api_key:
                    api_key = current_app.config.get('GOOGLE_CLOUD_API_KEY')
                
                if not api_key:
                    return jsonify({
                        'success': False,
                        'error': 'Google Cloud API key not configured. Get one free at https://console.cloud.google.com/'
                    }), 500
                
                # Convert webm to linear16 PCM
                from pydub import AudioSegment
                audio = AudioSegment.from_file(str(temp_path), format='webm')
                # Export as WAV (LINEAR16)
                wav_path = temp_path.with_suffix('.wav')
                audio.export(str(wav_path), format='wav', parameters=['-ac', '1', '-ar', '16000'])
                
                # Read audio file
                with open(wav_path, 'rb') as f:
                    audio_content = f.read()
                
                # Prepare request
                language_code = 'zh-TW' if language == 'zh' else 'en-US'
                
                url = f'https://speech.googleapis.com/v1/speech:recognize?key={api_key}'
                data = {
                    'config': {
                        'encoding': 'LINEAR16',
                        'sampleRateHertz': 16000,
                        'languageCode': language_code,
                    },
                    'audio': {
                        'content': __import__('base64').b64encode(audio_content).decode('utf-8')
                    }
                }
                
                response = requests.post(url, json=data)
                result = response.json()
                
                # Clean up temp files
                os.remove(temp_path)
                os.remove(wav_path)
                
                if 'results' in result and len(result['results']) > 0:
                    text = result['results'][0]['alternatives'][0]['transcript']
                else:
                    error_msg = result.get('error', {}).get('message', 'No transcription results')
                    return jsonify({
                        'success': False,
                        'error': f'Google Speech-to-Text error: {error_msg}'
                    }), 500
                
            else:
                # Use OpenAI Whisper API
                import openai
                
                # Get API key
                api_key = os.environ.get('OPENAI_API_KEY')
                if not api_key:
                    api_key = current_app.config.get('OPENAI_API_KEY')
                
                if not api_key:
                    return jsonify({
                        'success': False,
                        'error': 'OpenAI API key not configured'
                    }), 500
                
                # Initialize OpenAI client
                client = openai.OpenAI(api_key=api_key)
                
                # Transcribe audio
                with open(temp_path, 'rb') as audio:
                    transcript = client.audio.transcriptions.create(
                        model="whisper-1",
                        file=audio,
                        language=language
                    )
                
                text = transcript.text
                
                # Clean up temp file
                os.remove(temp_path)
            
            return jsonify({
                'success': True,
                'text': text
            })
            
        except Exception as e:
            # Clean up temp file on error
            if temp_path.exists():
                os.remove(temp_path)
            import traceback
            traceback.print_exc()
            raise e
            
    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@bp.route('/assistant/chat', methods=['POST'])
def api_assistant_chat():
    """Get AI response (supports OpenAI and Gemini)"""
    try:
        data = request.json
        question = data.get('question', '')
        context = data.get('context', [])
        
        if not question:
            return jsonify({'success': False, 'error': 'No question provided'}), 400
        
        import os
        from flask import current_app
        
        # Get AI provider
        ai_provider = current_app.config.get('AI_PROVIDER', 'gemini')
        
        if ai_provider == 'gemini':
            # Use Google Gemini
            import google.generativeai as genai
            
            # Get API key
            api_key = os.environ.get('GEMINI_API_KEY')
            if not api_key:
                api_key = current_app.config.get('GEMINI_API_KEY')
            
            if not api_key:
                return jsonify({
                    'success': False,
                    'error': 'Gemini API key not configured. Get one free at https://ai.google.dev/'
                }), 500
            
            # Configure Gemini
            genai.configure(api_key=api_key)
            
            # Get model name from config
            model_name = current_app.config.get('GEMINI_MODEL', 'gemini-1.5-flash')
            model = genai.GenerativeModel(model_name)
            
            # Build conversation history
            chat_history = []
            for msg in context:
                role = 'user' if msg.get('role') == 'user' else 'model'
                chat_history.append({
                    'role': role,
                    'parts': [msg.get('content', '')]
                })
            
            # Start chat with history
            chat = model.start_chat(history=chat_history)
            
            # Add instruction to keep response concise (under 10 seconds when spoken)
            enhanced_question = f"{question}\n\n(請在10秒內用簡潔的方式回答，不要過於冗長)"
            
            # Send question
            response = chat.send_message(enhanced_question)
            answer = response.text
            
        else:
            # Use OpenAI
            import openai
            
            # Get API key
            api_key = os.environ.get('OPENAI_API_KEY')
            if not api_key:
                api_key = current_app.config.get('OPENAI_API_KEY')
            
            if not api_key:
                return jsonify({
                    'success': False,
                    'error': 'OpenAI API key not configured'
                }), 500
            
            # Initialize OpenAI client
            client = openai.OpenAI(api_key=api_key)
            
            # Build messages array
            messages = [
                {
                    "role": "system",
                    "content": "你是一個友善且有幫助的 AI 助理。請用繁體中文回答問題，回答要簡潔明確，控制在10秒內可以念完的長度（大約50-80字）。"
                }
            ]
            
            # Add conversation context
            messages.extend(context)
            
            # Add current question with concise instruction
            messages.append({
                "role": "user",
                "content": f"{question}\n\n(請簡潔回答，避免冗長)"
            })
            
            # Get model name from config
            model_name = current_app.config.get('OPENAI_MODEL', 'gpt-3.5-turbo')
            
            # Get ChatGPT response
            response = client.chat.completions.create(
                model=model_name,
                messages=messages,
                temperature=0.7,
                max_tokens=500
            )
            
            answer = response.choices[0].message.content
        
        return jsonify({
            'success': True,
            'response': answer
        })
        
    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@bp.route('/assistant/respond', methods=['POST'])
def api_assistant_respond():
    """Convert text to speech and play on Sonos"""
    try:
        data = request.json
        text = data.get('text', '')
        speaker_ip = data.get('speaker', '')
        language = data.get('language', 'zh-TW')
        volume = int(data.get('volume', 50))
        
        if not text:
            return jsonify({'success': False, 'error': 'No text provided'}), 400
        
        if not speaker_ip:
            return jsonify({'success': False, 'error': 'No speaker selected'}), 400
        
        # Use existing TTS function
        result = text_to_speech(
            text=text,
            language=language,
            slow=False,
            speaker_ips=[speaker_ip],
            volume=volume
        )
        
        if result.get('success'):
            return jsonify({
                'success': True,
                'message': 'Playing response on Sonos'
            })
        else:
            return jsonify({
                'success': False,
                'error': result.get('error', 'Failed to play response')
            }), 500
            
    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500
