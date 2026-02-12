from flask import jsonify, request
from db.database import get_db
import os

ADMIN_KEY = os.getenv("ADMIN_KEY")

if not ADMIN_KEY:
    print("⚠ WARNING: ADMIN_KEY not set in environment variables")


def check_admin(req):
    key = req.headers.get("x-admin-key")

    if not key or key != ADMIN_KEY:
        return False

    return True


def get_pending_papers():
    if not check_admin(request):
        return jsonify({"error": "Unauthorized"}), 401

    try:
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

    except Exception as e:
        print("ADMIN FETCH ERROR:", e)
        return jsonify({"error": "Failed to fetch pending papers"}), 500


def approve_paper(paper_id):
    if not check_admin(request):
        return jsonify({"error": "Unauthorized"}), 401

    try:
        conn = get_db()
        cur = conn.cursor()

        # Check if paper exists
        cur.execute("SELECT id FROM papers WHERE id = %s", (paper_id,))
        if not cur.fetchone():
            cur.close()
            conn.close()
            return jsonify({"error": "Paper not found"}), 404

        cur.execute(
            "UPDATE papers SET status = 'approved' WHERE id = %s",
            (paper_id,)
        )

        conn.commit()
        cur.close()
        conn.close()

        return jsonify({"message": "Approved"}), 200

    except Exception as e:
        print("APPROVE ERROR:", e)
        return jsonify({"error": "Failed to approve paper"}), 500


def delete_paper(paper_id):
    if not check_admin(request):
        return jsonify({"error": "Unauthorized"}), 401

    try:
        conn = get_db()
        cur = conn.cursor()

        # Check if paper exists
        cur.execute("SELECT id FROM papers WHERE id = %s", (paper_id,))
        if not cur.fetchone():
            cur.close()
            conn.close()
            return jsonify({"error": "Paper not found"}), 404

        cur.execute("DELETE FROM papers WHERE id = %s", (paper_id,))
        conn.commit()

        cur.close()
        conn.close()

        return jsonify({"message": "Deleted"}), 200

    except Exception as e:
        print("DELETE ERROR:", e)
        return jsonify({"error": "Failed to delete paper"}), 500