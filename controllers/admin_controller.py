from flask import jsonify
from models.paper import Paper
from models import db
from services.cloudinary_service import delete_pdf



# Get all pending papers (for admin review)
def get_pending_papers():
    papers = Paper.query.filter_by(status="pending").all()

    result = []
    for p in papers:
        result.append({
            "id": p.id,
            "subject": p.subject,
            "url": p.url,
            "status": p.status
        })

    return jsonify(result), 200


# Approve a paper
def approve_paper(paper_id):
    paper = Paper.query.get(paper_id)

    if not paper:
        return jsonify({"error": "Paper not found"}), 404

    paper.status = "approved"
    db.session.commit()

    return jsonify({"message": "Paper approved successfully"}), 200


# Delete a paper (from DB + Cloudinary)
def delete_paper(paper_id):
    paper = Paper.query.get(paper_id)

    if not paper:
        return jsonify({"error": "Paper not found"}), 404

    try:
        # Delete file from Cloudinary
        if paper.public_id:
            delete_pdf(paper.public_id)

        # Delete from database
        db.session.delete(paper)
        db.session.commit()

        return jsonify({"message": "Paper deleted successfully"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
