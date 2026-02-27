// i18n translations
const translations = {
    en: {
        title: "Net & Sonos Debug — Dashboard",
        host_label: "Host",
        soco_label: "SoCo",
        tab_dashboard: "Dashboard",
        tab_controller: "Controller",
        network_label: "Network",
        detected_label: "Detected",
        scan_btn: "Scan",
        capture_label: "Manual PCAP Capture",
        capture_manual_desc: "For security reasons, real-time capture has been removed. Use the command below to manually capture network traffic:",
        copy_cmd: "Copy",
        capture_note_macos: "macOS Note:",
        capture_note_desc: "Use en0 (Wi-Fi) or en4 (Ethernet), -G 5 means auto-stop after 5 seconds, file saves to Downloads folder",
        capture_steps_title: "Steps:",
        capture_manual_steps: "1️⃣ Run the command in terminal\n2️⃣ Wait 5 seconds for auto-stop (or Ctrl+C to stop early)\n3️⃣ Upload ~/Downloads/capture.pcap below for analysis",
        pcap_analysis: "PCAP Analysis",
        analyze_last: "Analyze Last",
        upload_pcap_label: "Upload PCAP to analyze",
        upload_analyze: "Upload & Analyze",
        health_checks: "Health checks",
        check_streams_btn: "Check Streams",
        check_sonos_btn: "Check Sonos",
        metric_unique: "Unique endpoints",
        metric_unique_desc: "Number of distinct IP addresses seen (src or dst). Useful to understand how many devices are active and to spot unexpected devices on the network.",
        metric_ssdp: "SSDP messages",
        metric_ssdp_desc: "Count of SSDP discovery/notify packets (UDP 1900). High values indicate active device discovery; repeated bursts can signal noisy devices or discovery loops.",
        metric_sonos: "Sonos TCP(1400)",
        metric_sonos_desc: "Number of TCP(1400) frames related to Sonos control/streaming traffic. Shows active control interactions and helps verify whether Sonos devices are communicating properly.",
        stream_checks: "Stream checks",
        sonos_health: "Sonos health",
        analysis_title: "Analysis",
        devices_title: "Devices",
        controller_speakers: "Speakers",
        controller_search: "Search music",
        controller_search_btn: "Search",
        controller_group: "Group",
        controller_ungroup: "Ungroup",
        controller_play: "▶ Play",
        controller_pause: "⏸ Pause",
        controller_next: "⏭ Next",
        controller_prev: "⏮ Prev",
        controller_play_selected: "Play Selected",
        sonos_diagnostics: "Sonos Diagnostics & Fix",
        sonos_diagnostics_desc: "Quick fixes for common issues",
        diag_refresh: "Refresh Devices",
        diag_refresh_tip: "Re-discover all Sonos devices on the network. Use when devices disappear or after router restart.",
        diag_ungroup: "Ungroup All",
        diag_ungroup_tip: "Dissolve all speaker groups. Most common fix for grouping issues and audio sync problems.",
        diag_mute: "Mute All",
        diag_mute_tip: "Mute all Sonos speakers at once. Emergency quiet button.",
        diag_unmute: "Unmute All",
        diag_unmute_tip: "Unmute all Sonos speakers. Restore audio to all devices.",
        diag_network: "Check Network",
        diag_network_tip: "Test network connectivity (ping & API) to each device. Find offline or unstable devices.",
        diag_sync: "Check Sync",
        diag_sync_tip: "Check group coordinator status and transport state. Diagnose audio sync and grouping issues.",
        now_playing: "Now Playing",
        playback_controls: "Playback Controls",
        search_music: "Search Music",
        queue: "Queue",
        refresh_queue: "Refresh Queue",
        clear_queue: "Clear Queue",
        state_playing: "Playing",
        state_paused: "Paused",
        state_stopped: "Stopped"
    },
    zh: {
        title: "網路與 Sonos 除錯儀表板",
        host_label: "主機",
        soco_label: "SoCo",
        tab_dashboard: "儀表板",
        tab_controller: "控制器",
        network_label: "網路",
        detected_label: "偵測到",
        scan_btn: "掃描",
        capture_label: "手動捕獲 PCAP",
        capture_manual_desc: "由於安全考量，實時捕獲功能已移除。您可以使用以下命令手動捕獲網絡流量：",
        copy_cmd: "複製",
        capture_note_macos: "macOS 用戶注意：",
        capture_note_desc: "使用 en0 (Wi-Fi) 或 en4 (以太網)，-G 5 表示捕獲 5 秒後自動停止，文件會保存到下載文件夾",
        capture_steps_title: "使用步驟：",
        capture_manual_steps: "1️⃣ 在終端執行上述命令\n2️⃣ 等待 5 秒自動停止（或按 Ctrl+C 提前停止）\n3️⃣ 在下方上傳 ~/Downloads/capture.pcap 進行分析",
        pcap_analysis: "PCAP 分析",
        analyze_last: "分析最新",
        upload_pcap_label: "上傳 PCAP 進行分析",
        upload_analyze: "上傳並分析",
        health_checks: "健康檢查",
        check_streams_btn: "檢查串流",
        check_sonos_btn: "檢查 Sonos",
        metric_unique: "唯一端點",
        metric_unique_desc: "觀察到的不同 IP 位址數量（來源或目的地）。用於了解有多少設備處於活動狀態，並發現網路上意外的設備。",
        metric_ssdp: "SSDP 訊息",
        metric_ssdp_desc: "SSDP 發現/通知封包數量（UDP 1900）。高數值表示活躍的設備發現；重複突發可能表明設備噪音或發現循環。",
        metric_sonos: "Sonos TCP(1400)",
        metric_sonos_desc: "與 Sonos 控制/串流流量相關的 TCP(1400) 幀數量。顯示活躍的控制互動，並幫助驗證 Sonos 設備是否正常通訊。",
        stream_checks: "串流檢查",
        sonos_health: "Sonos 健康狀態",
        analysis_title: "分析",
        devices_title: "設備",
        controller_speakers: "喇叭",
        controller_search: "搜尋音樂",
        controller_search_btn: "搜尋",
        controller_group: "群組",
        controller_ungroup: "解除群組",
        controller_play: "▶ 播放",
        controller_pause: "⏸ 暫停",
        controller_next: "⏭ 下一首",
        controller_prev: "⏮ 上一首",
        controller_play_selected: "播放所選",
        sonos_diagnostics: "Sonos 診斷與修復",
        sonos_diagnostics_desc: "常見問題快速修復工具",
        diag_refresh: "重新掃描設備",
        diag_refresh_tip: "重新發現網路上的所有 Sonos 設備。當設備消失或重啟路由器後使用。",
        diag_ungroup: "解散所有群組",
        diag_ungroup_tip: "解散所有喇叭群組。最常用的修復方法，可解決群組和音訊同步問題。",
        diag_mute: "全部靜音",
        diag_mute_tip: "一鍵靜音所有 Sonos 喇叭。緊急靜音按鈕。",
        diag_unmute: "取消靜音",
        diag_unmute_tip: "取消所有 Sonos 喇叭的靜音。恢復所有設備的音訊。",
        diag_network: "檢查網路連線",
        diag_network_tip: "測試每個設備的網路連線（ping 和 API）。找出離線或不穩定的設備。",
        diag_sync: "檢查同步狀態",
        diag_sync_tip: "檢查群組協調器狀態和傳輸狀態。診斷音訊同步和群組問題。",
        now_playing: "正在播放",
        playback_controls: "播放控制",
        search_music: "搜尋音樂",
        queue: "播放隊列",
        refresh_queue: "刷新隊列",
        clear_queue: "清空隊列",
        state_playing: "播放中",
        state_paused: "已暫停",
        state_stopped: "已停止"
    }
};

