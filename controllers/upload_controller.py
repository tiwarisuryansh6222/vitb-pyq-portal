from flask import request, jsonify
from services.cloudinary_service import upload_pdf

def upload_paper():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]

    if file.filename == "":
        return jsonify({"error": "Empty filename"}), 400

    # Debug: check file size
    file.seek(0, 2)
    size = file.tell()
    file.seek(0)
    print("Received file size:", size)

    # Upload to Cloudinary
    upload_result = upload_pdf(file)

    print("Cloudinary bytes:", upload_result.get("bytes"))

    return jsonify({
        "url": upload_result["secure_url"],
        "public_id": upload_result["public_id"]
    })
