"""
PCAP Capture and Analysis Utilities
"""
import os
import re
import shutil
import subprocess
import tempfile
from collections import Counter
from pathlib import Path


def find_last_pcap(data_dir):
    """
    Find most recent .pcap file in data directory.
    
    Args:
        data_dir: Path to data directory
        
    Returns:
        str: Path to most recent pcap file or None if not found
    """
    data_path = Path(data_dir)
    files = sorted(data_path.glob('*.pcap'), key=lambda p: p.stat().st_mtime, reverse=True)
    return str(files[0]) if files else None


def run_tcpdump_capture(data_dir, interface='any', duration_seconds=5, pcap_filter=''):
    """
    Run tcpdump to capture network traffic.
    
    Args:
        data_dir: Directory to save capture files
        interface: Network interface to capture on (default: 'any')
        duration_seconds: How long to capture (default: 5)
        pcap_filter: BPF filter expression (default: '')
        
    Returns:
        Path: Path to captured pcap file
        
    Raises:
        RuntimeError: If tcpdump is not found or capture fails
        PermissionError: If tcpdump requires root privileges
    """
    import time
    import signal
    import platform
    
    # Check for tcpdump
    tcpdump_bin = shutil.which('tcpdump')
    if not tcpdump_bin:
        raise RuntimeError('tcpdump not found in PATH. Install with: brew install tcpdump (macOS) or apt install tcpdump (Linux)')
    
    data_path = Path(data_dir)
    data_path.mkdir(parents=True, exist_ok=True)
    
    out_file = data_path / f"capture_{int(time.time())}.pcap"
    
    # Determine if we need sudo
    use_sudo = False
    try:
        if os.geteuid() == 0:
            # Already running as root
            use_sudo = False
        else:
            # Not root, check for passwordless sudo
            sudo_path = shutil.which("sudo")
            if sudo_path:
                try:
                    # Test non-interactive sudo (will fail if password required)
                    subprocess.run(
                        [sudo_path, "-n", "true"], 
                        check=True, 
                        stdout=subprocess.DEVNULL, 
                        stderr=subprocess.DEVNULL,
                        timeout=2
                    )
                    use_sudo = True
                except (subprocess.CalledProcessError, subprocess.TimeoutExpired):
                    # Password required or sudo not permitted
                    raise PermissionError(
                        "tcpdump requires root privileges. Configure passwordless sudo for tcpdump:\n"
                        f"1. Find tcpdump path: which tcpdump\n"
                        f"2. Edit sudoers: sudo visudo\n"
                        f"3. Add line: {os.getenv('USER', 'your_user')} ALL=(root) NOPASSWD: {tcpdump_bin}\n"
                        "Or run the app with sudo: sudo -E python3 run.py"
                    )
            else:
                raise PermissionError(
                    "tcpdump requires root privileges and 'sudo' was not found. "
                    "Run with: sudo -E python3 run.py"
                )
    except AttributeError:
        # os.geteuid may not exist on some platforms (Windows)
        use_sudo = False
    
    # Build tcpdump command
    cmd = [
        tcpdump_bin,
        '-i', interface,
        '-s', '0',  # Capture full packets
        '-w', str(out_file)
    ]
    
    if pcap_filter:
        cmd.append(pcap_filter)
    
    # Add sudo prefix if needed
    if use_sudo:
        cmd = ['sudo', '-n'] + cmd
    
    # Check for timeout command (Linux)
    timeout_bin = shutil.which('timeout')
    if timeout_bin:
        # Use timeout command for clean termination
        full_cmd = [timeout_bin, str(duration_seconds)] + cmd
        try:
            subprocess.run(
                full_cmd, 
                check=True, 
                stdout=subprocess.DEVNULL, 
                stderr=subprocess.PIPE,
                text=True
            )
        except subprocess.CalledProcessError as e:
            stderr = e.stderr if e.stderr else ''
            if 'Operation not permitted' in stderr or 'permission denied' in stderr.lower():
                raise PermissionError(f'tcpdump permission error: {stderr}')
            raise RuntimeError(f'tcpdump failed: {stderr or str(e)}')
    else:
        # Fallback: spawn tcpdump, sleep, then send SIGINT (macOS)
        try:
            proc = subprocess.Popen(
                cmd, 
                stdout=subprocess.DEVNULL, 
                stderr=subprocess.PIPE,
                preexec_fn=os.setsid if hasattr(os, 'setsid') else None
            )
        except Exception as e:
            raise RuntimeError(f'Failed to start tcpdump: {e}')
        
        try:
            # Wait for the requested duration
            time.sleep(duration_seconds)
            
            # Send SIGINT to cleanly stop tcpdump
            try:
                if hasattr(os, 'killpg'):
                    os.killpg(proc.pid, signal.SIGINT)
                else:
                    proc.send_signal(signal.SIGINT)
            except Exception:
                proc.send_signal(signal.SIGINT)
            
            # Wait for tcpdump to exit
            try:
                proc.wait(timeout=10)
            except subprocess.TimeoutExpired:
                proc.kill()
                proc.wait()
            
            # Check for errors
            stderr = proc.stderr.read().decode(errors='ignore') if proc.stderr else ''
            if proc.returncode and proc.returncode != 0:
                if 'Operation not permitted' in stderr or 'permission denied' in stderr.lower():
                    raise PermissionError(f'tcpdump permission error: {stderr}')
                raise RuntimeError(f'tcpdump exited with code {proc.returncode}: {stderr}')
        finally:
            pass
    
    if not out_file.exists():
        raise RuntimeError('Capture file was not created')
    
    return out_file


