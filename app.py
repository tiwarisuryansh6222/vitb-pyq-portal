from flask import Flask
from flask_cors import CORS
from routes import api
from db.database import init_db

app = Flask(_name_)
CORS(app)

# Initialize database
init_db()

# Register API routes with /api prefix
app.register_blueprint(api, url_prefix="/api")

@app.route("/")
def home():
    return "PYQ Backend Running"

if _name_ == "_main_":
    app.run(debug=True)