let currentLang = localStorage.getItem('lang') || 'en';

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    document.getElementById('lang_select').value = lang;
    
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
    
    // Update buttons
    const btnMap = {
        'scan_btn': 'scan_btn',
        // 'cap_btn': 'capture_btn', // Removed - manual capture only
        'analyze_last': 'analyze_last',
        'upload_analyze': 'upload_analyze',
        'check_streams_btn': 'check_streams_btn',
        'check_sonos_btn': 'check_sonos_btn',
        'ctrl_group': 'controller_group',
        'ctrl_ungroup': 'controller_ungroup',
        'ctrl_play': 'controller_play',
        'ctrl_pause': 'controller_pause',
        'ctrl_next': 'controller_next',
        'ctrl_prev': 'controller_prev',
        'ctrl_play_content': 'controller_play_selected',
        'ctrl_search_btn': 'controller_search_btn'
    };
    
    Object.keys(btnMap).forEach(id => {
        const el = document.getElementById(id);
        if (el && translations[lang][btnMap[id]]) {
            el.textContent = translations[lang][btnMap[id]];
        }
    });
    
    // Update tab buttons
    document.querySelectorAll('.tabbtn').forEach(btn => {
        const tab = btn.getAttribute('data-tab');
        if (tab === 'dashboard' && translations[lang].tab_dashboard) {
            btn.textContent = translations[lang].tab_dashboard;
        } else if (tab === 'controller' && translations[lang].tab_controller) {
            btn.textContent = translations[lang].tab_controller;
        }
    });
    
    // Update diagnostic button tooltips
    const diagTooltips = {
        'diag_refresh_all': 'diag_refresh_tip',
        'diag_ungroup_all': 'diag_ungroup_tip',
        'diag_mute_all': 'diag_mute_tip',
        'diag_unmute_all': 'diag_unmute_tip',
        'diag_check_network': 'diag_network_tip',
        'diag_sync_check': 'diag_sync_tip'
    };
    
    Object.keys(diagTooltips).forEach(id => {
        const el = document.getElementById(id);
        if (el && translations[lang][diagTooltips[id]]) {
            el.title = translations[lang][diagTooltips[id]];
        }
    });
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', () => {
    setLanguage(currentLang);
});

