from flask import request, jsonify
from services.cloudinary_service import upload_pdf
from db.database import get_db

def upload_paper():
    try:
        subject = request.form.get("subject")
        exam_type = request.form.get("exam_type")
        slot = request.form.get("slot")
        session = request.form.get("session")
        file = request.files.get("file")

        if not file:
            return jsonify({"error": "No file uploaded"}), 400

        file_url = upload_pdf(file)

        conn = get_db()
        cur = conn.cursor()
        cur.execute("""
            INSERT INTO papers (subject, exam_type, slot, session, file_url)
            VALUES (?, ?, ?, ?, ?)
        """, (subject, exam_type, slot, session, file_url))
        conn.commit()
        conn.close()

        return jsonify({"message": "Upload successful", "url": file_url})

    except Exception as e:
        return jsonify({"error": str(e)}), 500