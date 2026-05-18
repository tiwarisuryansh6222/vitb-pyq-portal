from dotenv import load_dotenv
load_dotenv()

import os
from flask import Flask
from flask_cors import CORS
from routes import api
from db.database import init_db

app = Flask(__name__)
CORS(app)

init_db()

app.register_blueprint(api, url_prefix="/api")

@app.route("/")
def home():
    return "PYQ Backend Running"

@app.route("/health")
def health():
    return {"status": "alive"}, 200

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    app.run(host="0.0.0.0", port=port)