// Language selector event
document.getElementById('lang_select').addEventListener('change', (e) => {
    setLanguage(e.target.value);
});

// Tab switching logic
document.querySelectorAll('.tabbtn').forEach(btn=>{
    btn.addEventListener('click',()=>{
        document.querySelectorAll('.tabbtn').forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        const tab = btn.getAttribute('data-tab');
        document.querySelectorAll('.tabcontent').forEach(tc=>tc.classList.remove('active'));
        document.getElementById('tab_'+tab).classList.add('active');
        
        // Start auto-refresh when controller tab is opened
        if (tab === 'controller') {
            startNowPlayingRefresh();
        } else {
            stopNowPlayingRefresh();
        }
    });
});

// Music tab switching
window.showMusicTab = function(tab) {
    document.getElementById('tab_search').style.borderBottom = tab === 'search' ? '2px solid #667eea' : 'none';
    document.getElementById('tab_queue').style.borderBottom = tab === 'queue' ? '2px solid #667eea' : 'none';
    document.getElementById('music_tab_search').style.display = tab === 'search' ? 'block' : 'none';
    document.getElementById('music_tab_queue').style.display = tab === 'queue' ? 'block' : 'none';
    
    if (tab === 'queue') {
        loadQueue();
    }
};

// Now Playing auto-refresh
let nowPlayingInterval = null;

function startNowPlayingRefresh() {
    updateNowPlaying(); // Immediate update
    nowPlayingInterval = setInterval(updateNowPlaying, 3000); // Update every 3 seconds
}

function stopNowPlayingRefresh() {
    if (nowPlayingInterval) {
        clearInterval(nowPlayingInterval);
        nowPlayingInterval = null;
    }
}

async function updateNowPlaying() {
    try {
        const r = await fetch('/api/sonos_status');
        const j = await r.json();
        
        if (j.players && j.players.length > 0) {
            // Find first playing speaker or use first speaker
            let player = j.players.find(p => p.transport && p.transport.current_transport_state === 'PLAYING');
            if (!player) player = j.players[0];
            
            const title = player.track && player.track.title ? player.track.title : '-';
            const artist = player.track && player.track.artist ? player.track.artist : '-';
            const state = player.transport ? player.transport.current_transport_state : 'STOPPED';
            
            document.getElementById('np_title').textContent = title;
            document.getElementById('np_artist').textContent = artist;
            document.getElementById('np_speaker').textContent = `🔊 ${player.name || player.ip}`;
            
            // Update state badge
            const stateEl = document.getElementById('np_state');
            const stateText = state === 'PLAYING' ? (currentLang === 'zh' ? '播放中' : 'Playing') :
                             state === 'PAUSED_PLAYBACK' ? (currentLang === 'zh' ? '已暫停' : 'Paused') :
                             (currentLang === 'zh' ? '已停止' : 'Stopped');
            stateEl.textContent = stateText;
            stateEl.style.background = state === 'PLAYING' ? 'rgba(74,222,128,0.2)' : 
                                      state === 'PAUSED_PLAYBACK' ? 'rgba(251,191,36,0.2)' : 
                                      'rgba(148,163,184,0.2)';
            stateEl.style.color = state === 'PLAYING' ? '#4ade80' : 
                                 state === 'PAUSED_PLAYBACK' ? '#fbbf24' : 
                                 '#94a3b8';
            
            // Show/hide play/pause buttons
            if (state === 'PLAYING') {
                document.getElementById('ctrl_play').style.display = 'none';
                document.getElementById('ctrl_pause').style.display = 'block';
            } else {
                document.getElementById('ctrl_play').style.display = 'block';
                document.getElementById('ctrl_pause').style.display = 'none';
            }
            
            // Update volume slider if not currently being dragged
            if (!document.getElementById('ctrl_volume').matches(':active')) {
                document.getElementById('ctrl_volume').value = player.volume || 30;
                document.getElementById('ctrl_volume_val').textContent = (player.volume || 30) + '%';
            }
        }
    } catch(e) {
        console.error('Error updating now playing:', e);
    }
}

// Controller tab logic
let ctrlSelected = [];
function setCtrlStatus(msg){ 
    const el = document.getElementById('ctrl_status');
    if (el) el.textContent = msg; 
}

