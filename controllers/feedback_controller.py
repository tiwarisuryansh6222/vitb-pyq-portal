from flask import request, jsonify

def submit_feedback():
    data = request.json

    name = data.get("name")
    email = data.get("email")
    rating = data.get("rating")
    message = data.get("message")

    print("Feedback received:")
    print(name, email, rating, message)

    return jsonify({"message": "Feedback received successfully"}), 200