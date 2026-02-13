from flask import jsonify
from db.database import get_db


def delete_paper(paper_id):
    conn = get_db()
    cur = conn.cursor()

    # Check if paper exists
    cur.execute("SELECT id FROM papers WHERE id = %s", (paper_id,))
    paper = cur.fetchone()

    if not paper:
        cur.close()
        conn.close()
        return jsonify({"error": "Paper not found"}), 404

    # Delete from database
    cur.execute("DELETE FROM papers WHERE id = %s", (paper_id,))
    conn.commit()

    cur.close()
    conn.close()

    return jsonify({"message": "Paper deleted successfully"}), 200
