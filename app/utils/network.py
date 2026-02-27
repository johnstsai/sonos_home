"""Network scanning utilities"""
import platform
import socket
import subprocess
import re
import ipaddress
from pathlib import Path
import json
import csv
import concurrent.futures
from flask import current_app


def detect_local_network():
    """Detect the local network CIDR"""
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        local_ip = s.getsockname()[0]
        s.close()
        
        # Assume /24 subnet
        parts = local_ip.split('.')
        return f"{parts[0]}.{parts[1]}.{parts[2]}.0/24"
    except Exception:
        return "192.168.1.0/24"


def get_mac_address(ip):
    """Get MAC address for an IP using arp"""
    system = platform.system().lower()
    try:
        if system == "darwin" or system == "linux":
            raw = subprocess.check_output(["arp", "-n", ip], 
                                         universal_newlines=True, 
                                         stderr=subprocess.DEVNULL,
                                         timeout=2)
            if "darwin" in system:
                m = re.search(r"([0-9a-fA-F]{1,2}[:-]){5}[0-9a-fA-F]{1,2}", raw)
                if m:
                    return m.group(0)
                parts = raw.split()
                if len(parts) >= 4:
                    return parts[3]
            else:
                for token in raw.split():
                    if ":" in token and len(token) >= 17:
                        return token
        elif system == "windows":
            raw = subprocess.check_output(["arp", "-a", ip], 
                                         universal_newlines=True,
                                         timeout=2)
            for line in raw.splitlines():
                for token in raw.split():
                    if ":" in token and len(token) >= 17:
                        return token
    except Exception:
        pass
    return None


def ping_host(ip, timeout=1):
    """Ping a single host"""
    system = platform.system().lower()
    try:
        if system == "windows":
            cmd = ["ping", "-n", "1", "-w", str(timeout * 1000), str(ip)]
        else:
            cmd = ["ping", "-c", "1", "-W", str(timeout), str(ip)]
        
        result = subprocess.run(cmd, 
                              stdout=subprocess.DEVNULL, 
                              stderr=subprocess.DEVNULL,
                              timeout=timeout + 1)
        return result.returncode == 0
    except Exception:
        return False


def scan_network(network_cidr, max_workers=50):
    """Scan a network range for active hosts"""
    network = ipaddress.ip_network(network_cidr, strict=False)
    ips = [str(ip) for ip in network.hosts()]
    results = []
    
    # Get timeout from config before entering thread pool
    try:
        timeout = current_app.config.get('PING_TIMEOUT', 1)
    except RuntimeError:
        timeout = 1
    
    # First pass: ping all IPs to find alive hosts
    alive_ips = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=min(max_workers, 500)) as ex:
        # Submit all ping jobs
        future_to_ip = {ex.submit(ping_host, ip, timeout): ip for ip in ips}
        
        # Collect results
        for future in concurrent.futures.as_completed(future_to_ip):
            ip = future_to_ip[future]
            try:
                is_alive = future.result()
                if is_alive:
                    alive_ips.append(ip)
            except Exception:
                pass
    
    # Second pass: get hostname and MAC for alive hosts
    for ip in alive_ips:
        try:
            hostname = socket.gethostbyaddr(ip)[0]
        except Exception:
            hostname = None
        
        mac = get_mac_address(ip)
        results.append({"ip": ip, "hostname": hostname, "mac": mac})
    
    # Save results
    data_dir = Path(current_app.config['DATA_DIR'])
    
    # Save JSON
    with open(data_dir / "last_scan.json", "w", encoding="utf-8") as f:
        json.dump({"results": results}, f, ensure_ascii=False, indent=2)
    
    # Save CSV
    with open(data_dir / "last_scan.csv", "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=["ip", "hostname", "mac"])
        writer.writeheader()
        writer.writerows(results)
    
    return {"network": network_cidr, "found": len(results), "results": results}
