from flask import jsonify, request
from db.database import get_db
import os

ADMIN_KEY = os.getenv("ADMIN_KEY")

def check_admin(req):
    return req.headers.get("x-admin-key") == ADMIN_KEY


def get_pending_papers():
    if not check_admin(request):
        return jsonify({"error": "Unauthorized"}), 401

    conn = get_db()
    cur = conn.cursor()

    cur.execute("""
        SELECT id, subject, exam_type, slot, session, file_url, created_at
        FROM papers
        WHERE status = 'pending'
        ORDER BY created_at DESC
    """)

    papers = cur.fetchall()

    cur.close()
    conn.close()

    return jsonify(papers), 200


def approve_paper(paper_id):
    if not check_admin(request):
        return jsonify({"error": "Unauthorized"}), 401

    conn = get_db()
    cur = conn.cursor()

    cur.execute(
        "UPDATE papers SET status = 'approved' WHERE id = %s",
        (paper_id,)
    )

    conn.commit()
    cur.close()
    conn.close()

    return jsonify({"message": "Approved"}), 200


def delete_paper(paper_id):
    if not check_admin(request):
        return jsonify({"error": "Unauthorized"}), 401

    conn = get_db()
    cur = conn.cursor()

    cur.execute("DELETE FROM papers WHERE id = %s", (paper_id,))
    conn.commit()

    cur.close()
    conn.close()

    return jsonify({"message": "Deleted"}), 200