function setCtrlResults(items){
    const node = document.getElementById('ctrl_results'); 
    if (!node) return;
    node.innerHTML = '';
    
    if (!items || items.length === 0) {
        node.innerHTML = '<div style="text-align:center;padding:40px;opacity:0.5">' + 
                        (currentLang === 'zh' ? '無搜尋結果' : 'No results found') + '</div>';
        return;
    }
    
    items.forEach(item=>{
        const d = document.createElement('div'); 
        d.style.cssText = 'padding:12px;background:rgba(255,255,255,0.03);border-radius:8px;margin-bottom:8px;cursor:pointer;border:1px solid rgba(255,255,255,0.05);transition:all 0.2s';
        d.onmouseenter = () => d.style.background = 'rgba(255,255,255,0.06)';
        d.onmouseleave = () => d.style.background = 'rgba(255,255,255,0.03)';
        
        const typeIcon = item.type === 'track' ? '🎵' : 
                        item.type === 'album' ? '💿' : 
                        item.type === 'artist' ? '🎤' : '🎶';
        
        d.innerHTML = `
            <div style="display:flex;justify-content:space-between;align-items:center">
                <div style="flex:1;min-width:0">
                    <div style="font-weight:600;margin-bottom:4px;overflow:hidden;text-overflow:ellipsis">
                        ${typeIcon} ${item.title || item.name || item.uri || ''}
                    </div>
                    <div class="small" style="opacity:0.7;overflow:hidden;text-overflow:ellipsis">
                        ${item.artist || ''} ${item.album ? '· ' + item.album : ''}
                    </div>
                </div>
                <button class="btn-ghost" style="margin-left:12px;padding:8px 16px" onclick="playContent('${(item.uri || '').replace(/'/g, "\\'")}')">
                    ▶️ <span data-i18n="play">Play</span>
                </button>
            </div>
        `;
        node.appendChild(d);
    });
}

window.playContent = async function(uri) {
    if (!uri) return;
    setCtrlStatus((currentLang === 'zh' ? '正在播放...' : 'Playing...'));
    try {
        const r = await fetch('/api/sonos_control', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({action: 'play_content', speakers: ctrlSelected, params: {uri}})
        });
        const j = await r.json();
        setCtrlStatus(j.status || j.error || 'OK');
        setTimeout(updateNowPlaying, 500); // Refresh now playing
    } catch(e) {
        setCtrlStatus('Error: ' + e.toString());
    }
};

function setCtrlSpeakers(list){
    const node = document.getElementById('ctrl_speakers'); 
    if (!node) return;
    node.innerHTML = '';
    
    (list||[]).forEach(p=>{
        const id = p.uid||p.ip||p.name;
        const label = `${p.name||p.ip||id}`;
        
        const card = document.createElement('div');
        card.style.cssText = 'padding:12px;background:rgba(255,255,255,0.03);border-radius:8px;border:1px solid rgba(255,255,255,0.05);cursor:pointer;transition:all 0.2s';
        
        const cb = document.createElement('input'); 
        cb.type='checkbox'; 
        cb.value=id; 
        cb.id='spk_'+id; 
        cb.style.marginRight = '8px';
        cb.addEventListener('change',()=>{
            if(cb.checked){ 
                if(!ctrlSelected.includes(id)) ctrlSelected.push(id);
                card.style.background = 'rgba(102,126,234,0.2)';
                card.style.borderColor = 'rgba(102,126,234,0.4)';
            } else { 
                ctrlSelected = ctrlSelected.filter(x=>x!==id);
                card.style.background = 'rgba(255,255,255,0.03)';
                card.style.borderColor = 'rgba(255,255,255,0.05)';
            }
        });
        
        const lab = document.createElement('label'); 
        lab.htmlFor='spk_'+id; 
        lab.textContent=label;
        lab.style.cursor = 'pointer';
        lab.style.userSelect = 'none';
        
        card.onclick = () => cb.click();
        card.appendChild(cb); 
        card.appendChild(lab);
        
        // Show volume and state
        if (p.volume !== undefined) {
            const vol = document.createElement('div');
            vol.style.cssText = 'font-size:11px;opacity:0.6;margin-top:4px';
            vol.textContent = `🔊 ${p.volume}%`;
            card.appendChild(vol);
        }
        
        node.appendChild(card);
    });
}

async function loadSpeakers(){
    try{
        const r = await fetch('/api/sonos_status');
        const j = await r.json();
        setCtrlSpeakers(j.players||[]);
    }catch(e){ setCtrlStatus('Error loading speakers: '+e.toString()); }
}

