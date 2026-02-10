from flask import Blueprint
from controllers.upload_controller import upload_paper
from controllers.papers_controller import get_papers
from controllers.admin_controller import (
    get_pending_papers,
    approve_paper,
    delete_paper
)

api = Blueprint("api", _name_)

# Public routes
api.route("/upload", methods=["POST"])(upload_paper)
api.route("/papers", methods=["GET"])(get_papers)

# 🔐 Admin routes
api.route("/admin/papers", methods=["GET"])(get_pending_papers)
api.route("/admin/approve/<int:paper_id>", methods=["POST"])(approve_paper)
api.route("/admin/delete/<int:paper_id>", methods=["DELETE"])(delete_paper)