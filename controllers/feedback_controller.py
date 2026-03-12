from flask import request, jsonify
from db.database import get_db


def submit_feedback():
    data = request.json

    name = data.get("name")
    email = data.get("email")
    rating = data.get("rating")
    message = data.get("message")

    conn = get_db()
    cur = conn.cursor()

    cur.execute(
        """
        INSERT INTO feedback (name, email, rating, message)
        VALUES (%s, %s, %s, %s)
        """,
        (name, email, rating, message)
    )

    conn.commit()
    cur.close()
    conn.close()

    return jsonify({"message": "Feedback saved successfully"}), 200


def get_feedback():
    conn = get_db()
    cur = conn.cursor()

    cur.execute("SELECT id, name, email, rating, message, created_at FROM feedback ORDER BY created_at DESC")
    rows = cur.fetchall()

    cur.close()
    conn.close()

    feedbacks = []
    for row in rows:
        feedbacks.append({
            "id": row[0],
            "name": row[1],
            "email": row[2],
            "rating": row[3],
            "message": row[4],
            "created_at": str(row[5])
        })

    return jsonify(feedbacks), 200


def delete_feedback(feedback_id):
    conn = get_db()
    cur = conn.cursor()

    cur.execute("SELECT id FROM feedback WHERE id = %s", (feedback_id,))
    feedback = cur.fetchone()

    if not feedback:
        cur.close()
        conn.close()
        return jsonify({"error": "Feedback not found"}), 404

    cur.execute("DELETE FROM feedback WHERE id = %s", (feedback_id,))
    conn.commit()

    cur.close()
    conn.close()

    return jsonify({"message": "Feedback deleted successfully"}), 200