async function loadQueue(){
    const node = document.getElementById('ctrl_queue');
    if (!node) return;
    
    node.innerHTML = '<div style="text-align:center;padding:20px;opacity:0.5">' + 
                    (currentLang === 'zh' ? '載入中...' : 'Loading...') + '</div>';
    
    try {
        const speakerIp = ctrlSelected.length > 0 ? ctrlSelected[0] : '';
        const r = await fetch('/api/sonos_queue' + (speakerIp ? '?speaker_ip=' + speakerIp : ''));
        const j = await r.json();
        
        node.innerHTML = '';
        
        if (!j || j.length === 0) {
            node.innerHTML = '<div style="text-align:center;padding:40px;opacity:0.5">' + 
                            (currentLang === 'zh' ? '播放隊列為空' : 'Queue is empty') + '</div>';
            return;
        }
        
        j.forEach((item, idx) => {
            const d = document.createElement('div');
            d.style.cssText = 'padding:12px;background:rgba(255,255,255,0.03);border-radius:8px;margin-bottom:8px;border:1px solid rgba(255,255,255,0.05)';
            d.innerHTML = `
                <div style="display:flex;gap:12px;align-items:center">
                    <div style="min-width:30px;text-align:center;font-weight:600;opacity:0.5">${idx + 1}</div>
                    <div style="flex:1;min-width:0">
                        <div style="font-weight:600;margin-bottom:4px;overflow:hidden;text-overflow:ellipsis">${item.title || '-'}</div>
                        <div class="small" style="opacity:0.7;overflow:hidden;text-overflow:ellipsis">
                            ${item.artist || ''} ${item.album ? '· ' + item.album : ''}
                        </div>
                    </div>
                </div>
            `;
            node.appendChild(d);
        });
    } catch(e) {
        node.innerHTML = '<div style="text-align:center;padding:20px;color:#f87171">Error: ' + e.toString() + '</div>';
    }
}

document.addEventListener('DOMContentLoaded', loadSpeakers);

async function sendCtrlAction(action, extra={}){
    setCtrlStatus((currentLang === 'zh' ? '傳送指令...' : 'Sending...'));
    try{
        const r = await fetch('/api/sonos_control', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({action, speakers:ctrlSelected, params: extra})});
        const j = await r.json();
        setCtrlStatus(j.status||j.error||'OK');
        setTimeout(updateNowPlaying, 500); // Refresh now playing after action
    }catch(e){ setCtrlStatus('Error: '+e.toString()); }
}

// defensive event binding: only attach if elements exist to avoid runtime errors
console.log('dashboard script loaded');
const _eb = (id, ev, fn)=>{ const el = document.getElementById(id); if(el) el.addEventListener(ev, fn); };
_eb('ctrl_play','click', ()=>sendCtrlAction('play'));
_eb('ctrl_pause','click', ()=>sendCtrlAction('pause'));
_eb('ctrl_next','click', ()=>sendCtrlAction('next'));
_eb('ctrl_prev','click', ()=>sendCtrlAction('previous'));
_eb('ctrl_volup','click', ()=>sendCtrlAction('volume_up'));
_eb('ctrl_voldown','click', ()=>sendCtrlAction('volume_down'));
_eb('ctrl_mute','click', ()=>sendCtrlAction('mute'));
_eb('ctrl_unmute','click', ()=>sendCtrlAction('unmute'));

_eb('ctrl_search_btn','click', async ()=>{
    const qEl = document.getElementById('ctrl_search');
    const sEl = document.getElementById('ctrl_service');
    const q = qEl ? qEl.value : '';
    const service = sEl ? sEl.value : 'library';
    
    if (!q) {
        setCtrlStatus(currentLang === 'zh' ? '請輸入搜尋關鍵字' : 'Please enter search query');
        return;
    }
    
    setCtrlStatus((currentLang === 'zh' ? '搜尋中...' : 'Searching...'));
    try{
        const r = await fetch('/api/sonos_search?query='+encodeURIComponent(q)+'&service='+encodeURIComponent(service));
        const j = await r.json();
        setCtrlResults(j||[]);
        setCtrlStatus((currentLang === 'zh' ? '找到 ' : 'Found ') + (j ? j.length : 0) + (currentLang === 'zh' ? ' 個結果' : ' results'));
    }catch(e){ setCtrlStatus('Error: '+e.toString()); }
});

_eb('ctrl_volume','input', e=>{ 
    const val = document.getElementById('ctrl_volume_val'); 
    if(val) val.textContent = e.target.value + '%'; 
});

_eb('ctrl_volume','change', e=>{
    const v = parseInt(e.target.value) || 30;
    sendCtrlAction('set_volume', {volume: v});
});

_eb('refresh_queue','click', loadQueue);

_eb('clear_queue','click', async ()=>{
    if (!confirm(currentLang === 'zh' ? '確定要清空播放隊列嗎？' : 'Clear the queue?')) return;
    // This would require a new API endpoint to clear queue
    setCtrlStatus(currentLang === 'zh' ? '清空隊列功能開發中' : 'Clear queue feature in development');
});

