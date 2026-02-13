import cloudinary
import cloudinary.uploader
import os
from dotenv import load_dotenv

load_dotenv()

cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET"),
    secure=True
)

def upload_pdf(file):
    file.seek(0)

    upload_result = cloudinary.uploader.upload(
        file.stream,
        resource_type="raw",
        folder="pyq_papers",
        public_id=file.filename,   # preserve filename
        use_filename=True,
        unique_filename=False,
        overwrite=True
    )

    return upload_result

def delete_pdf(public_id):
    return cloudinary.uploader.destroy(
        public_id,
        resource_type="raw"
    )
