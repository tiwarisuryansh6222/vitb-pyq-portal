from flask import Flask
from flask_cors import CORS
from routes import api
from db.database import init_db

app = Flask(_name_)
CORS(app)

init_db()

app.register_blueprint(api, url_prefix="/api")

@app.route("/")
def home():
    return "PYQ Backend Running"

if _name_ == "_main_":
    app.run()