// Dashboard tab event listeners
_eb('scan_btn', 'click', async ()=>{
    const statusEl = document.getElementById('scan_status');
    if(statusEl) statusEl.textContent = 'Scanning...';
    try {
        const r = await fetch('/api/scan_network');
        const j = await r.json();
        statusEl.textContent = j.error ? 'Error: '+j.error : 'Scan complete: '+(j.results?j.results.length:0)+' hosts.';
    } catch(e) {
        if(statusEl) statusEl.textContent = 'Error: '+e.toString();
    }
});
_eb('download_csv', 'click', ()=>{
    window.open('/api/download_csv', '_blank');
});
// Capture button removed - users should manually run tcpdump
// _eb('cap_btn', 'click', async ()=>{ ... });
_eb('download_sonos_pcap', 'click', ()=>{
    window.open('/api/sonos_pcap', '_blank');
});
_eb('analyze_last', 'click', async ()=>{
    const statusEl = document.getElementById('analyze_status');
    statusEl.textContent = 'Analyzing last pcap...';
    try {
        const r = await fetch('/api/analyze_pcap');
        const j = await r.json();
        if(j.error) { statusEl.textContent = 'Error: '+j.error; return; }
        // update metrics
        document.getElementById('m_endpoints').textContent = j.endpoints ? j.endpoints.length : '—';
        document.getElementById('m_ssdp').textContent = j.ssdp_messages ? j.ssdp_messages.length : '—';
        document.getElementById('m_sonos').textContent = j.sonos_tcp ? j.sonos_tcp.length : '—';
        // top endpoints
        let html = '';
        (j.endpoints||[]).slice(0,10).forEach(e=>{ html += `<div>${e.ip} (${e.count})</div>`; });
        document.getElementById('top_endpoints').innerHTML = html;
        html = '';
        (j.sonos_top_senders||[]).slice(0,10).forEach(e=>{ html += `<div>${e.ip} (${e.count})</div>`; });
        document.getElementById('top_senders').innerHTML = html;
        html = '';
        (j.ssdp_messages||[]).slice(0,10).forEach(e=>{ html += `<div>${e.location||''} ${e.usn||''}</div>`; });
        document.getElementById('ssdp_list').innerHTML = html;
        statusEl.textContent = 'Analysis complete.';
    } catch(e) {
        statusEl.textContent = 'Error: '+e.toString();
    }
});
_eb('upload_analyze', 'click', async ()=>{
    const statusEl = document.getElementById('analyze_status');
    const fileEl = document.getElementById('pcap_file');
    if(!fileEl || !fileEl.files.length) { statusEl.textContent = 'No file selected.'; return; }
    statusEl.textContent = 'Uploading and analyzing...';
    const formData = new FormData();
    formData.append('pcap', fileEl.files[0]);
    try {
        const r = await fetch('/api/analyze_pcap', {method:'POST', body:formData});
        const j = await r.json();
        if(j.error) { statusEl.textContent = 'Error: '+j.error; return; }
        // update metrics
        document.getElementById('m_endpoints').textContent = j.endpoints ? j.endpoints.length : '—';
        document.getElementById('m_ssdp').textContent = j.ssdp_messages ? j.ssdp_messages.length : '—';
        document.getElementById('m_sonos').textContent = j.sonos_tcp ? j.sonos_tcp.length : '—';
        // top endpoints
        let html = '';
        (j.endpoints||[]).slice(0,10).forEach(e=>{ html += `<div>${e.ip} (${e.count})</div>`; });
        document.getElementById('top_endpoints').innerHTML = html;
        html = '';
        (j.sonos_top_senders||[]).slice(0,10).forEach(e=>{ html += `<div>${e.ip} (${e.count})</div>`; });
        document.getElementById('top_senders').innerHTML = html;
        html = '';
        (j.ssdp_messages||[]).slice(0,10).forEach(e=>{ html += `<div>${e.location||''} ${e.usn||''}</div>`; });
        document.getElementById('ssdp_list').innerHTML = html;
        statusEl.textContent = 'Analysis complete.';
    } catch(e) {
        statusEl.textContent = 'Error: '+e.toString();
    }
});

