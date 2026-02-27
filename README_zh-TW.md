# Sonos Home 🏠

這是一個乾淨、現代化的 Python Web 應用，提供 Sonos 喇叭控制與語音助理功能。

## 功能特色

- 🎵 **Sonos 喇叭控制**：探索、控制與管理 Sonos 喇叭
- 🤖 **AI 助理**：詢問 Sonos 相關問題
- 🌐 **Web 介面**：直覺的 Flask 儀表板
- 💬 **對話管理**：儲存與載入對話紀錄

**注意：此版本不包含 Ollama 或 RAG 功能。**

## 快速開始

### 需求

- Python 3.8+
- macOS/Linux/Windows

### 一鍵安裝（非技術使用者）

**macOS：**
1. 連點 `INSTALL.command`
2. 等待安裝完成
3. 連點 `START.command` 啟動

**Windows：**
1. 連點 `INSTALL.bat`
2. 等待安裝完成
3. 連點 `START.bat` 啟動

**Linux：**
1. 執行 `./INSTALL.sh`
2. 執行 `./START.sh`

### 手動安裝

1. **下載專案**
   ```bash
   git clone <repo-url>
   cd sonos_home
   ```

2. **建立虛擬環境**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # Windows: venv\Scripts\activate
   ```

3. **安裝依賴**
   ```bash
   pip install -r requirements.txt
   ```

4. **建立環境設定**
   ```bash
   cp .env.example .env
   ```

5. **啟動應用**
   ```bash
   python run.py
   ```

6. **開啟 Web 介面**
   - 瀏覽 `http://localhost:5050`

## 專案結構

```
sonos_home/
├── app/                  # Flask 應用程式
│   ├── routes/          # API 路由
│   ├── services/        # 商業邏輯（Sonos 等）
│   ├── utils/           # 工具函式
│   ├── templates/       # HTML 模板
│   └── static/          # CSS、JS、資源
├── data/                # 執行時資料
├── config.py            # 設定
├── run.py               # 啟動入口
├── requirements.txt     # Python 依賴
└── README.md            # 英文說明
```

## 設定

可在 `config.py` 調整：
- Flask 設定（debug、port 等）
- Sonos 探索逾時時間

### AI 對話功能設定（選用）

若要使用 AI 對話功能，請在 `config.py` 加入您的 API 金鑰：

**Google Gemini：**
- 取得 API 金鑰：https://makersuite.google.com/app/apikey
- 在 `config.py` 第 42 行設定 `GEMINI_API_KEY`

**OpenAI：**
- 取得 API 金鑰：https://platform.openai.com/api-keys
- 在 `config.py` 第 41 行設定 `OPENAI_API_KEY`
- 在 `config.py` 第 36 行將 `AI_PROVIDER` 改為 `'openai'`

## 常見問題

### 找不到 Sonos 喇叭
- 確認喇叭與電腦在同一個網路
- 檢查防火牆設定
- 視需要調高 `SONOS_DISCOVERY_TIMEOUT`

## 中文社群

- Facebook 社群：https://www.facebook.com/groups/211308792045575

## 支援

如有問題，請在 GitHub Issues 提出。
