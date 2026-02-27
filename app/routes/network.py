"""Network API routes"""
from flask import Blueprint, jsonify, request, send_file
from pathlib import Path
from flask import current_app
from app.utils.network import scan_network, detect_local_network
import socket
import time
import http.client

bp = Blueprint('network', __name__)


@bp.route("/scan_network")
def api_scan_network():
    """Scan network for active hosts"""
    net = request.args.get("net") or detect_local_network()
    try:
        out = scan_network(net)
        return jsonify(out)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@bp.route("/download_csv")
def api_download_csv():
    """Download scan results as CSV"""
    data_dir = Path(current_app.config['DATA_DIR'])
    csv_path = data_dir / "last_scan.csv"
    
    if not csv_path.exists():
        return jsonify({'error': 'no scan data available'}), 404
    
    return send_file(str(csv_path), as_attachment=True, download_name='network_scan.csv')


@bp.route("/check_streams")
def api_check_streams():
    """Check reachability of popular music streaming services"""
    services = [
        {'host': 'api.spotify.com', 'port': 443, 'name': 'Spotify'},
        {'host': 'music.apple.com', 'port': 443, 'name': 'Apple Music'},
        {'host': 'music.youtube.com', 'port': 443, 'name': 'YouTube Music'},
        {'host': 'music.amazon.com', 'port': 443, 'name': 'Amazon Music'},
        {'host': 'listen.tidal.com', 'port': 443, 'name': 'Tidal'},
        {'host': 'www.qobuz.com', 'port': 443, 'name': 'Qobuz'},
        {'host': 'www.pandora.com', 'port': 443, 'name': 'Pandora'},
        {'host': 'www.kkbox.com', 'port': 443, 'name': 'KKBOX'},
    ]
    
    results = []
    for svc in services:
        res = {'host': svc['host'], 'name': svc.get('name', svc['host'])}
        
        # DNS
        try:
            addrs = socket.getaddrinfo(svc['host'], None)
            ips = sorted({a[4][0] for a in addrs})
            res['dns'] = ips
        except Exception as e:
            res['dns_error'] = str(e)
            results.append(res)
            continue
        
        # TCP connect
        try:
            t0 = time.perf_counter()
            sock = socket.create_connection((svc['host'], svc['port']), timeout=3)
            t1 = time.perf_counter()
            sock.close()
            res['tcp_connect_ms'] = int((t1 - t0) * 1000)
        except Exception as e:
            res['tcp_error'] = str(e)
            results.append(res)
            continue
        
        # HTTPS HEAD
        try:
            t0 = time.perf_counter()
            conn = http.client.HTTPSConnection(svc['host'], timeout=3)
            # Add User-Agent header to avoid 403 errors from services like Tidal
            headers = {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
            conn.request('HEAD', '/', headers=headers)
            r = conn.getresponse()
            t1 = time.perf_counter()
            res['http_status'] = r.status
            res['http_time_ms'] = int((t1 - t0) * 1000)
            conn.close()
        except Exception as e:
            res['http_error'] = str(e)
        
        results.append(res)
    
    return jsonify({'services': results, 'timestamp': time.time()})
