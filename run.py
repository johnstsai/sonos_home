"""Sonos WebUI - Network and Sonos diagnostics dashboard"""
import os
from app import create_app

# Get config from environment or use development
config_name = os.getenv('FLASK_CONFIG', 'development')
app = create_app(config_name)

if __name__ == '__main__':
    # Bind to all interfaces so speakers/browsers on LAN can access
    host = app.config.get('HOST', '0.0.0.0') or '0.0.0.0'
    port = int(app.config.get('PORT', 5000))
    app.run(host=host, port=port, debug=True)
