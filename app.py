from dotenv import load_dotenv
load_dotenv()

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

if __name__ == "__main__":
    app.run()