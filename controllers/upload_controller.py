from flask import request, jsonify
from services.cloudinary_service import upload_pdf
from db.database import get_db

def upload_paper():
    print("UPLOAD ROUTE HIT")

    try:
        if "file" not in request.files:
            return jsonify({"error": "No file uploaded"}), 400

        file = request.files["file"]

        subject = request.form.get("subject")
        exam_type = request.form.get("exam_type")
        slot = request.form.get("slot")
        session = request.form.get("session")

        # Upload to Cloudinary
        upload_result = upload_pdf(file)
        file_url = upload_result["secure_url"]

        print("Cloudinary URL:", file_url)

        # Save to PostgreSQL
        conn = get_db()
        cur = conn.cursor()

        cur.execute(
            """
            INSERT INTO papers (subject, exam_type, slot, session, file_url, status)
            VALUES (%s, %s, %s, %s, %s, 'pending')
            """,
            (subject, exam_type, slot, session, file_url)
        )

        conn.commit()
        cur.close()
        conn.close()

        return jsonify({"message": "Upload successful"}), 201

    except Exception as e:
        print("UPLOAD ERROR:", e)
        return jsonify({"error": "Upload failed"}), 500