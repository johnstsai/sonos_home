# Sonos Home 🏠

A clean, modern Python web application for controlling Sonos speakers with AI-powered voice assistant capabilities.

## Features

- 🎵 **Sonos Speaker Control**: Discover, control, and manage Sonos speakers
- 🤖 **AI Assistant**: Ask questions about your Sonos speakers (powered by local Ollama LLM)
- 📚 **RAG System**: Smart document retrieval for product information
- 🌐 **Web Interface**: Intuitive Flask-based dashboard
- 💬 **Conversation Management**: Save and load conversation histories

## Quick Start

### Requirements

- Python 3.8+
- Ollama (for local LLM)
- macOS/Linux/Windows

### Installation

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
│   ├── services/        # Business logic (RAG, Sonos, etc.)
│   ├── utils/           # Helper utilities
│   ├── templates/       # HTML templates
│   └── static/          # CSS, JS, assets
├── docs/                # Documentation and training data
│   ├── official_docs/   # Product specifications
│   ├── conversation/    # Saved conversations
│   └── faq/             # FAQ documents
├── data/                # Runtime data (ChromaDB, etc.)
├── config.py            # Configuration settings
├── run.py               # Flask entry point
├── requirements.txt     # Python dependencies
└── README.md            # This file
```

## Configuration

Edit `config.py` to customize:
- Flask settings (debug mode, port, etc.)
- Ollama connection (host, port)
- RAG system (embedding model, chunk size)
- Sonos discovery timeout

## API Endpoints

- `GET /` - Main dashboard
- `POST /api/sonos/discover` - Discover speakers on network
- `POST /api/sonos/play` - Play on speaker
- `POST /api/sonos/pause` - Pause playback
- `POST /api/rag/query` - Ask AI questions
- `POST /api/rag/load` - Load training documents

## Troubleshooting

### Ollama not connecting
- Ensure Ollama is running: `ollama serve`
- Check host configuration in `.env`
- Verify port 11434 is accessible

### Sonos speakers not discovered
- Ensure speakers are on the same network
- Check firewall settings
- Increase `SONOS_DISCOVERY_TIMEOUT` if needed

### RAG not working
- Verify training documents exist in `docs/official_docs/`
- Check ChromaDB files in `data/.chroma/`
- Clear cache and reload: `rm -rf data/.chroma/`

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
