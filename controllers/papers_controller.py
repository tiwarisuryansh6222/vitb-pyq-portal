from flask import jsonify, request
from db.database import get_db

def get_papers():
    exam_type = request.args.get("exam_type")

    conn = get_db()
    cur = conn.cursor()

    query = """
        SELECT subject, exam_type, slot, session, file_url
        FROM papers
        WHERE status = 'approved'
    """
    params = []

    if exam_type:
        query += " AND exam_type = %s"
        params.append(exam_type)

    query += " ORDER BY created_at DESC"

    cur.execute(query, params)
    papers = cur.fetchall()

    cur.close()
    conn.close()

    return jsonify(papers), 200