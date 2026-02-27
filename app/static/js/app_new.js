// Alpine.js Dashboard App
function dashboardApp() {
    return {
        // Alpine.js required state
        activeTab: 'dashboard',
        musicTab: 'search',
        theme: 'aurora',
        language: 'zh',
        scanning: false,
        scanResults: 0,
        scanInfo: { network: '', hosts: [], withHostname: 0 },
        metrics: { endpoints: 0, endpointsDetail: '', ssdp: 0, ssdpDetail: '', sonos: 0, sonosDetail: '', hasData: false, filesize: 0, packets: 0, duration: 0, rate: 0 },
        nowPlaying: { title: '', artist: '', speaker: '', state: 'PAUSED_PLAYBACK' },
        players: [],
        toast: { show: false, message: '' },
        // Intercom & TTS
        selectedSpeakers: [],
        broadcastMode: 'tts',
        ttsText: '',
        ttsLanguage: 'zh',
        ttsSlow: false,
        broadcastSpeaker: '',
        ttsVolume: 50,
        broadcastStatus: { isPlaying: false, isPaused: false, speakerName: '', currentVolume: 50 },
        isRecording: false,
        recordingTime: 0,
        recordedAudio: null,
        uploadProgress: 0,
        isUploading: false,
        showFileManager: false,
        audioFiles: { tts: [], recordings: [] },
        searchQuery: '',
        volume: 50,
        // Assistant
        assistantMode: 'voice',
        isAssistantRecording: false,
        assistantRecordingTime: 0,
        assistantAudio: null,
        assistantMediaStream: null,
        assistantTextInput: '',
        assistantLanguage: 'zh',
        assistantVoice: 'zh-TW',
        assistantSpeaker: '',
        assistantVolume: 50,
        isProcessing: false,
        chatHistory: [],
        // ...existing code...
        // Translations (i18n)
        translations: {
                en: {
                    tab_dashboard: 'Dashboard',
                    tab_controller: 'Controller',
                    tab_intercom: 'Intercom',
                    tab_assistant: 'Voice Assistant',
                    network_label: 'Network',
                    scan_btn: 'Scan Network',
                    detected_label: 'Detected',
                    network_range: 'Network',
                    hosts_found: 'Hosts Found',
                    with_hostname: 'With Hostname',
                    scan_prompt: 'Click scan to discover devices on your network',
                    pcap_analysis: 'PCAP Analysis',
                    metric_unique: 'Unique Endpoints',
                    metric_ssdp: 'SSDP Messages',
                    metric_sonos: 'Sonos TCP',
                    metric_filesize: 'File Size',
                    metric_packets: 'Total Packets',
                    metric_duration: 'Duration',
                    metric_rate: 'Avg Rate',
                    analyze_last: 'Analyze Last',
                    upload_analyze: 'Upload & Analyze',
                    sonos_health: 'Sonos Health',
                    // Intercom
                    intercom_title: 'Intercom Broadcast',
                    tts_mode: 'Text to Speech',
                    recording_mode: 'Recording Broadcast',
                    broadcast_content_label: 'Broadcast Content',
                    tts_placeholder: 'Enter text to broadcast...',
                    start_broadcast: 'Start Broadcast',
                    broadcast_volume: 'Broadcast Volume',
                    no_broadcast_yet: 'No broadcast started',
                    broadcast_speaker_label: 'Broadcast Speaker',
                    stop_broadcast: 'Stop Broadcast',
                    tip_select_speaker: '✓ Select a speaker to start',
                    tip_adjust_volume: '✓ Adjust volume during playback',
                    select_speaker: 'Select Speaker',
                    broadcast_tts_btn: 'Broadcast',
                    broadcast_recording_btn: 'Broadcast Recording',
                    start_recording: 'Start Recording',
                    stop_recording: 'Stop Recording',
                    delete_recording: 'Delete Recording',
                    // Assistant
                    assistant_title: 'AI Voice Assistant',
                    assistant_subtitle: 'Voice Questions · AI Chat · Sonos Playback',
                    voice_question: 'Voice Question',
                    text_input: 'Text Input',
                    press_to_speak: 'Hold to Speak',
                    listening: 'Listening...',
                    recording_finished: 'Recording Complete',
                    send_voice: 'Send Question',
                    send_text: 'Send Question',
                    ai_settings: 'AI Settings',
                    speech_language: 'Speech Language',
                    reply_voice: 'Reply Voice',
                    play_speaker: 'Playback Speaker',
                    volume_label: 'Volume',
                    status_whisper: 'Speech to Text (Whisper API)',
                    status_chatgpt: 'AI Chat (ChatGPT API)',
                    status_tts: 'Text to Speech (gTTS)',
                    status_sonos: 'Sonos Playback',
                    clear_chat: 'Clear Chat',
                    empty_chat_title: 'Start Chat',
                    empty_chat_subtitle: 'Record or type a question to begin',
                    // Generic toasts
                    toast_recording_start: 'Recording started',
                    toast_recording_done: 'Recording finished',
                    toast_recording_deleted: 'Recording deleted',
                    toast_need_speaker: 'Select a speaker first',
                    toast_need_text: 'Enter text first',
                    toast_need_recording: 'Record audio first',
                    toast_broadcasting: 'Broadcasting...',
                    toast_cleared_chat: 'Chat history cleared',
                    toast_chat_already_empty: 'Chat history already empty',
                    confirm_clear_chat: 'Clear all chat history?',
                    // Packet capture tutorial
                    pcap_manual_title: 'Manual Packet Capture',
                    pcap_manual_intro: 'Live capture disabled for security. Use the following command to capture packets:',
                    pcap_copy_btn: 'Copy Command',
                    pcap_mac_hint_title: 'macOS Tip:',
                    pcap_mac_hint_body: 'Use interface en0 (Wi‑Fi) or en4 (Ethernet).',
                    pcap_mac_hint_param: '-G 5 means auto-stop after 5 seconds',
                    pcap_steps_title: 'Steps:',
                    pcap_step_1: '1️⃣ Run the command in your terminal',
                    pcap_step_2: '2️⃣ Wait 5 seconds (or press Ctrl+C to stop early)',
                    pcap_step_3: '3️⃣ Upload ~/Downloads/capture.pcap below for analysis',
                    // Toasts new
                    toast_hosts_found: 'Found {count} hosts',
                    toast_analysis_start: 'Analyzing PCAP...',
                    toast_uploading: 'Uploading & analyzing...',
                    toast_analysis_complete: 'Analysis complete',
                    toast_grouping: 'Grouping speakers...',
                    toast_no_sonos: 'No Sonos devices found',
                    toast_checking_sonos: 'Checking Sonos devices...',
                    toast_stream_checks: 'Checking streaming services...',
                    toast_stream_complete: 'Stream checks complete',
                    toast_no_stream: 'No stream data available',
                    toast_select_two: 'Select at least 2 speakers to group',
                    error_generic: 'Error: {msg}',
                    search_need_keyword: 'Enter search keyword',
                    search_in_progress: 'Searching...',
                    toast_ungrouping: 'Ungrouping speakers...'
                },
                zh: {
                    tab_dashboard: '儀表板',
                    tab_controller: '音樂控制',
                    tab_intercom: '對講機',
                    tab_assistant: '語音助理',
                    network_label: '網路掃描',
                    scan_btn: '開始掃描',
                    detected_label: '偵測到',
                    network_range: '網段',
                    hosts_found: '發現裝置',
                    with_hostname: '可辨識',
                    scan_prompt: '點擊「開始掃描」以探索網路上的裝置',
                    pcap_analysis: '封包分析',
                    metric_unique: '不重複端點',
                    metric_ssdp: 'SSDP 訊息',
                    metric_sonos: 'Sonos TCP',
                    metric_filesize: '檔案大小',
                    metric_packets: '封包總數',
                    metric_duration: '擷取時長',
                    metric_rate: '平均速率',
                    analyze_last: '分析最新檔案',
                    upload_analyze: '上傳並分析',
                    sonos_health: 'Sonos 裝置狀態',
                    // Intercom
                    intercom_title: '廣播系統',
                    tts_mode: '文字轉語音',
                    recording_mode: '錄音廣播',
                    broadcast_content_label: '廣播內容',
                    tts_placeholder: '輸入要廣播的內容...',
                    start_broadcast: '開始廣播',
                    broadcast_volume: '廣播音量',
                    no_broadcast_yet: '尚未開始廣播',
                    broadcast_speaker_label: '廣播喇叭',
                    stop_broadcast: '停止廣播',
                    tip_select_speaker: '✓ 選擇一個喇叭進行廣播',
                    tip_adjust_volume: '✓ 廣播時可即時調整音量',
                    select_speaker: '選擇喇叭',
                    broadcast_tts_btn: '開始廣播',
                    broadcast_recording_btn: '廣播錄音',
                    start_recording: '開始錄音',
                    stop_recording: '停止錄音',
                    delete_recording: '刪除錄音',
                    // Assistant
                    assistant_title: 'AI 語音助理',
                    assistant_subtitle: '語音提問 · AI 對話 · Sonos 播放',
                    voice_question: '語音提問',
                    text_input: '文字輸入',
                    press_to_speak: '按住說話',
                    listening: '正在聆聽...',
                    recording_finished: '錄音完成',
                    send_voice: '發送提問',
                    send_text: '發送問題',
                    ai_settings: 'AI 設定',
                    speech_language: '語音語言',
                    reply_voice: '回覆語音',
                    play_speaker: '播放喇叭',
                    volume_label: '音量',
                    status_whisper: '語音轉文字（Whisper API）',
                    status_chatgpt: 'AI 對話（ChatGPT API）',
                    status_tts: '文字轉語音（gTTS）',
                    status_sonos: 'Sonos 自動播放',
                    clear_chat: '清除對話',
                    empty_chat_title: '開始對話',
                    empty_chat_subtitle: '錄音或輸入問題開始互動',
                    // Generic toasts
                    toast_recording_start: '開始錄音',
                    toast_recording_done: '錄音完成',
                    toast_recording_deleted: '已刪除錄音',
                    toast_need_speaker: '請先選擇喇叭',
                    toast_need_text: '請輸入文字',
                    toast_need_recording: '請先錄音',
                    toast_broadcasting: '正在廣播...',
                    toast_cleared_chat: '已清除對話記錄',
                    toast_chat_already_empty: '對話記錄已是空的',
                    confirm_clear_chat: '確定要清除所有對話記錄嗎？',
                    // Packet capture
                    pcap_manual_title: '手動封包擷取',
                    pcap_manual_intro: '基於安全考量，即時擷取功能已停用。請使用以下指令手動擷取網路封包：',
                    pcap_copy_btn: '複製指令',
                    pcap_mac_hint_title: 'macOS 使用者請注意：',
                    pcap_mac_hint_body: '網路介面請使用 en0（Wi‑Fi）或 en4（有線網路）。',
                    pcap_mac_hint_param: '-G 5 參數代表擷取 5 秒後自動停止',
                    pcap_steps_title: '操作步驟：',
                    pcap_step_1: '1️⃣ 在終端機執行上方指令',
                    pcap_step_2: '2️⃣ 等待 5 秒自動停止（或按 Ctrl+C 提前結束）',
                    pcap_step_3: '3️⃣ 將 ~/Downloads/capture.pcap 檔案上傳至下方進行分析',
                    // Toasts extension
                    toast_hosts_found: '發現 {count} 個裝置',
                    toast_analysis_start: '分析封包中...',
                    toast_uploading: '上傳並分析中...',
                    toast_analysis_complete: '分析完成',
                    toast_grouping: '正在群組喇叭...',
                    toast_no_sonos: '未找到 Sonos 裝置',
                    toast_checking_sonos: '正在檢查 Sonos 裝置...',
                    toast_stream_checks: '正在檢查串流服務...',
                    toast_stream_complete: '檢查完成',
                    toast_no_stream: '無串流資料',
                    toast_select_two: '請至少選擇兩個喇叭以群組',
                    error_generic: '錯誤：{msg}',
                    search_need_keyword: '請輸入搜尋關鍵字',
                    search_in_progress: '搜尋中...',
                    toast_ungrouping: '解除喇叭群組...'
                },
                ja: {
                    tab_dashboard: 'ダッシュボード',
                    tab_controller: 'コントローラ',
                    tab_intercom: 'インターコム',
                    tab_assistant: '音声アシスタント',
                    network_label: 'ネットワークスキャン',
                    scan_btn: 'スキャン開始',
                    detected_label: '検出',
                    network_range: 'ネットワーク',
                    hosts_found: 'ホスト数',
                    with_hostname: 'ホスト名あり',
                    scan_prompt: 'スキャンしてネットワーク上のデバイスを探索',
                    pcap_analysis: 'PCAP解析',
                    metric_unique: 'ユニークエンドポイント',
                    metric_ssdp: 'SSDPメッセージ',
                    metric_sonos: 'Sonos TCP',
                    metric_filesize: 'ファイルサイズ',
                    metric_packets: 'パケット総数',
                    metric_duration: 'キャプチャ時間',
                    metric_rate: '平均レート',
                    analyze_last: '最新を解析',
                    upload_analyze: 'アップロード解析',
                    sonos_health: 'Sonos状態',
                    intercom_title: 'ブロードキャスト',
                    tts_mode: 'テキスト音声化',
                    recording_mode: '録音ブロードキャスト',
                    broadcast_content_label: '内容',
                    tts_placeholder: 'ブロードキャストするテキスト...',
                    start_broadcast: '開始',
                    broadcast_volume: '音量',
                    no_broadcast_yet: '未開始',
                    broadcast_speaker_label: 'スピーカー',
                    stop_broadcast: '停止',
                    tip_select_speaker: '✓ スピーカーを選択',
                    tip_adjust_volume: '✓ 再生中に音量調整可能',
                    assistant_title: 'AI音声アシスタント',
                    assistant_subtitle: '音声質問 · AI会話 · Sonos再生',
                    voice_question: '音声質問',
                    text_input: 'テキスト入力',
                    press_to_speak: '長押しで話す',
                    listening: '聴取中...',
                    recording_finished: '録音完了',
                    send_voice: '質問送信',
                    send_text: '質問送信',
                    ai_settings: 'AI設定',
                    speech_language: '音声言語',
                    reply_voice: '返信音声',
                    play_speaker: '再生スピーカー',
                    volume_label: '音量',
                    status_whisper: '音声→テキスト (Whisper)',
                    status_chatgpt: 'AI会話 (ChatGPT)',
                    status_tts: 'テキスト→音声 (gTTS)',
                    status_sonos: 'Sonos再生',
                    clear_chat: '履歴クリア',
                    empty_chat_title: '開始',
                    empty_chat_subtitle: '録音または入力で開始',
                    toast_recording_start: '録音開始',
                    toast_recording_done: '録音完了',
                    toast_recording_deleted: '録音削除',
                    toast_need_speaker: '先にスピーカーを選択',
                    toast_need_text: 'テキストを入力してください',
                    toast_need_recording: '録音してください',
                    toast_broadcasting: 'ブロードキャスト中...',
                    toast_cleared_chat: '履歴をクリアしました',
                    toast_chat_already_empty: '履歴は既に空です',
                    confirm_clear_chat: '全ての履歴をクリアしますか？',
                    pcap_manual_title: '手動パケットキャプチャ',
                    pcap_manual_intro: 'セキュリティのためライブキャプチャは無効です。以下のコマンドでキャプチャ。',
                    pcap_copy_btn: 'コマンドをコピー',
                    pcap_mac_hint_title: 'macOSヒント:',
                    pcap_mac_hint_body: 'インターフェース: en0 (Wi‑Fi) / en4 (Ethernet)',
                    pcap_mac_hint_param: '-G 5 は 5 秒後自動停止',
                    pcap_steps_title: '手順:',
                    pcap_step_1: '1️⃣ コマンドを実行',
                    pcap_step_2: '2️⃣ 5 秒待機（Ctrl+Cで中断）',
                    pcap_step_3: '3️⃣ capture.pcap をアップロードして解析',
                    toast_hosts_found: '{count} 台のホストを発見',
                    toast_analysis_start: 'PCAP解析中...',
                    toast_uploading: 'アップロード解析中...',
                    toast_analysis_complete: '解析完了',
                    toast_grouping: 'スピーカーをグループ化中...',
                    toast_no_sonos: 'Sonosデバイスが見つかりません',
                    toast_checking_sonos: 'Sonosデバイス確認中...',
                    toast_stream_checks: 'ストリーミングサービス確認中...',
                    toast_stream_complete: '確認完了',
                    toast_no_stream: 'ストリームデータなし',
                    toast_select_two: '少なくとも2台選択してください',
                    error_generic: 'エラー: {msg}',
                    search_need_keyword: '検索キーワードを入力',
                    search_in_progress: '検索中...',
                    toast_ungrouping: 'グループ解除中...'
                }
            },
        
        // Initialize
        init() {
            // Load theme and language from localStorage
            const savedTheme = localStorage.getItem('theme') || 'aurora';
            const savedLang = localStorage.getItem('lang') || 'zh';
            this.theme = savedTheme;
            this.language = savedLang;
            
            this.loadSpeakers();
            this.startAutoRefresh();
            this.loadAudioFiles();
            
            // Setup keyboard shortcuts
            this.setupKeyboardShortcuts();
            
            // Watch active tab
            this.$watch('activeTab', (value) => {
                if (value === 'controller') {
                    this.updateNowPlaying();
                }
                if (value === 'intercom') {
                    this.loadAudioFiles();
                }
                setTimeout(() => lucide.createIcons(), 50);
            });
            
            this.$watch('musicTab', () => {
                setTimeout(() => lucide.createIcons(), 50);
            });
            
            this.$watch('showFileManager', () => {
                setTimeout(() => lucide.createIcons(), 50);
            });
        },
        
        setupKeyboardShortcuts() {
            // Space key for recording toggle (only in assistant tab)
            document.addEventListener('keydown', (e) => {
                // Only trigger in assistant tab
                if (this.activeTab !== 'assistant') return;
                
                // Ignore if user is typing in an input/textarea
                if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
                
                // Space key
                if (e.code === 'Space' || e.keyCode === 32) {
                    e.preventDefault();
                    
                    // Toggle recording
                    if (!this.isAssistantRecording && !this.isProcessing) {
                        this.startAssistantRecording();
                    } else if (this.isAssistantRecording) {
                        this.stopAssistantRecording();
                    }
                }
            });
        },
        
        // Translation helper
        t(key) {
            return this.translations[this.language]?.[key] || this.translations.en[key] || key;
        },
        
        setLanguage(lang) {
            this.language = lang;
            localStorage.setItem('lang', lang);
        },
        
        setTheme(newTheme) {
            this.theme = newTheme;
            localStorage.setItem('theme', newTheme);
        },
        
        // Toast notification
        showToast(message) {
            this.toast.message = message;
            this.toast.show = true;
            setTimeout(() => {
                this.toast.show = false;
            }, 3000);
        },
        // Toast via translation key (supports optional placeholders)
        showToastKey(key, replacements = {}) {
            let base = this.t(key);
            Object.entries(replacements).forEach(([k,v]) => {
                base = base.replace(new RegExp('{' + k + '}', 'g'), v);
            });
            this.showToast(base);
        },
        
        // Network Scanning
        async scanNetwork() {
            this.scanning = true;
            this.scanResults = null;
            try {
                const response = await fetch('/api/scan_network');
                const data = await response.json();
                
                if (data.error) {
                    this.showToast('Error: ' + data.error);
                    return;
                }
                
                this.scanResults = data.results ? data.results.length : 0;
                this.scanInfo.network = data.network || '—';
                this.scanInfo.hosts = data.results || [];
                
                // Count hosts with hostname
                this.scanInfo.withHostname = this.scanInfo.hosts.filter(h => h.hostname).length;
                
                this.showToastKey('toast_hosts_found', { count: this.scanResults });
                
                // Re-init icons for new elements
                setTimeout(() => lucide.createIcons(), 100);
            } catch (error) {
                this.showToast('Error: ' + error.message);
            } finally {
                this.scanning = false;
            }
        },
        
        // PCAP Analysis
        async analyzePcap() {
            this.showToastKey('toast_analysis_start');
            try {
                const response = await fetch('/api/analyze_pcap');
                const data = await response.json();
                
                if (data.error) {
                    this.showToast('Error: ' + data.error);
                    return;
                }
                
                this.updateMetricsFromPcap(data);
                this.showToastKey('toast_analysis_complete');
            } catch (error) {
                this.showToast('Error: ' + error.message);
            }
        },
        
        async uploadPcap(event) {
            const file = event.target.files[0];
            if (!file) return;
            
            this.showToastKey('toast_uploading');
            
            const formData = new FormData();
            formData.append('pcap', file);
            
            try {
                const response = await fetch('/api/analyze_pcap', {
                    method: 'POST',
                    body: formData
                });
                const data = await response.json();
                
                if (data.error) {
                    this.showToast('Error: ' + data.error);
                    return;
                }
                
                this.updateMetricsFromPcap(data);
                this.showToastKey('toast_analysis_complete');
            } catch (error) {
                this.showToast('Error: ' + error.message);
            }
        },
        
        updateMetricsFromPcap(data) {
            // Basic counts
            this.metrics.endpoints = data.endpoints ? data.endpoints.length : 0;
            this.metrics.ssdp = data.ssdp_messages ? data.ssdp_messages.length : 0;
            this.metrics.sonos = data.sonos_tcp ? data.sonos_tcp.length : 0;
            
            // Details
            if (data.endpoints && data.endpoints.length > 0) {
                const topEndpoint = data.endpoints[0];
                this.metrics.endpointsDetail = `Top: ${topEndpoint.ip} (${topEndpoint.count} pkts)`;
            }
            
            if (data.ssdp_messages && data.ssdp_messages.length > 0) {
                const methods = data.ssdp_messages.map(m => m.method).filter(m => m);
                const uniqueMethods = [...new Set(methods)];
                this.metrics.ssdpDetail = uniqueMethods.length > 0 ? `Methods: ${uniqueMethods.join(', ')}` : 'Discovery messages';
            }
            
            if (data.sonos_tcp && data.sonos_tcp.length > 0) {
                const httpMethods = data.sonos_tcp.map(m => m.http_method).filter(m => m);
                const uniqueHttp = [...new Set(httpMethods)];
                this.metrics.sonosDetail = uniqueHttp.length > 0 ? `HTTP: ${uniqueHttp.join(', ')}` : 'Control messages';
            }
            
            // File info
            if (data.size) {
                this.metrics.filesize = this.formatFileSize(data.size);
            }
            
            // Parse capinfos if available
            if (data.capinfos) {
                const capinfo = data.capinfos;
                
                // Extract packet count
                const pktMatch = capinfo.match(/Number of packets:\s+(\d+)/);
                if (pktMatch) {
                    this.metrics.packets = parseInt(pktMatch[1]).toLocaleString();
                }
                
                // Extract duration
                const durMatch = capinfo.match(/Capture duration:\s+([\d.]+)\s+seconds/);
                if (durMatch) {
                    this.metrics.duration = `${parseFloat(durMatch[1]).toFixed(2)}s`;
                }
                
                // Extract average rate
                const rateMatch = capinfo.match(/Average packets\/sec:\s+([\d.]+)/);
                if (rateMatch) {
                    this.metrics.rate = `${parseFloat(rateMatch[1]).toFixed(1)} pkt/s`;
                }
            }
            
            this.metrics.hasData = true;
        },
        
        formatFileSize(bytes) {
            if (bytes < 1024) return bytes + ' B';
            if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
            if (bytes < 1024 * 1024 * 1024) return (bytes / 1024 / 1024).toFixed(1) + ' MB';
            return (bytes / 1024 / 1024 / 1024).toFixed(1) + ' GB';
        },
        
        // Sonos Health Check
        async checkSonos() {
            this.showToastKey('toast_checking_sonos');
            try {
                const response = await fetch('/api/sonos_status');
                const data = await response.json();
                
                if (data.players && data.players.length > 0) {
                    this.renderSonosDevices(data.players);
                    this.showToast(`Found ${data.players.length} devices`);
                } else {
                    this.showToastKey('toast_no_sonos');
                }
            } catch (error) {
                this.showToastKey('error_generic', { msg: error.message });
            }
        },
        
        // Stream Checks
        async checkStreams() {
            this.showToastKey('toast_stream_checks');
            try {
                const response = await fetch('/api/check_streams');
                const data = await response.json();
                
                if (data.services && data.services.length > 0) {
                    this.renderStreamChecks(data.services);
                    this.showToastKey('toast_stream_complete');
                } else {
                    this.showToastKey('toast_no_stream');
                }
            } catch (error) {
                this.showToastKey('error_generic', { msg: error.message });
            }
        },
        
        renderStreamChecks(services) {
            const container = document.getElementById('streams_list');
            if (!container) return;
            
            container.innerHTML = services.map(svc => {
                const isOk = svc.http_status && svc.http_status >= 200 && svc.http_status < 400 && !svc.error;
                const is405 = svc.http_status === 405;
                const statusColor = (isOk || is405) ? 'text-green-400' : (svc.error ? 'text-red-400' : 'text-yellow-400');
                const statusIcon = (isOk || is405) ? 'check-circle' : (svc.error ? 'x-circle' : 'alert-circle');
                
                // Map hostname to brand name and emoji
                let brandName = svc.name || svc.host;
                let brandEmoji = '�';
                
                if (svc.host.includes('spotify')) {
                    brandEmoji = '🎵';
                } else if (svc.host.includes('apple')) {
                    brandEmoji = '🍎';
                } else if (svc.host.includes('youtube')) {
                    brandEmoji = '▶️';
                } else if (svc.host.includes('amazon')) {
                    brandEmoji = '🎧';
                } else if (svc.host.includes('tidal')) {
                    brandEmoji = '🌊';
                } else if (svc.host.includes('qobuz')) {
                    brandEmoji = '🎼';
                } else if (svc.host.includes('pandora')) {
                    brandEmoji = '📻';
                } else if (svc.host.includes('kkbox')) {
                    brandEmoji = '🇹🇼';
                }
                
                return `
                    <div class="glass-card p-4 rounded-xl text-center">
                        <div class="text-3xl mb-3">${brandEmoji}</div>
                        <div class="font-semibold mb-2">${brandName}</div>
                        <div class="flex items-center justify-center gap-2 mb-2">
                            <i data-lucide="${statusIcon}" class="w-4 h-4 ${statusColor}"></i>
                            <span class="text-sm ${statusColor}">
                                ${svc.http_status ? 'HTTP ' + svc.http_status : 'Failed'}
                            </span>
                        </div>
                        ${svc.tcp_connect_ms ? '<div class="text-xs text-gray-400">TCP ' + svc.tcp_connect_ms + 'ms</div>' : ''}
                        ${svc.error ? '<div class="text-xs text-red-400 mt-2">' + svc.error + '</div>' : ''}
                    </div>
                `;
            }).join('');
            
            setTimeout(() => lucide.createIcons(), 50);
        },
        
        renderSonosDevices(players) {
            const container = document.getElementById('sonos_devices');
            if (!container) return;
            
            container.innerHTML = players.map(p => {
                const isPlaying = p.transport?.current_transport_state === 'PLAYING';
                const statusColor = p.error ? 'bg-red-500/20 text-red-400' : 
                                   isPlaying ? 'bg-green-500/20 text-green-400' : 
                                   'bg-gray-500/20 text-gray-400';
                const icon = p.error ? 'x-circle' : isPlaying ? 'play-circle' : 'pause-circle';
                
                return `
                    <div class="glass-card p-4 rounded-xl hover:bg-white/5 transition-all">
                        <div class="flex items-center gap-3 mb-3">
                            <i data-lucide="${icon}" class="w-5 h-5 ${p.error ? 'text-red-400' : isPlaying ? 'text-green-400' : 'text-gray-400'}"></i>
                            <div class="flex-1 min-w-0">
                                <div class="font-semibold truncate">${p.name || p.ip}</div>
                                <div class="text-xs text-gray-400 truncate">${p.track?.title || 'No track'}</div>
                            </div>
                        </div>
                        <div class="flex items-center justify-between text-sm">
                            <span class="text-gray-400">🔊 ${p.volume}%</span>
                            <span class="px-2 py-1 rounded-full text-xs font-semibold ${statusColor}">
                                ${p.error ? 'Error' : isPlaying ? 'Playing' : 'Stopped'}
                            </span>
                        </div>
                    </div>
                `;
            }).join('');
            
            setTimeout(() => lucide.createIcons(), 50);
        },
        
        // Speaker Management
        async loadSpeakers() {
            try {
                const response = await fetch('/api/sonos_status');
                const data = await response.json();
                
                if (data.players && data.players.length > 0) {
                    this.players = data.players; // Store players in state
                    this.renderSpeakers(data.players);
                }
            } catch (error) {
                console.error('Error loading speakers:', error);
            }
        },
        
        renderSpeakers(players) {
            const container = document.getElementById('speaker_list');
            if (!container) return;
            
            container.innerHTML = players.map(p => {
                // Use IP as the ID since backend expects IP addresses
                const id = p.ip;
                const isSelected = this.selectedSpeakers.includes(id);
                const selectedClass = isSelected ? 'bg-cyan-500/20 border-cyan-400 border' : 'border border-transparent';
                
                return `
                    <label class="glass-card p-3 rounded-lg flex items-center gap-3 cursor-pointer hover:bg-white/10 transition-all ${selectedClass}">
                        <input type="checkbox" 
                               value="${id}" 
                               ${isSelected ? 'checked' : ''}
                               class="w-4 h-4 text-cyan-500 rounded focus:ring-2 focus:ring-cyan-500"
                               onchange="window.toggleSpeaker('${id}', this.checked)">
                        <div class="flex-1 min-w-0">
                            <div class="font-semibold truncate flex items-center gap-2">
                                ${p.name || p.ip}
                                ${isSelected ? '<span class="text-xs text-cyan-400">●</span>' : ''}
                            </div>
                            <div class="text-xs text-gray-400">🔊 ${p.volume}% · ${p.ip}</div>
                            <div class="text-xs text-gray-500">${p.transport?.current_transport_state || 'STOPPED'}</div>
                        </div>
                    </label>
                `;
            }).join('');
        },
        
        // Auto Refresh
        startAutoRefresh() {
            setInterval(() => {
                if (this.activeTab === 'controller') {
                    this.updateNowPlaying();
                }
            }, 3000);
        },
        
        async updateNowPlaying() {
            try {
                const response = await fetch('/api/sonos_status');
                const data = await response.json();
                
                if (data.players && data.players.length > 0) {
                    // Store players in state for Intercom tab
                    this.players = data.players;
                    
                    // First try to find the selected speaker
                    let player = null;
                    if (this.selectedSpeakers.length > 0) {
                        player = data.players.find(p => this.selectedSpeakers.includes(p.ip));
                    }
                    
                    // If no selected speaker, find playing speaker
                    if (!player) {
                        player = data.players.find(p => p.transport?.current_transport_state === 'PLAYING');
                    }
                    
                    // Otherwise use first player
                    if (!player) {
                        player = data.players[0];
                    }
                    
                    // Update now playing info
                    this.nowPlaying.title = player.track?.title || '—';
                    this.nowPlaying.artist = player.track?.artist || '—';
                    this.nowPlaying.speaker = player.name || player.ip;
                    const validStates = ['PLAYING', 'PAUSED_PLAYBACK'];
                    this.nowPlaying.state = validStates.includes(player.transport?.current_transport_state)
                        ? player.transport.current_transport_state
                        : 'PAUSED_PLAYBACK';
                    
                    console.log('[DEBUG] Now playing state:', this.nowPlaying.state);
                    
                    if (player.volume !== undefined) {
                        this.volume = player.volume;
                    }
                    
                    // Force icon update for play/pause button
                    setTimeout(() => lucide.createIcons(), 50);
                }
            } catch (error) {
                console.error('Error updating now playing:', error);
            }
        },
        
        // Playback Controls
        async controlAction(action, params = {}) {
            if (!this.selectedSpeakers || this.selectedSpeakers.length === 0) {
                this.showToastKey('toast_need_speaker');
                return;
            }
            
            try {
                const response = await fetch('/api/sonos_control', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        action,
                        speakers: this.selectedSpeakers,
                        params
                    })
                });
                const data = await response.json();
                
                // Immediately update local state for responsive UI
                if (action === 'play') {
                    this.nowPlaying.state = 'PLAYING';
                } else if (action === 'pause') {
                    this.nowPlaying.state = 'PAUSED_PLAYBACK';
                }
                
                // Then update from server
                setTimeout(() => this.updateNowPlaying(), 300);
                
                this.showToast(data.status || 'OK');
            } catch (error) {
                this.showToast('Error: ' + error.message);
            }
        },
        
        togglePlayPause() {
            const action = this.nowPlaying.state === 'PLAYING' ? 'pause' : 'play';
            console.log('[DEBUG] Toggle play/pause - current state:', this.nowPlaying.state, 'action:', action);
            this.controlAction(action);
        },
        
        volumeUp() {
            this.controlAction('volume_up');
        },
        
        volumeDown() {
            this.controlAction('volume_down');
        },
        
        setVolume() {
            this.controlAction('set_volume', {volume: parseInt(this.volume)});
        },
        
        // Group Management
        async groupSpeakers() {
            if (this.selectedSpeakers.length < 2) {
                this.showToastKey('toast_select_two');
                return;
            }
            this.showToastKey('toast_grouping');
            // API call would go here
        },
        
        async ungroupSpeakers() {
            this.showToastKey('toast_ungrouping');
            this.controlAction('ungroup_all');
        },
        
        // Speaker Selection
        toggleSpeaker(ip) {
            const index = this.selectedSpeakers.indexOf(ip);
            if (index === -1) {
                this.selectedSpeakers.push(ip);
            } else {
                this.selectedSpeakers.splice(index, 1);
            }
            // Force Lucide icon refresh
            setTimeout(() => lucide.createIcons(), 50);
        },
        
        // Music Search
        async searchMusic() {
            if (!this.searchQuery) {
                this.showToastKey('search_need_keyword');
                return;
            }
            this.showToastKey('search_in_progress');
            try {
                const response = await fetch(`/api/sonos_search?query=${encodeURIComponent(this.searchQuery)}&service=library`);
                const results = await response.json();
                
                if (results.results && results.results.length > 0) {
                    this.renderSearchResults(results.results);
                    this.showToast(`找到 ${results.results.length} 個結果`);
                } else {
                    this.renderSearchResults([]);
                    this.showToast('本地音樂庫無搜尋結果，請確認已在 Sonos App 新增音樂庫');
                }
            } catch (error) {
                this.showToast('搜尋錯誤: ' + error.message);
            }
        },
        
        async browseAllMusic() {
            this.showToast('載入音樂庫中...');
            try {
                // Use empty query to browse all
                const response = await fetch(`/api/sonos_search?query=&service=library`);
                const results = await response.json();
                
                if (results.results && results.results.length > 0) {
                    this.renderSearchResults(results.results);
                    this.showToast(`顯示 ${results.results.length} 首歌曲`);
                } else {
                    this.renderSearchResults([]);
                    this.showToast('音樂庫無內容');
                }
            } catch (error) {
                this.showToast('載入錯誤: ' + error.message);
            }
        },
        
        renderSearchResults(results) {
            const container = document.getElementById('search_results');
            if (!container) return;
            
            if (!results || results.length === 0) {
                container.innerHTML = `
                    <div class="col-span-full text-center py-12">
                        <div class="glass-card p-6 rounded-xl inline-block">
                            <i data-lucide="music" class="w-16 h-16 mx-auto mb-4 text-gray-500"></i>
                            <div class="text-gray-400 mb-2">本地音樂庫無內容</div>
                            <div class="text-sm text-gray-500">請在 Sonos App 中新增音樂庫（NAS、媒體伺服器等）</div>
                        </div>
                    </div>
                `;
                setTimeout(() => lucide.createIcons(), 50);
                return;
            }
            
            container.innerHTML = results.map((item, idx) => {
                const icon = item.type === 'track' ? 'music' : 
                            item.type === 'album' ? 'disc' : 'mic';
                const uniqueId = `play-btn-${idx}`;
                
                return `
                    <div class="glass-card p-4 rounded-xl hover:bg-white/10 transition-all group aurora-border">
                        <div class="flex items-start gap-3">
                            <div class="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 via-purple-500 to-green-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                                <i data-lucide="${icon}" class="w-6 h-6"></i>
                            </div>
                            <div class="flex-1 min-w-0">
                                <div class="font-semibold truncate mb-1">${item.title || item.name}</div>
                                <div class="text-sm text-cyan-300 truncate">${item.artist || ''} ${item.album ? '· ' + item.album : ''}</div>
                            </div>
                        </div>
                        <button id="${uniqueId}" 
                                data-uri="${item.uri || ''}"
                                class="w-full mt-3 glass-card hover:gradient-primary py-2 rounded-lg text-sm font-semibold transition-all opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-cyan-500/50">
                            <i data-lucide="play" class="w-4 h-4"></i>
                            Play
                        </button>
                    </div>
                `;
            }).join('');
            
            // Attach event listeners to play buttons
            setTimeout(() => {
                lucide.createIcons();
                results.forEach((item, idx) => {
                    const btn = document.getElementById(`play-btn-${idx}`);
                    if (btn) {
                        btn.addEventListener('click', () => window.playContent(item.uri));
                    }
                });
            }, 50);
        },
        
        // Queue Management
        async loadQueue() {
            this.showToast('Loading queue...');
            try {
                const speakerIp = this.selectedSpeakers.length > 0 ? this.selectedSpeakers[0] : '';
                const response = await fetch(`/api/sonos_queue${speakerIp ? '?speaker_ip=' + speakerIp : ''}`);
                const queue = await response.json();
                
                this.renderQueue(queue);
                this.showToast(`Queue has ${queue.length} tracks`);
            } catch (error) {
                this.showToast('Error: ' + error.message);
            }
        },
        
        renderQueue(queue) {
            const container = document.getElementById('queue_list');
            if (!container) return;
            
            if (!queue || queue.length === 0) {
                container.innerHTML = '<div class="text-center text-gray-400 py-12">Queue is empty</div>';
                return;
            }
            
            container.innerHTML = queue.map((item, idx) => `
                <div class="glass-card p-4 rounded-xl hover:bg-white/5 transition-all">
                    <div class="flex items-center gap-4">
                        <div class="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center font-bold text-gray-400">
                            ${idx + 1}
                        </div>
                        <div class="flex-1 min-w-0">
                            <div class="font-semibold truncate">${item.title || '—'}</div>
                            <div class="text-sm text-gray-400 truncate">${item.artist || ''} ${item.album ? '· ' + item.album : ''}</div>
                        </div>
                    </div>
                </div>
            `).join('');
        },
        
        async showMusicServices() {
            try {
                const response = await fetch('/api/sonos_status');
                const data = await response.json();
                let html = '<div class="mb-2 font-bold text-purple-400">偵測到的 music_services：</div>';
                if (data.players && data.players.length > 0) {
                    const msList = (data.players[0].music_services || []);
                    if (msList.length === 0) {
                        html += '<div class="text-gray-400">（無串流服務）</div>';
                    } else {
                        msList.forEach(svc => {
                            html += `<div class="mb-1">${svc.service_name}</div>`;
                        });
                    }
                } else {
                    html += '<div class="text-gray-400">（未偵測到 Sonos 裝置）</div>';
                }
                document.getElementById('music_services_list').innerHTML = html;
            } catch (error) {
                document.getElementById('music_services_list').innerHTML = '<div class="text-red-400">Error: ' + error.message + '</div>';
            }
        },
        
        // TTS / Intercom
        async broadcastTTS() {
            // Validation
            if (!this.ttsText.trim()) {
                this.showToast('請輸入廣播內容');
                return;
            }
            
            if (!this.broadcastSpeaker) {
                this.showToast('請先選擇喇叭');
                return;
            }
            
            try {
                this.showToast('正在生成語音並廣播...');
                
                const response = await fetch('/api/sonos_tts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        text: this.ttsText,
                        speakers: [this.broadcastSpeaker],
                        language: this.ttsLanguage,
                        slow: this.ttsSlow,
                        volume: parseInt(this.ttsVolume)
                    })
                });
                
                const result = await response.json();
                
                if (result.success) {
                    // Update broadcast status
                    const speaker = this.players.find(p => p.ip === this.broadcastSpeaker);
                    this.broadcastStatus.isPlaying = true;
                    this.broadcastStatus.speakerIp = this.broadcastSpeaker;
                    this.broadcastStatus.speakerName = speaker ? speaker.name : this.broadcastSpeaker;
                    this.broadcastStatus.currentVolume = parseInt(this.ttsVolume);
                    this.broadcastStatus.isPaused = false;
                    
                    this.showToast(`✓ 開始廣播到 ${this.broadcastStatus.speakerName}`);
                    
                    // Refresh icons after status update
                    setTimeout(() => lucide.createIcons(), 100);
                } else {
                    this.showToast(`❌ 廣播失敗: ${result.error || 'Unknown error'}`);
                }
                
            } catch (error) {
                console.error('TTS broadcast error:', error);
                this.showToast(`❌ 廣播失敗: ${error.message}`);
            }
        },
        
        updateBroadcastStatus() {
            // Called when speaker selection changes
            if (!this.broadcastSpeaker) {
                this.broadcastStatus.isPlaying = false;
                this.broadcastStatus.speakerIp = '';
                this.broadcastStatus.speakerName = '';
            }
        },
        
        async adjustLiveVolume() {
            if (!this.broadcastStatus.isPlaying || !this.broadcastStatus.speakerIp) return;
            
            try {
                const response = await fetch('/api/sonos_control', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        action: 'set_volume',
                        speakers: [this.broadcastStatus.speakerIp],
                        params: { volume: this.broadcastStatus.currentVolume }
                    })
                });
                
                const result = await response.json();
                if (result.status === 'OK') {
                    console.log('Volume adjusted:', this.broadcastStatus.currentVolume);
                }
            } catch (error) {
                console.error('Adjust volume error:', error);
            }
        },
        
        async pauseBroadcast() {
            if (!this.broadcastStatus.isPlaying || !this.broadcastStatus.speakerIp) return;
            
            try {
                const response = await fetch('/api/sonos_control', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        action: 'pause',
                        speakers: [this.broadcastStatus.speakerIp]
                    })
                });
                
                const result = await response.json();
                if (result.status === 'OK') {
                    this.broadcastStatus.isPaused = true;
                    this.showToast('已暫停播放');
                }
            } catch (error) {
                console.error('Pause error:', error);
                this.showToast('暫停失敗');
            }
        },
        
        async resumeBroadcast() {
            if (!this.broadcastStatus.isPlaying || !this.broadcastStatus.speakerIp) return;
            
            try {
                const response = await fetch('/api/sonos_control', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        action: 'play',
                        speakers: [this.broadcastStatus.speakerIp]
                    })
                });
                
                const result = await response.json();
                if (result.status === 'OK') {
                    this.broadcastStatus.isPaused = false;
                    this.showToast('繼續播放');
                }
            } catch (error) {
                console.error('Resume error:', error);
                this.showToast('繼續播放失敗');
            }
        },
        
        async stopBroadcast() {
            if (!this.broadcastStatus.isPlaying || !this.broadcastStatus.speakerIp) return;
            
            try {
                const response = await fetch('/api/sonos_control', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        action: 'pause',
                        speakers: [this.broadcastStatus.speakerIp]
                    })
                });
                
                // Reset status
                this.broadcastStatus.isPlaying = false;
                this.broadcastStatus.speakerIp = '';
                this.broadcastStatus.speakerName = '';
                this.broadcastStatus.isPaused = false;
                
                this.showToast('已停止廣播');
                
                // Refresh icons
                setTimeout(() => lucide.createIcons(), 100);
            } catch (error) {
                console.error('Stop error:', error);
                this.showToast('停止失敗');
            }
        },
        
        // Recording functions
        async startRecording() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                this.mediaRecorder = new MediaRecorder(stream);
                this.audioChunks = [];
                this.recordingTime = 0;
                
                this.mediaRecorder.ondataavailable = (event) => {
                    this.audioChunks.push(event.data);
                };
                
                this.mediaRecorder.onstop = () => {
                    const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
                    this.recordedAudio = audioBlob;
                    
                    // Create audio URL for playback
                    const audioUrl = URL.createObjectURL(audioBlob);
                    const audioElement = document.getElementById('audioPlayback');
                    if (audioElement) {
                        audioElement.src = audioUrl;
                    }
                    
                    // Stop all tracks
                    stream.getTracks().forEach(track => track.stop());
                };
                
                this.mediaRecorder.start();
                this.isRecording = true;
                
                // Start timer
                this.recordingTimer = setInterval(() => {
                    this.recordingTime++;
                }, 1000);
                
                this.showToast('開始錄音');
                
            } catch (error) {
                console.error('Recording error:', error);
                this.showToast('無法存取麥克風，請檢查瀏覽器權限');
            }
        },
        
        stopRecording() {
            if (this.mediaRecorder && this.isRecording) {
                this.mediaRecorder.stop();
                this.isRecording = false;
                
                if (this.recordingTimer) {
                    clearInterval(this.recordingTimer);
                    this.recordingTimer = null;
                }
                
                this.showToast('錄音完成');
                setTimeout(() => lucide.createIcons(), 100);
            }
        },
        
        clearRecording() {
            this.recordedAudio = null;
            this.audioChunks = [];
            this.recordingTime = 0;
            
            const audioElement = document.getElementById('audioPlayback');
            if (audioElement) {
                audioElement.src = '';
            }
            
            this.showToast('已刪除錄音');
        },
        
        canBroadcast() {
            if (this.broadcastMode === 'tts') {
                return this.ttsText.trim() && this.broadcastSpeaker;
            } else {
                return this.recordedAudio && this.broadcastSpeaker;
            }
        },
        
        getBroadcastButtonText() {
            if (!this.broadcastSpeaker) {
                return '請先選擇喇叭';
            }
            if (this.broadcastMode === 'tts') {
                return this.ttsText.trim() ? '開始廣播' : '請輸入文字';
            } else {
                return this.recordedAudio ? '廣播錄音' : '請先錄音';
            }
        },
        
        async broadcastContent() {
            if (this.broadcastMode === 'tts') {
                await this.broadcastTTS();
            } else {
                await this.broadcastRecording();
            }
        },
        
        async broadcastRecording() {
            if (!this.recordedAudio || !this.broadcastSpeaker) {
                this.showToast('請先完成錄音並選擇喇叭');
                return;
            }
            
            try {
                this.isUploading = true;
                this.uploadProgress = 0;
                
                // Create form data
                const formData = new FormData();
                formData.append('audio', this.recordedAudio, 'recording.webm');
                formData.append('speaker', this.broadcastSpeaker);
                formData.append('volume', this.ttsVolume);
                
                // Use XMLHttpRequest for progress tracking
                const result = await new Promise((resolve, reject) => {
                    const xhr = new XMLHttpRequest();
                    
                    // Track upload progress
                    xhr.upload.addEventListener('progress', (e) => {
                        if (e.lengthComputable) {
                            this.uploadProgress = Math.round((e.loaded / e.total) * 100);
                        }
                    });
                    
                    xhr.addEventListener('load', () => {
                        this.isUploading = false;
                        if (xhr.status === 200) {
                            try {
                                resolve(JSON.parse(xhr.responseText));
                            } catch (err) {
                                reject(new Error('Invalid response'));
                            }
                        } else {
                            reject(new Error(`Server error: ${xhr.status}`));
                        }
                    });
                    
                    xhr.addEventListener('error', () => {
                        this.isUploading = false;
                        reject(new Error('Network error'));
                    });
                    
                    xhr.open('POST', '/api/broadcast_audio');
                    xhr.send(formData);
                });
                
                if (result.success) {
                    const speaker = this.players.find(p => p.ip === this.broadcastSpeaker);
                    this.broadcastStatus.isPlaying = true;
                    this.broadcastStatus.speakerIp = this.broadcastSpeaker;
                    this.broadcastStatus.speakerName = speaker ? speaker.name : this.broadcastSpeaker;
                    this.broadcastStatus.currentVolume = parseInt(this.ttsVolume);
                    this.broadcastStatus.isPaused = false;
                    
                    this.showToast(`✓ 開始廣播錄音到 ${this.broadcastStatus.speakerName}`);
                    setTimeout(() => lucide.createIcons(), 100);
                } else {
                    this.showToast(`❌ 廣播失敗: ${result.error || 'Unknown error'}`);
                }
                
            } catch (error) {
                console.error('Broadcast recording error:', error);
                this.isUploading = false;
                this.showToast(`❌ 廣播失敗: ${error.message}`);
            }
        },
        
        // File Management
        async loadAudioFiles() {
            try {
                const response = await fetch('/api/audio_files');
                const result = await response.json();
                
                if (result.success) {
                    this.audioFiles = result.files;
                }
            } catch (error) {
                console.error('Load files error:', error);
            }
        },
        
        async playAudioFile(type, filename) {
            if (!this.broadcastSpeaker) {
                this.showToast('請先選擇播放喇叭');
                return;
            }
            
            try {
                this.showToast('正在播放檔案...');
                
                const response = await fetch('/api/play_audio_file', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        type, 
                        filename,
                        speaker: this.broadcastSpeaker,
                        volume: this.ttsVolume
                    })
                });
                
                const result = await response.json();
                
                if (result.success) {
                    const speaker = this.players.find(p => p.ip === this.broadcastSpeaker);
                    this.broadcastStatus.isPlaying = true;
                    this.broadcastStatus.speakerIp = this.broadcastSpeaker;
                    this.broadcastStatus.speakerName = speaker ? speaker.name : this.broadcastSpeaker;
                    this.broadcastStatus.currentVolume = parseInt(this.ttsVolume);
                    this.broadcastStatus.isPaused = false;
                    
                    this.showToast(`✓ 播放 ${filename} 到 ${this.broadcastStatus.speakerName}`);
                } else {
                    this.showToast(`❌ 播放失敗: ${result.error}`);
                }
            } catch (error) {
                console.error('Play file error:', error);
                this.showToast(`❌ 播放失敗: ${error.message}`);
            }
        },
        
        async renameFile(type, oldFilename) {
            const newFilename = prompt('輸入新的檔案名稱：', oldFilename);
            
            if (!newFilename || newFilename === oldFilename) return;
            
            // Validate filename
            if (!/^[\w\-\s]+\.(mp3|wav|webm)$/i.test(newFilename)) {
                this.showToast('❌ 檔案名稱格式無效（僅允許字母、數字、空格、連字號，副檔名必須是 .mp3, .wav 或 .webm）');
                return;
            }
            
            try {
                const response = await fetch('/api/audio_files/rename', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ type, oldFilename, newFilename })
                });
                
                const result = await response.json();
                
                if (result.success) {
                    this.showToast('✓ 檔案已重新命名');
                    await this.loadAudioFiles();
                    setTimeout(() => lucide.createIcons(), 100);
                } else {
                    this.showToast('❌ 重新命名失敗: ' + result.error);
                }
            } catch (error) {
                console.error('Rename file error:', error);
                this.showToast('❌ 重新命名失敗');
            }
        },
        
        async deleteFile(type, filename) {
            if (!confirm(`確定要刪除 ${filename} 嗎？`)) return;
            
            try {
                const response = await fetch('/api/audio_files/delete', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ type, filename })
                });
                
                const result = await response.json();
                
                if (result.success) {
                    this.showToast('✓ 檔案已刪除');
                    await this.loadAudioFiles();
                    setTimeout(() => lucide.createIcons(), 100);
                } else {
                    this.showToast('❌ 刪除失敗: ' + result.error);
                }
            } catch (error) {
                console.error('Delete file error:', error);
                this.showToast('❌ 刪除失敗');
            }
        },
        
        async deleteFilesByType(type) {
            const count = this.audioFiles[type].length;
            if (count === 0) return;
            
            if (!confirm(`確定要刪除所有 ${type === 'tts' ? 'TTS' : '錄音'} 檔案（${count} 個）嗎？`)) return;
            
            try {
                const response = await fetch('/api/audio_files/clear', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ type })
                });
                
                const result = await response.json();
                
                if (result.success) {
                    this.showToast(`✓ 已刪除 ${result.deleted} 個檔案`);
                    await this.loadAudioFiles();
                    setTimeout(() => lucide.createIcons(), 100);
                } else {
                    this.showToast('❌ 清除失敗: ' + result.error);
                }
            } catch (error) {
                console.error('Clear files error:', error);
                this.showToast('❌ 清除失敗');
            }
        },
        
        async clearAllFiles() {
            const total = this.audioFiles.tts.length + this.audioFiles.recordings.length;
            if (total === 0) {
                this.showToast('沒有檔案需要清除');
                return;
            }
            
            if (!confirm(`確定要刪除所有音訊檔案（${total} 個）嗎？此操作無法復原。`)) return;
            
            try {
                const response = await fetch('/api/audio_files/clear_all', {
                    method: 'POST'
                });
                
                const result = await response.json();
                
                if (result.success) {
                    this.showToast(`✓ 已刪除 ${result.deleted} 個檔案`);
                    await this.loadAudioFiles();
                } else {
                    this.showToast('❌ 清除失敗: ' + result.error);
                }
            } catch (error) {
                console.error('Clear all files error:', error);
                this.showToast('❌ 清除失敗');
            }
        },
        
        // ========== Voice Assistant Methods ==========
        
        async startAssistantRecording() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                
                // Store stream reference for later cleanup
                this.assistantMediaStream = stream;
                
                this.assistantMediaRecorder = new MediaRecorder(stream);
                this.assistantAudioChunks = [];
                this.assistantRecordingTime = 0;
                
                this.assistantMediaRecorder.ondataavailable = (event) => {
                    if (event.data.size > 0) {
                        this.assistantAudioChunks.push(event.data);
                    }
                };
                
                this.assistantMediaRecorder.onstop = async () => {
                    const audioBlob = new Blob(this.assistantAudioChunks, { type: 'audio/webm' });
                    this.assistantAudio = audioBlob;
                    
                    // Create preview URL
                    const audioUrl = URL.createObjectURL(audioBlob);
                    const audioElement = document.getElementById('assistantAudioPlayback');
                    if (audioElement) {
                        audioElement.src = audioUrl;
                    }
                    
                    // Stop all tracks
                    if (this.assistantMediaStream) {
                        this.assistantMediaStream.getTracks().forEach(track => track.stop());
                        this.assistantMediaStream = null;
                    }
                    
                    // Auto-send voice question after recording stops
                    await this.sendVoiceQuestion();
                };
                
                this.assistantMediaRecorder.start();
                this.isAssistantRecording = true;
                
                // Start timer
                this.assistantRecordingTimer = setInterval(() => {
                    this.assistantRecordingTime++;
                }, 1000);
                
                this.showToast('🎤 開始錄音...');
                
            } catch (error) {
                console.error('Assistant recording error:', error);
                this.showToast('❌ 無法存取麥克風');
            }
        },
        
        stopAssistantRecording() {
            if (this.assistantMediaRecorder && this.isAssistantRecording) {
                this.assistantMediaRecorder.stop();
                this.isAssistantRecording = false;
                
                if (this.assistantRecordingTimer) {
                    clearInterval(this.assistantRecordingTimer);
                    this.assistantRecordingTimer = null;
                }
                
                // Stop media stream tracks immediately
                if (this.assistantMediaStream) {
                    this.assistantMediaStream.getTracks().forEach(track => {
                        track.stop();
                        console.log('Track stopped:', track.kind);
                    });
                }
                
                this.showToast('✓ 錄音完成');
            }
        },
        
        clearAssistantRecording() {
            this.assistantAudio = null;
            this.assistantAudioChunks = [];
            this.assistantRecordingTime = 0;
            
            const audioElement = document.getElementById('assistantAudioPlayback');
            if (audioElement) {
                audioElement.src = '';
            }
            
            this.showToast('已刪除錄音');
        },
        
        async sendVoiceQuestion() {
            if (!this.assistantAudio) {
                this.showToast('請先錄音');
                return;
            }
            
            this.isProcessing = true;
            
            try {
                // 1. Transcribe audio to text
                const transcription = await this.transcribeAudio(this.assistantAudio);
                
                if (!transcription) {
                    this.showToast('❌ 語音轉文字失敗');
                    this.isProcessing = false;
                    return;
                }
                
                // Add user message to chat history
                this.chatHistory.push({
                    role: 'user',
                    content: transcription,
                    timestamp: new Date().toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' })
                });
                
                // Scroll to bottom
                setTimeout(() => {
                    const chatContainer = document.getElementById('chatHistory');
                    if (chatContainer) {
                        chatContainer.scrollTop = chatContainer.scrollHeight;
                    }
                }, 100);
                
                // 2. Get AI response
                const response = await this.getAIResponse(transcription);
                
                if (!response) {
                    this.showToast('❌ AI 回覆失敗');
                    this.isProcessing = false;
                    return;
                }
                
                // Add assistant message to chat history
                const assistantMessage = {
                    role: 'assistant',
                    content: response,
                    timestamp: new Date().toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' }),
                    isPlaying: false
                };
                this.chatHistory.push(assistantMessage);
                
                // Scroll to bottom again
                setTimeout(() => {
                    const chatContainer = document.getElementById('chatHistory');
                    if (chatContainer) {
                        chatContainer.scrollTop = chatContainer.scrollHeight;
                    }
                    lucide.createIcons();
                }, 100);
                
                // 3. Play response on Sonos if speaker selected
                if (this.assistantSpeaker) {
                    assistantMessage.isPlaying = true;
                    await this.playAssistantResponse(response);
                    assistantMessage.isPlaying = false;
                }
                
                // Clear recording for next question
                this.clearAssistantRecording();
                this.isProcessing = false;
                
            } catch (error) {
                console.error('Voice question error:', error);
                this.showToast('❌ 處理失敗: ' + error.message);
                this.isProcessing = false;
            }
        },
        
        async sendTextQuestion() {
            if (!this.assistantTextInput.trim()) {
                this.showToast('請輸入問題');
                return;
            }
            
            this.isProcessing = true;
            const question = this.assistantTextInput.trim();
            this.assistantTextInput = '';  // Clear input immediately
            
            try {
                // Add user message
                this.chatHistory.push({
                    role: 'user',
                    content: question,
                    timestamp: new Date().toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' })
                });
                
                // Scroll to bottom
                setTimeout(() => {
                    const chatContainer = document.getElementById('chatHistory');
                    if (chatContainer) {
                        chatContainer.scrollTop = chatContainer.scrollHeight;
                    }
                }, 100);
                
                // Get AI response
                const response = await this.getAIResponse(question);
                
                if (!response) {
                    this.showToast('❌ AI 回覆失敗');
                    this.isProcessing = false;
                    return;
                }
                
                // Add assistant message
                const assistantMessage = {
                    role: 'assistant',
                    content: response,
                    timestamp: new Date().toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' }),
                    isPlaying: false
                };
                this.chatHistory.push(assistantMessage);
                
                // Scroll and update icons
                setTimeout(() => {
                    const chatContainer = document.getElementById('chatHistory');
                    if (chatContainer) {
                        chatContainer.scrollTop = chatContainer.scrollHeight;
                    }
                    lucide.createIcons();
                }, 100);
                
                // Play response if speaker selected
                if (this.assistantSpeaker) {
                    assistantMessage.isPlaying = true;
                    await this.playAssistantResponse(response);
                    assistantMessage.isPlaying = false;
                }
                
                this.isProcessing = false;
                
            } catch (error) {
                console.error('Text question error:', error);
                this.showToast('❌ 處理失敗: ' + error.message);
                this.isProcessing = false;
            }
        },
        
        async transcribeAudio(audioBlob) {
            try {
                const formData = new FormData();
                formData.append('audio', audioBlob, 'question.webm');
                formData.append('language', this.assistantLanguage);
                
                const response = await fetch('/api/assistant/transcribe', {
                    method: 'POST',
                    body: formData
                });
                
                const result = await response.json();
                
                if (result.success) {
                    return result.text;
                } else {
                    console.error('Transcription error:', result.error);
                    return null;
                }
            } catch (error) {
                console.error('Transcribe API error:', error);
                return null;
            }
        },
        
        async getAIResponse(question) {
            try {
                // Get recent conversation context (last 10 messages)
                const context = this.chatHistory.slice(-10).map(msg => ({
                    role: msg.role,
                    content: msg.content
                }));
                
                const response = await fetch('/api/assistant/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        question: question,
                        context: context
                    })
                });
                
                const result = await response.json();
                
                if (result.success) {
                    return result.response;
                } else {
                    console.error('AI error:', result.error);
                    return null;
                }
            } catch (error) {
                console.error('AI API error:', error);
                return null;
            }
        },
        
        async playAssistantResponse(text) {
            try {
                const response = await fetch('/api/assistant/respond', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        text: text,
                        speaker: this.assistantSpeaker,
                        language: this.assistantVoice,
                        volume: this.assistantVolume
                    })
                });
                
                const result = await response.json();
                
                if (!result.success) {
                    console.error('Play response error:', result.error);
                }
            } catch (error) {
                console.error('Play response API error:', error);
            }
        },
        
        clearChatHistory() {
            if (this.chatHistory.length === 0) {
                this.showToastKey('toast_chat_already_empty');
                return;
            }
            if (confirm(this.t('confirm_clear_chat'))) {
                this.chatHistory = [];
                this.showToastKey('toast_cleared_chat');
            }
        },
    };
}

