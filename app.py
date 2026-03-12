from dotenv import load_dotenv
load_dotenv()

from flask import Flask
from flask_cors import CORS
from routes import api
from db.database import init_db

app = Flask(__name__)
CORS(app)

# Initialize DB (creates table if missing)
init_db()

# Register API routes
app.register_blueprint(api, url_prefix="/api")

# Home route
@app.route("/")
def home():
    return "PYQ Backend Running"

# Health route for uptime monitoring
@app.route("/health")
def health():
    return {"status": "alive"}, 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)