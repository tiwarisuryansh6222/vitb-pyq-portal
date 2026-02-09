from flask import jsonify, request
from db.database import get_db

def get_papers():
    exam_type = request.args.get("exam_type")

    conn = get_db()
    cur = conn.cursor()

    query = "SELECT subject, exam_type, slot, session, file_url FROM papers"
    params = []

    if exam_type:
        query += " WHERE exam_type=?"
        params.append(exam_type)

    cur.execute(query, params)
    rows = cur.fetchall()
    conn.close()

    papers = []
    for r in rows:
        papers.append({
            "subject": r[0],
            "exam_type": r[1],
            "slot": r[2],
            "session": r[3],
            "file_url": r[4]
        })

    return jsonify(papers)