// Health check buttons: Check Streams and Check Sonos
_eb('check_streams_btn', 'click', async ()=>{
    const statusEl = document.getElementById('health_status');
    if(statusEl) statusEl.textContent = 'Checking streams...';
    try {
        const r = await fetch('/api/check_streams');
        const j = await r.json();
        if (j.services) {
            let html = '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px;margin-top:12px">';
            j.services.forEach(svc => {
                // 200-399 are successful responses, including redirects
                const isOk = svc.http_status && svc.http_status >= 200 && svc.http_status < 400 && !svc.error;
                // 405 Method Not Allowed is also OK - server is responding
                const is405 = svc.http_status === 405;
                const statusColor = (isOk || is405) ? '#4ade80' : (svc.error ? '#f87171' : '#fbbf24');
                const statusIcon = (isOk || is405) ? '✓' : (svc.error ? '✗' : '⚠');
                
                // Map hostname to brand name and emoji
                let brandName = svc.host;
                let brandEmoji = '🌐';
                if (svc.host.includes('spotify')) {
                    brandName = 'Spotify';
                    brandEmoji = '🎵';
                } else if (svc.host.includes('apple')) {
                    brandName = 'Apple Music';
                    brandEmoji = '🍎';
                } else if (svc.host.includes('youtube')) {
                    brandName = 'YouTube';
                    brandEmoji = '▶️';
                } else if (svc.host.includes('netflix')) {
                    brandName = 'Netflix';
                    brandEmoji = '🎬';
                } else if (svc.host.includes('amazon')) {
                    brandName = 'Amazon';
                    brandEmoji = '📦';
                }
                
                // Add status explanation based on current language
                let statusExplain = '';
                if (svc.http_status === 301 || svc.http_status === 302) {
                    statusExplain = currentLang === 'zh' ? '<div style="font-size:10px;opacity:0.5;margin-top:2px">(重定向)</div>' : '<div style="font-size:10px;opacity:0.5;margin-top:2px">(Redirect)</div>';
                } else if (svc.http_status === 405) {
                    statusExplain = currentLang === 'zh' ? '<div style="font-size:10px;opacity:0.5;margin-top:2px">(服務回應)</div>' : '<div style="font-size:10px;opacity:0.5;margin-top:2px">(Responding)</div>';
                } else if (svc.http_status === 200) {
                    statusExplain = currentLang === 'zh' ? '<div style="font-size:10px;opacity:0.5;margin-top:2px">(正常)</div>' : '<div style="font-size:10px;opacity:0.5;margin-top:2px">(OK)</div>';
                }
                
                html += `
                    <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:16px;display:flex;flex-direction:column;align-items:center;text-align:center;gap:12px;min-height:140px">
                        <div style="font-size:32px;margin-top:4px">
                            ${brandEmoji}
                        </div>
                        <div style="flex:1;display:flex;flex-direction:column;justify-content:center;width:100%">
                            <div style="font-weight:600;font-size:14px;margin-bottom:8px">${brandName}</div>
                            <div style="display:flex;flex-direction:column;gap:4px;font-size:12px;opacity:0.7">
                                ${svc.http_status ? '<div>HTTP <strong>'+svc.http_status+'</strong>'+statusExplain+'</div>' : ''}
                                ${svc.tcp_connect_ms ? '<div>TCP <strong>'+svc.tcp_connect_ms+'ms</strong></div>' : ''}
                            </div>
                            ${svc.error ? '<div style="margin-top:6px;color:#f87171;font-size:11px;word-break:break-word">'+svc.error+'</div>' : ''}
                        </div>
                        <div style="width:32px;height:32px;border-radius:50%;background:${statusColor}20;display:flex;align-items:center;justify-content:center;font-size:16px;color:${statusColor}">
                            ${statusIcon}
                        </div>
                    </div>
                `;
            });
            html += '</div>';
            document.getElementById('streams_list').innerHTML = html;
        }
        if(statusEl) statusEl.textContent = 'Streams checked.';
    } catch(e) {
        if(statusEl) statusEl.textContent = 'Error: '+e.toString();
    }
});

_eb('check_sonos_btn', 'click', async ()=>{
    const statusEl = document.getElementById('health_status');
    if(statusEl) statusEl.textContent = 'Checking Sonos...';
    try {
        const r = await fetch('/api/sonos_status');
        const j = await r.json();
        if (j.players) {
            let html = '<div style="display:grid;gap:12px;margin-top:12px">';
            j.players.forEach(p => {
                const isPlaying = p.transport && p.transport.current_transport_state === 'PLAYING';
                const statusColor = p.error ? '#f87171' : (isPlaying ? '#4ade80' : '#94a3b8');
                const statusIcon = p.error ? '✗' : (isPlaying ? '▶' : '⏸');
                const trackTitle = p.track && p.track.title ? p.track.title : (currentLang === 'zh' ? '無曲目' : 'No track');
                const trackArtist = p.track && p.track.artist ? p.track.artist : '';
                
                // Status text based on language
                let statusText = '';
                if (p.error) {
                    statusText = currentLang === 'zh' ? '錯誤' : 'Error';
                } else if (isPlaying) {
                    statusText = currentLang === 'zh' ? '播放中' : 'Playing';
                } else {
                    statusText = currentLang === 'zh' ? '已停止' : 'Stopped';
                }
                
                const mutedText = p.mute ? (currentLang === 'zh' ? '🔇 靜音' : '🔇 Muted') : '';
                
                html += `
                    <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:16px;display:flex;align-items:center;gap:16px">
                        <div style="width:48px;height:48px;border-radius:50%;background:${statusColor}20;display:flex;align-items:center;justify-content:center;font-size:20px;color:${statusColor};flex-shrink:0">
                            ${statusIcon}
                        </div>
                        <div style="flex:1;min-width:0">
                            <div style="font-weight:600;font-size:15px;margin-bottom:4px">${p.name || p.ip || p.uid}</div>
                            <div style="font-size:13px;opacity:0.7;margin-bottom:6px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">
                                ${trackTitle}${trackArtist ? ' · '+trackArtist : ''}
                            </div>
                            <div style="display:flex;gap:12px;font-size:12px;opacity:0.6">
                                <span>🔊 ${p.volume}%</span>
                                <span>${mutedText}</span>
                                <span>📍 ${p.ip || ''}</span>
                            </div>
                            ${p.error ? '<div style="margin-top:6px;color:#f87171;font-size:13px">'+p.error+'</div>' : ''}
                        </div>
                        <div style="padding:6px 12px;border-radius:6px;background:${statusColor}20;color:${statusColor};font-size:12px;font-weight:600;flex-shrink:0">
                            ${statusText}
                        </div>
                    </div>
                `;
            });
            html += '</div>';
            document.getElementById('sonos_list').innerHTML = html;
        }
        if(statusEl) statusEl.textContent = 'Sonos checked.';
    } catch(e) {
        if(statusEl) statusEl.textContent = 'Error: '+e.toString();
    }
});

