from flask import request, jsonify
from services.cloudinary_service import upload_pdf

def upload_paper():
<<<<<<< HEAD
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
=======
    print("--------------------------------------------------")
    print("UPLOAD ROUTE HIT")
>>>>>>> bfc98e85f1c6b205f781bdfaa94487b309fc5a42

    file = request.files["file"]

    if file.filename == "":
        return jsonify({"error": "Empty filename"}), 400

    # Debug: check file size
    file.seek(0, 2)
    size = file.tell()
    file.seek(0)
    print("Received file size:", size)

<<<<<<< HEAD
    # Upload to Cloudinary
    upload_result = upload_pdf(file)

    print("Cloudinary bytes:", upload_result.get("bytes"))

    return jsonify({
        "url": upload_result["secure_url"],
        "public_id": upload_result["public_id"]
    })
=======
        # 1. Upload to Cloudinary
        print(f"Uploading file: {file.filename}")
        upload_result = upload_pdf(file)
        
        # Get the secure URL from Cloudinary response
        file_url = upload_result.get("secure_url")

        print("SUCCESS! Cloudinary URL:", file_url)
        print("--------------------------------------------------")

        # 2. Save to PostgreSQL
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

        return jsonify({
            "message": "Upload successful", 
            "url": file_url
        }), 201

    except Exception as e:
        print("UPLOAD ERROR:", e)
        return jsonify({"error": "Upload failed"}), 500
>>>>>>> bfc98e85f1c6b205f781bdfaa94487b309fc5a42