def analyze_pcap(path):
    """
    Analyze a PCAP file and extract network statistics.
    Prefers tshark/capinfos when available, falls back to tcpdump -r.
    
    Args:
        path: Path to pcap file
        
    Returns:
        dict: Analysis results including endpoints, SSDP messages, and Sonos traffic
    """
    out = {"path": path}
    if not path or not os.path.exists(path):
        return {"error": "pcap not found"}
    
    out['size'] = os.path.getsize(path)

    # try capinfos for quick summary
    capinfos = shutil.which('capinfos')
    if capinfos:
        try:
            s = subprocess.check_output([capinfos, path], universal_newlines=True, stderr=subprocess.DEVNULL)
            out['capinfos'] = s
        except Exception as e:
            out['capinfos_error'] = str(e)

    # try tshark to produce structured concise summaries
    tshark = shutil.which('tshark')
    if tshark:
        try:
            # endpoints: collect ip.src and ip.dst and count occurrences
            ip_lines = subprocess.check_output(
                [tshark, '-r', path, '-T', 'fields', '-e', 'ip.src', '-e', 'ip.dst'], 
                universal_newlines=True, 
                stderr=subprocess.DEVNULL
            )
            ips = []
            for L in ip_lines.splitlines():
                parts = L.split('\t')
                for p in parts:
                    if p:
                        ips.append(p)
            c = Counter(ips)
            endpoints = [{'ip': ip, 'count': cnt} for ip, cnt in c.most_common()]
            out['endpoints'] = endpoints
        except Exception as e:
            out['endpoints_error'] = str(e)
            
        try:
            # SSDP messages (udp port 1900)
            ssdp_lines = subprocess.check_output(
                [tshark, '-r', path, '-Y', 'udp.port==1900', '-T', 'fields', 
                 '-e', 'frame.number', '-e', 'frame.time', '-e', 'ip.src', '-e', 'ip.dst', 
                 '-e', 'udp.srcport', '-e', 'udp.dstport', '-e', 'ssdp.method', 
                 '-e', 'ssdp.usn', '-e', 'ssdp.location', '-e', 'ssdp.st', '-c', '500'], 
                universal_newlines=True, 
                stderr=subprocess.DEVNULL
            )
            ssdp_msgs = []
            for L in ssdp_lines.splitlines():
                parts = L.split('\t')
                data = {
                    'frame': parts[0] if len(parts) > 0 else '',
                    'time': parts[1] if len(parts) > 1 else '',
                    'src': parts[2] if len(parts) > 2 else '',
                    'dst': parts[3] if len(parts) > 3 else '',
                    'sport': parts[4] if len(parts) > 4 else '',
                    'dport': parts[5] if len(parts) > 5 else '',
                    'method': parts[6] if len(parts) > 6 else '',
                    'usn': parts[7] if len(parts) > 7 else '',
                    'location': parts[8] if len(parts) > 8 else '',
                    'st': parts[9] if len(parts) > 9 else '',
                }
                ssdp_msgs.append(data)
            out['ssdp_messages'] = ssdp_msgs
        except Exception as e:
            out['ssdp_error'] = str(e)
            
        try:
            # Sonos / TCP 1400 flows (brief)
            sonos_lines = subprocess.check_output(
                [tshark, '-r', path, '-Y', 'tcp.port==1400', '-T', 'fields', 
                 '-e', 'frame.number', '-e', 'frame.time', '-e', 'ip.src', '-e', 'ip.dst', 
                 '-e', 'tcp.srcport', '-e', 'tcp.dstport', '-e', 'http.request.method', 
                 '-e', 'http.response.code', '-c', '200'], 
                universal_newlines=True, 
                stderr=subprocess.DEVNULL
            )
            sonos_msgs = []
            for L in sonos_lines.splitlines():
                parts = L.split('\t')
                sonos_msgs.append({
                    'frame': parts[0] if len(parts) > 0 else '',
                    'time': parts[1] if len(parts) > 1 else '',
                    'src': parts[2] if len(parts) > 2 else '',
                    'dst': parts[3] if len(parts) > 3 else '',
                    'sport': parts[4] if len(parts) > 4 else '',
                    'dport': parts[5] if len(parts) > 5 else '',
                    'http_method': parts[6] if len(parts) > 6 else '',
                    'http_code': parts[7] if len(parts) > 7 else '',
                })
            out['sonos_tcp'] = sonos_msgs
            # also provide top senders for sonos tcp
            senders = [m.get('src') for m in sonos_msgs if m.get('src')]
            out['sonos_top_senders'] = [{'ip': ip, 'count': cnt} for ip, cnt in Counter(senders).most_common()]
        except Exception as e:
            out['sonos_error'] = str(e)
    else:
        # fallback to tcpdump -r parsing of sample lines
        tcpdump_bin = shutil.which('tcpdump')
        if tcpdump_bin:
            try:
                sample = subprocess.check_output(
                    [tcpdump_bin, '-r', path, '-nn', '-tt', '-c', '500'], 
                    universal_newlines=True, 
                    stderr=subprocess.DEVNULL
                )
                out['sample'] = sample
                lines = sample.splitlines()
                ips = []
                ssdp_msgs = []
                sonos_msgs = []
                parse_errors = []
                
                for ln in lines:
                    try:
                        m = re.search(r"IP\s+([0-9.]+)\.([0-9]+)\s+>\s+([0-9.]+)\.([0-9]+):\s*(\w+),", ln)
                        if m:
                            src_ip = m.group(1)
                            src_port = m.group(2)
                            dst_ip = m.group(3)
                            dst_port = m.group(4)
                            proto = m.group(5)
                            ips.append(src_ip)
                            ips.append(dst_ip)
                            
                            if dst_port == '1900':
                                ssdp_msgs.append({
                                    'src': src_ip, 
                                    'sport': src_port, 
                                    'dst': dst_ip, 
                                    'dport': dst_port, 
                                    'proto': proto, 
                                    'line': ln
                                })
                            if dst_port == '1400' or src_port == '1400':
                                sonos_msgs.append({
                                    'src': src_ip, 
                                    'sport': src_port, 
                                    'dst': dst_ip, 
                                    'dport': dst_port, 
                                    'proto': proto, 
                                    'line': ln
                                })
                        else:
                            parse_errors.append(ln)
                    except Exception as e:
                        parse_errors.append(f"{ln} | error: {str(e)}")
                        
                out['endpoints'] = [{'ip': ip, 'count': cnt} for ip, cnt in Counter(ips).most_common()]
                out['ssdp_messages'] = ssdp_msgs
                out['sonos_tcp'] = sonos_msgs
                out['sonos_top_senders'] = [{'ip': ip, 'count': cnt} for ip, cnt in Counter([s['src'] for s in sonos_msgs]).most_common()]
                out['parse_errors'] = parse_errors
            except Exception as e:
                out['sample_error'] = str(e)
        else:
            out['error'] = 'neither tshark nor tcpdump found to analyze pcap'
    
    return out


def create_filtered_pcap(input_path, output_path, filter_expression='udp.port==1900 || tcp.port==1400'):
    """
    Create a filtered PCAP file containing only matching traffic.
    
    Args:
        input_path: Path to input pcap file
        output_path: Path to output pcap file
        filter_expression: Wireshark display filter (for tshark) or BPF filter (for tcpdump)
        
    Returns:
        Path: Path to filtered pcap file
        
    Raises:
        RuntimeError: If neither tshark nor tcpdump is available
    """
    tshark = shutil.which('tshark')
    tcpdump_bin = shutil.which('tcpdump')
    
    if tshark:
        cmd = [tshark, '-r', input_path, '-Y', filter_expression, '-w', str(output_path)]
    elif tcpdump_bin:
        # Convert Wireshark display filter to BPF syntax
        # Default to Sonos-related traffic
        bpf_filter = 'tcp port 1400 or udp port 1900'
        cmd = [tcpdump_bin, '-r', input_path, '-w', str(output_path), bpf_filter]
    else:
        raise RuntimeError('neither tshark nor tcpdump available to create filtered pcap')
    
    try:
        subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    except subprocess.CalledProcessError as e:
        raise RuntimeError(f'failed to produce filtered pcap: {e}')
    
    return Path(output_path)
