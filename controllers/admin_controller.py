from flask import jsonify
from db import db, Paper


def delete_paper(paper_id):
    paper = Paper.query.get(paper_id)

    if not paper:
        return jsonify({"error": "Paper not found"}), 404

    # Delete only from database
    db.session.delete(paper)
    db.session.commit()

    return jsonify({"message": "Paper deleted successfully"})
