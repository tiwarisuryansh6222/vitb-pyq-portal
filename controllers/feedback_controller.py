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

    cur.execute("SELECT * FROM feedback ORDER BY created_at DESC")
    rows = cur.fetchall()

    cur.close()
    conn.close()

    return jsonify(rows)