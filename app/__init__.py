"""Flask application factory"""
from flask import Flask
from config import config


def create_app(config_name='default'):
    """Create and configure the Flask application"""
    app = Flask(__name__)
    
    # Load configuration
    app.config.from_object(config[config_name])
    config[config_name].init_app(app)
    
    # Register blueprints
    from app.routes import main, network, sonos, pcap
    app.register_blueprint(main.bp)
    app.register_blueprint(network.bp, url_prefix='/api')
    app.register_blueprint(sonos.bp, url_prefix='/api')
    app.register_blueprint(pcap.bp, url_prefix='/api')
    
    return app