// Diagnostics button handlers
async function runDiagnostic(action, buttonText) {
    const statusEl = document.getElementById('diag_status');
    if (!statusEl) return;
    
    statusEl.innerHTML = `<div style="color:#60a5fa">⏳ ${buttonText}...</div>`;
    
    try {
        const r = await fetch('/api/sonos_diagnostics', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({action: action})
        });
        const j = await r.json();
        
        let html = '';
        if (j.success) {
            html += `<div style="color:#4ade80;margin-bottom:8px">✓ ${j.message}</div>`;
        } else {
            html += `<div style="color:#fbbf24;margin-bottom:8px">⚠ ${j.message}</div>`;
        }
        
        if (j.details && j.details.length > 0) {
            html += '<div style="margin-top:8px;max-height:200px;overflow-y:auto">';
            j.details.forEach(d => {
                if (d.error) {
                    html += `<div style="font-size:12px;padding:4px;opacity:0.8">❌ ${d.name}: ${d.error}</div>`;
                } else if (d.status === 'healthy') {
                    html += `<div style="font-size:12px;padding:4px;opacity:0.8">✓ ${d.name} (${d.ip}) - Ping: ${d.ping}, API: ${d.api}</div>`;
                } else if (d.status === 'issue') {
                    html += `<div style="font-size:12px;padding:4px;opacity:0.8;color:#fbbf24">⚠ ${d.name} (${d.ip}) - Ping: ${d.ping}, API: ${d.api}</div>`;
                } else if (d.coordinator !== undefined) {
                    html += `<div style="font-size:12px;padding:4px;opacity:0.8">${d.coordinator ? '👑' : '🔗'} ${d.name} - Group: ${d.group_members}, State: ${d.transport_state}</div>`;
                } else {
                    html += `<div style="font-size:12px;padding:4px;opacity:0.8">✓ ${d.name || d.ip}</div>`;
                }
            });
            html += '</div>';
        }
        
        if (j.error) {
            html += `<div style="color:#f87171;margin-top:8px;font-size:12px">${j.error}</div>`;
        }
        
        statusEl.innerHTML = html;
        
        // Auto-refresh Sonos health if action was refresh, ungroup, mute, or unmute
        if (['refresh', 'ungroup_all', 'mute_all', 'unmute_all'].includes(action)) {
            setTimeout(() => {
                document.getElementById('check_sonos_btn')?.click();
            }, 500);
        }
    } catch(e) {
        statusEl.innerHTML = `<div style="color:#f87171">Error: ${e.toString()}</div>`;
    }
}

_eb('diag_refresh_all', 'click', () => {
    const text = currentLang === 'zh' ? '重新掃描設備' : 'Refreshing devices';
    runDiagnostic('refresh', text);
});

_eb('diag_ungroup_all', 'click', () => {
    const text = currentLang === 'zh' ? '解散所有群組' : 'Ungrouping all';
    runDiagnostic('ungroup_all', text);
});

_eb('diag_mute_all', 'click', () => {
    const text = currentLang === 'zh' ? '全部靜音' : 'Muting all';
    runDiagnostic('mute_all', text);
});

_eb('diag_unmute_all', 'click', () => {
    const text = currentLang === 'zh' ? '取消靜音' : 'Unmuting all';
    runDiagnostic('unmute_all', text);
});

_eb('diag_check_network', 'click', () => {
    const text = currentLang === 'zh' ? '檢查網路連線' : 'Checking network';
    runDiagnostic('check_network', text);
});

_eb('diag_sync_check', 'click', () => {
    const text = currentLang === 'zh' ? '檢查同步狀態' : 'Checking sync';
    runDiagnostic('check_sync', text);
});