// Global helper functions for inline event handlers
window.toggleSpeaker = function(id, checked) {
    const app = Alpine.$data(document.body);
    if (checked) {
        if (!app.selectedSpeakers.includes(id)) {
            app.selectedSpeakers.push(id);
        }
    } else {
        app.selectedSpeakers = app.selectedSpeakers.filter(x => x !== id);
    }
};

window.playContent = async function(uri) {
    console.log('[DEBUG] playContent called with URI:', uri);
    
    if (!uri) {
        console.error('[ERROR] No URI provided');
        return;
    }
    
    const app = Alpine.$data(document.body);
    
    // Check if speakers are selected
    if (!app.selectedSpeakers || app.selectedSpeakers.length === 0) {
        app.showToast('⚠️ 請先選擇喇叭！請在左側 Speakers 區域勾選要播放的喇叭');
        return;
    }
    
    console.log('[DEBUG] Selected speakers:', app.selectedSpeakers);
    
    app.showToast(`▶️ 播放中...到 ${app.selectedSpeakers.length} 個喇叭`);
    
    // Immediately set state to PLAYING for responsive UI
    app.nowPlaying.state = 'PLAYING';
    
    try {
        const payload = {
            action: 'play_content',
            speakers: app.selectedSpeakers,
            params: {uri: uri}
        };
        console.log('[DEBUG] Sending payload:', payload);
        
        const response = await fetch('/api/sonos_control', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        });
        const data = await response.json();
        
        console.log('[DEBUG] Response:', data);
        
        if (data.error) {
            app.showToast('❌ 播放失敗: ' + data.error);
            app.nowPlaying.state = 'STOPPED';
        } else {
            app.showToast('✅ 已開始播放');
            // Update now playing info after a short delay
            setTimeout(() => app.updateNowPlaying(), 800);
        }
    } catch (error) {
        console.error('[ERROR]', error);
        app.showToast('❌ 錯誤: ' + error.message);
        app.nowPlaying.state = 'STOPPED';
    }
};

