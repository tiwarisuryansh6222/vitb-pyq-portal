from flask import Blueprint
from controllers.upload_controller import upload_paper
from controllers.papers_controller import get_papers

api = Blueprint("api", __name__)

api.route("/upload", methods=["POST"])(upload_paper)
api.route("/papers", methods=["GET"])(get_papers)