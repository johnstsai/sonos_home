"""Configuration settings for Sonos WebUI"""
import os
from pathlib import Path

# Base directory
BASE_DIR = Path(__file__).parent

class Config:
    """Base configuration"""
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key-change-in-production'
    
    # Flask settings
    DEBUG = False
    TESTING = False
    # Bind to all interfaces so Sonos speakers can reach the server
    HOST = os.environ.get('HOST', '0.0.0.0')
    # Avoid common collisions (some macOS processes or tools may bind 5000); use 5050 by default
    PORT = int(os.environ.get('PORT', 5050))
    
    # Data directory
    DATA_DIR = BASE_DIR / 'data'
    
    # Network scanning
    SCAN_TIMEOUT = 10
    PING_TIMEOUT = 1
    
    # PCAP settings
    CAPTURE_DURATION = 5
    PCAP_FILTER = "tcp port 1400 or (udp and port 1900)"
    ENABLE_CAPTURE = False  # Disabled for security - use manual tcpdump instead
    
    # Sonos settings
    SONOS_DISCOVERY_TIMEOUT = 3
    
    # AI API settings
    AI_PROVIDER = os.environ.get('AI_PROVIDER', 'gemini')  # 'openai' or 'gemini'
    SPEECH_PROVIDER = os.environ.get('SPEECH_PROVIDER', 'whisper-local')  # 'openai', 'google', or 'whisper-local'
    WHISPER_MODEL = os.environ.get('WHISPER_MODEL', 'base')  # Whisper model: tiny, base, small, medium, large
    GEMINI_MODEL = os.environ.get('GEMINI_MODEL', 'gemini-2.5-flash')  # Gemini model: gemini-2.5-flash, gemini-2.5-pro, gemini-flash-latest
    OPENAI_MODEL = os.environ.get('OPENAI_MODEL', 'gpt-3.5-turbo')  # OpenAI model: gpt-3.5-turbo, gpt-4, gpt-4-turbo
    OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY', '')  # OpenAI API key (if using OpenAI)
    GEMINI_API_KEY = os.environ.get('GEMINI_API_KEY', '')  # Set your Gemini API key here or in environment variable
    GOOGLE_CLOUD_API_KEY = os.environ.get('GOOGLE_CLOUD_API_KEY', '')  # Google Cloud API key for Speech-to-Text
    
    @staticmethod
    def init_app(app):
        """Initialize application"""
        # Create data directory if it doesn't exist
        Config.DATA_DIR.mkdir(parents=True, exist_ok=True)


class DevelopmentConfig(Config):
    """Development configuration"""
    DEBUG = True


class ProductionConfig(Config):
    """Production configuration"""
    DEBUG = False


class TestingConfig(Config):
    """Testing configuration"""
    TESTING = True
    DATA_DIR = BASE_DIR / 'test_data'


config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'testing': TestingConfig,
    'default': DevelopmentConfig
}
