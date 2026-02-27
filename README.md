# Sonos Home 🏠

A clean, modern Python web application for controlling Sonos speakers with voice assistant capabilities.

## Features

- 🎵 **Sonos Speaker Control**: Discover, control, and manage Sonos speakers
- 🤖 **AI Assistant**: Ask questions about your Sonos speakers
- 🌐 **Web Interface**: Intuitive Flask-based dashboard
- 💬 **Conversation Management**: Save and load conversation histories

**Note:** This version does not include Ollama or RAG features.

## Quick Start

### Requirements

- Python 3.8+
- macOS/Linux/Windows

### One-Click Installation (Non-Tech Users)

**macOS:**
1. Double-click `INSTALL.command`
2. Wait for installation to complete
3. Double-click `START.command` to launch

**Windows:**
1. Double-click `INSTALL.bat`
2. Wait for installation to complete
3. Double-click `START.bat` to launch

**Linux:**
1. Run `./INSTALL.sh`
2. Run `./START.sh`

### Manual Installation

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd sonos_home
   ```

2. **Create virtual environment**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Setup environment**
   ```bash
   cp .env.example .env
   ```

5. **Start the application**
   ```bash
   python run.py
   ```

6. **Access the web interface**
   - Open `http://localhost:5050` in your browser

## Project Structure

```
sonos_home/
├── app/                  # Flask application
│   ├── routes/          # API endpoints
│   ├── services/        # Business logic (Sonos, etc.)
│   ├── utils/           # Helper utilities
│   ├── templates/       # HTML templates
│   └── static/          # CSS, JS, assets
├── docs/                # Documentation
│   ├── official_docs/   # Product specifications
│   ├── conversation/    # Saved conversations
│   └── faq/             # FAQ documents
├── data/                # Runtime data
├── config.py            # Configuration settings
├── run.py               # Flask entry point
├── requirements.txt     # Python dependencies
└── README.md            # This file
```

## Configuration

Edit `config.py` to customize:
- Flask settings (debug mode, port, etc.)
- Sonos discovery timeout

## API Endpoints

- `GET /` - Main dashboard
- `POST /api/sonos/discover` - Discover speakers on network
- `POST /api/sonos/play` - Play on speaker
- `POST /api/sonos/pause` - Pause playback

## Troubleshooting

### Sonos speakers not discovered
- Ensure speakers are on the same network
- Check firewall settings
- Increase `SONOS_DISCOVERY_TIMEOUT` if needed

## Development

### Running tests
```bash
pytest tests/
```

### Linting
```bash
pylint app/
```

### Building for distribution
```bash
./build_portable_app.sh  # macOS/Linux
```

## License

MIT License

## Contributing

Contributions welcome! Please follow these steps:
1. Create a feature branch
2. Make your changes
3. Submit a pull request

## Support

For issues and questions, please open a GitHub issue.
