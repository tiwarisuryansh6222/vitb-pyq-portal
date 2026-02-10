from flask import request, jsonify
from db.database import get_db
import os

ADMIN_KEY = os.getenv("ADMIN_KEY")

def verify_admin():
    key = request.headers.get("x-admin-key")
    if key != ADMIN_KEY:
        return False
    return True

def get_pending_papers():
    if not verify_admin():
        return jsonify({"error": "Unauthorized"}), 401

    conn = get_db()
    cur = conn.cursor()

    cur.execute("""
        SELECT id, subject, exam_type, slot, session, file_url
        FROM papers
        WHERE status = 'pending'
        ORDER BY created_at DESC
    """)

    papers = cur.fetchall()
    conn.close()

    return jsonify(papers)

def approve_paper(paper_id):
    if not verify_admin():
        return jsonify({"error": "Unauthorized"}), 401

    conn = get_db()
    cur = conn.cursor()

    cur.execute(
        "UPDATE papers SET status='approved' WHERE id=%s",
        (paper_id,)
    )

    conn.commit()
    conn.close()

    return jsonify({"message": "Approved"})

def delete_paper(paper_id):
    if not verify_admin():
        return jsonify({"error": "Unauthorized"}), 401

    conn = get_db()
    cur = conn.cursor()

    cur.execute("DELETE FROM papers WHERE id=%s", (paper_id,))
    conn.commit()
    conn.close()

    return jsonify({"message": "Deleted"})