// Diagnostic functions
window.runDiagnostic = async function(action) {
    const container = document.getElementById('diag_status');
    if (!container) return;
    
    const app = Alpine.$data(document.body);
    const lang = app.language;
    
    const actionNames = {
        refresh: lang === 'zh' ? '重新掃描設備' : 'Refreshing devices',
        ungroup_all: lang === 'zh' ? '解散所有群組' : 'Ungrouping all',
        mute_all: lang === 'zh' ? '全部靜音' : 'Muting all',
        unmute_all: lang === 'zh' ? '取消靜音' : 'Unmuting all',
        check_network: lang === 'zh' ? '檢查網路連線' : 'Checking network',
        check_sync: lang === 'zh' ? '檢查同步狀態' : 'Checking sync'
    };
    
    container.innerHTML = `
        <div class="flex items-center gap-2 text-blue-400">
            <i data-lucide="loader" class="w-4 h-4 animate-spin"></i>
            <span>${actionNames[action]}...</span>
        </div>
    `;
    lucide.createIcons();
    
    try {
        const response = await fetch('/api/sonos_diagnostics', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({action: action})
        });
        const data = await response.json();
        
        let html = '';
        if (data.success) {
            html += `<div class="flex items-center gap-2 text-green-400 mb-3">
                <i data-lucide="check-circle" class="w-5 h-5"></i>
                <span class="font-semibold">${data.message}</span>
            </div>`;
        } else {
            html += `<div class="flex items-center gap-2 text-yellow-400 mb-3">
                <i data-lucide="alert-circle" class="w-5 h-5"></i>
                <span class="font-semibold">${data.message}</span>
            </div>`;
        }
        
        if (data.details && data.details.length > 0) {
            html += '<div class="space-y-2 max-h-60 overflow-y-auto">';
            data.details.forEach(d => {
                if (d.error) {
                    html += `
                        <div class="flex items-start gap-2 text-sm p-2 glass-card rounded-lg">
                            <i data-lucide="x-circle" class="w-4 h-4 text-red-400 mt-0.5"></i>
                            <span class="text-red-400">${d.name}: ${d.error}</span>
                        </div>
                    `;
                } else if (d.status === 'healthy') {
                    html += `
                        <div class="flex items-start gap-2 text-sm p-2 glass-card rounded-lg">
                            <i data-lucide="check-circle" class="w-4 h-4 text-green-400 mt-0.5"></i>
                            <div class="flex-1">
                                <div class="text-gray-200">${d.name} (${d.ip})</div>
                                <div class="text-xs text-gray-400">Ping: ${d.ping}, API: ${d.api}</div>
                            </div>
                        </div>
                    `;
                } else if (d.status === 'issue') {
                    html += `
                        <div class="flex items-start gap-2 text-sm p-2 glass-card rounded-lg">
                            <i data-lucide="alert-circle" class="w-4 h-4 text-yellow-400 mt-0.5"></i>
                            <div class="flex-1">
                                <div class="text-gray-200">${d.name} (${d.ip})</div>
                                <div class="text-xs text-yellow-400">Ping: ${d.ping}, API: ${d.api}</div>
                            </div>
                        </div>
                    `;
                } else if (d.coordinator !== undefined) {
                    html += `
                        <div class="flex items-start gap-2 text-sm p-2 glass-card rounded-lg">
                            <i data-lucide="${d.coordinator ? 'crown' : 'users'}" class="w-4 h-4 text-purple-400 mt-0.5"></i>
                            <div class="flex-1">
                                <div class="text-gray-200">${d.coordinator ? '👑 ' : ''}${d.name}</div>
                                <div class="text-xs text-gray-400">Group: ${d.group_members}, State: ${d.transport_state}</div>
                            </div>
                        </div>
                    `;
                } else {
                    html += `
                        <div class="flex items-start gap-2 text-sm p-2 glass-card rounded-lg">
                            <i data-lucide="check" class="w-4 h-4 text-green-400 mt-0.5"></i>
                            <span class="text-gray-200">${d.name || d.ip}</span>
                        </div>
                    `;
                }
            });
            html += '</div>';
        }
        
        if (data.error) {
            html += `<div class="text-sm text-red-400 mt-3">${data.error}</div>`;
        }
        
        container.innerHTML = html;
        lucide.createIcons();
        
        // Auto-refresh Sonos health if action was refresh, ungroup, mute, or unmute
        if (['refresh', 'ungroup_all', 'mute_all', 'unmute_all'].includes(action)) {
            setTimeout(() => {
                app.checkSonos();
            }, 500);
        }
    } catch(error) {
        container.innerHTML = `
            <div class="flex items-center gap-2 text-red-400">
                <i data-lucide="x-circle" class="w-5 h-5"></i>
                <span>Error: ${error.message}</span>
            </div>
        `;
        lucide.createIcons();
    }
};
