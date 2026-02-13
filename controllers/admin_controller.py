from flask import jsonify
from db.database import get_db


# Get all pending papers
def get_pending_papers():
    conn = get_db()
    cur = conn.cursor()

    cur.execute(
        """
        SELECT id, subject, exam_type, slot, session, file_url
        FROM papers
        WHERE status = 'pending'
        ORDER BY created_at DESC
        """
    )

    papers = cur.fetchall()

    cur.close()
    conn.close()

    return jsonify(papers), 200


# Approve a paper
def approve_paper(paper_id):
    conn = get_db()
    cur = conn.cursor()

    cur.execute(
        "UPDATE papers SET status = 'approved' WHERE id = %s",
        (paper_id,)
    )

    conn.commit()
    cur.close()
    conn.close()

    return jsonify({"message": "Paper approved successfully"}), 200


# Delete a paper (database only)
def delete_paper(paper_id):
    conn = get_db()
    cur = conn.cursor()

    cur.execute("SELECT id FROM papers WHERE id = %s", (paper_id,))
    paper = cur.fetchone()

    if not paper:
        cur.close()
        conn.close()
        return jsonify({"error": "Paper not found"}), 404

    cur.execute("DELETE FROM papers WHERE id = %s", (paper_id,))
    conn.commit()

    cur.close()
    conn.close()

    return jsonify({"message": "Paper deleted successfully"}), 200
