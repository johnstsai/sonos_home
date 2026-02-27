"""
PCAP Capture and Analysis Routes
"""
import os
import time
import tempfile
from flask import Blueprint, jsonify, request, send_file, current_app
from ..utils.pcap import (
    run_tcpdump_capture,
    find_last_pcap,
    analyze_pcap,
    create_filtered_pcap
)

bp = Blueprint('pcap', __name__)


@bp.route("/capture_pcap")
def capture_pcap():
    """Capture network traffic to a PCAP file"""
    # Check if capture is enabled
    if not current_app.config.get('ENABLE_CAPTURE', False):
        return jsonify({
            'error': 'Real-time capture is disabled for security reasons. Use manual tcpdump instead.',
            'command': "sudo tcpdump -i any -s 65535 -w capture.pcap 'tcp port 1400 or (udp and port 1900)'"
        }), 403
    
    dur = int(request.args.get("dur") or 5)
    
    # Security: limit duration
    if dur <= 0 or dur > 60:
        return jsonify({'error': 'duration must be 1-60'}), 400
    
    try:
        data_dir = current_app.config.get('DATA_DIR', 'debug_data')
        pcap_filter = current_app.config.get('PCAP_FILTER', '')
        
        p = run_tcpdump_capture(
            data_dir=data_dir,
            duration_seconds=dur,
            pcap_filter=pcap_filter
        )
        
        # Return file
        return send_file(str(p), as_attachment=True)
    except PermissionError as e:
        return jsonify({
            'error': 'Permission denied. PCAP capture requires root privileges.',
            'hint': 'Run with sudo or grant tcpdump capture capabilities',
            'details': str(e)
        }), 403
    except RuntimeError as e:
        return jsonify({'error': str(e)}), 500
    except Exception as e:
        return jsonify({
            'error': f'Capture failed: {str(e)}',
            'type': type(e).__name__
        }), 500


@bp.route("/analyze_pcap", methods=['GET', 'POST'])
def api_analyze_pcap():
    """Analyze a PCAP file and return network statistics"""
    try:
        data_dir = current_app.config.get('DATA_DIR', 'debug_data')
        
        if request.method == 'POST':
            # Handle file upload
            if 'pcap' not in request.files:
                return jsonify({
                    'error': 'no file uploaded', 
                    'endpoints': [], 
                    'ssdp_messages': [], 
                    'sonos_tcp': []
                }), 400
            
            f = request.files['pcap']
            if f.filename == '':
                return jsonify({
                    'error': 'empty filename', 
                    'endpoints': [], 
                    'ssdp_messages': [], 
                    'sonos_tcp': []
                }), 400
            
            # Save to a temp file
            with tempfile.NamedTemporaryFile(delete=False, suffix='.pcap') as tf:
                f.save(tf.name)
                tf_path = tf.name
            
            try:
                res = analyze_pcap(tf_path)
            finally:
                try:
                    os.unlink(tf_path)
                except Exception:
                    pass
            
            if not res or not isinstance(res, dict):
                return jsonify({
                    'error': 'analysis failed or returned no data', 
                    'endpoints': [], 
                    'ssdp_messages': [], 
                    'sonos_tcp': []
                }), 500
            
            for k in ('endpoints', 'ssdp_messages', 'sonos_tcp'):
                if k not in res:
                    res[k] = []
            
            return jsonify(res)
        
        # GET: analyze most recent pcap
        last = find_last_pcap(data_dir)
        if not last or not os.path.exists(last):
            return jsonify({
                "error": "No pcap file found for analysis.",
                "endpoints": [],
                "ssdp_messages": [],
                "sonos_tcp": []
            })
        
        res = analyze_pcap(last)
        if not res or not isinstance(res, dict):
            return jsonify({
                "error": "Analysis failed or returned no data.",
                "endpoints": [],
                "ssdp_messages": [],
                "sonos_tcp": []
            })
        
        for k in ("endpoints", "ssdp_messages", "sonos_tcp"):
            if k not in res:
                res[k] = []
        
        return jsonify(res)
        
    except Exception as e:
        return jsonify({
            "error": f"Exception during analysis: {str(e)}",
            "endpoints": [],
            "ssdp_messages": [],
            "sonos_tcp": []
        })


@bp.route("/sonos_pcap")
def api_sonos_pcap():
    """Return a filtered PCAP containing only Sonos traffic"""
    data_dir = current_app.config.get('DATA_DIR', 'debug_data')
    last = find_last_pcap(data_dir)
    
    if not last:
        return jsonify({'error': 'no pcap files found'}), 404
    
    from pathlib import Path
    out_path = Path(data_dir) / f"sonos_{int(time.time())}.pcap"
    
    try:
        create_filtered_pcap(
            input_path=last,
            output_path=str(out_path),
            filter_expression='udp.port==1900 || tcp.port==1400'
        )
        return send_file(str(out_path), 
                        as_attachment=True, 
                        download_name='sonos_filtered.pcap')
    except Exception as e:
        return jsonify({'error': str(e)}), 500
