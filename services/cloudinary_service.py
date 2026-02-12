import os
import cloudinary
import cloudinary.uploader

cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET"),
    secure=True
)

def upload_pdf(file):
    original_filename = file.filename  # keeps .pdf

    return cloudinary.uploader.upload(
        file,
        resource_type="raw",
        folder="pyq_papers",
        overwrite=True
    )