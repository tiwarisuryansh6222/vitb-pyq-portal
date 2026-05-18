from flask import request, jsonify
import os
import traceback
from services.cloudinary_service import upload_pdf
from db.database import get_db

def upload_paper():
    try:
        print("=== UPLOAD STARTED ===")
        print("CLOUD NAME:", os.getenv("CLOUDINARY_CLOUD_NAME"))
        print("API KEY:", os.getenv("CLOUDINARY_API_KEY"))
        
        if "file" not in request.files:
            return jsonify({"error": "No file uploaded"}), 400

        file = request.files["file"]
        print("FILE:", file.filename)

        subject = request.form.get("subject")
        exam_type = request.form.get("exam_type")
        slot = request.form.get("slot")
        session = request.form.get("session")

        upload_result = upload_pdf(file)
        file_url = upload_result.get("secure_url")

        conn = get_db()
        cur = conn.cursor()
        cur.execute(
            """
            INSERT INTO papers (subject, exam_type, slot, session, file_url, status)
            VALUES (%s, %s, %s, %s, %s, %s)
            """,
            (subject, exam_type, slot, session, file_url, 'pending')
        )
        conn.commit()
        cur.close()
        conn.close()

        return jsonify({"message": "Upload successful", "url": file_url}), 201

    except Exception as e:
        print("UPLOAD ERROR:", str(e))
        print(traceback.format_exc())
        return jsonify({"error": "Upload failed"}), 500