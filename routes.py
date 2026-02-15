from flask import Blueprint
from controllers.upload_controller import upload_paper
from controllers.papers_controller import get_papers, get_papers_count
from controllers.admin_controller import (
    get_pending_papers,
    approve_paper,
    delete_paper
)

api = Blueprint("api", __name__)

# ---------------- PUBLIC ROUTES ----------------
api.route("/upload", methods=["POST"])(upload_paper)
api.route("/papers", methods=["GET"])(get_papers)
api.route("/papers/count", methods=["GET"])(get_papers_count)

# ---------------- ADMIN ROUTES ----------------
api.route("/admin/papers", methods=["GET"])(get_pending_papers)
api.route("/admin/approve/<int:paper_id>", methods=["POST"])(approve_paper)
api.route("/admin/delete/<int:paper_id>", methods=["DELETE"])(delete_paper)
