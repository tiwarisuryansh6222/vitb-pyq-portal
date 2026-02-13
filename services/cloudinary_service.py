import cloudinary
import cloudinary.uploader
import os
import re
from dotenv import load_dotenv

load_dotenv()

cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET"),
    secure=True
)


def sanitize_filename(filename):
    # Split name and extension
    name, ext = os.path.splitext(filename)

    # Convert to lowercase
    name = name.lower()

    # Replace spaces and special characters with hyphen
    name = re.sub(r'[^a-z0-9]+', '-', name)

    # Remove leading/trailing hyphens
    name = name.strip('-')

    return f"{name}{ext}"


def upload_pdf(file):
    file.seek(0)

    safe_filename = sanitize_filename(file.filename)

    upload_result = cloudinary.uploader.upload(
        file.stream,
        resource_type="raw",
        folder="pyq_papers",
        public_id=safe_filename,
        overwrite=True
    )

    return upload_result
