"""Main routes"""
from flask import Blueprint, render_template
from app.utils.network import detect_local_network
from app.utils.sonos import HAVE_SOCO

bp = Blueprint('main', __name__)


@bp.route("/")
def index():
    """Main dashboard page"""
    detected = detect_local_network()
    return render_template('index_new.html', detected_net=detected, soco_ok=str(HAVE_SOCO))


@bp.route("/classic")
def index_classic():
    """Classic dashboard page"""
    detected = detect_local_network()
    return render_template('index.html', detected_net=detected, soco_ok=str(HAVE_SOCO))
