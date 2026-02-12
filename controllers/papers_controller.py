from flask import jsonify, request
from db.database import get_db

def get_papers():
    subject = request.args.get("subject")
    exam_type = request.args.get("exam_type")
    slot = request.args.get("slot")
    session = request.args.get("session")

    conn = get_db()
    cur = conn.cursor()

    query = """
        SELECT id, subject, exam_type, slot, session, file_url
        FROM papers
        WHERE status = 'approved'
    """
    params = []

    if subject:
        query += " AND subject ILIKE %s"
        params.append(f"%{subject}%")

    if exam_type:
        query += " AND exam_type = %s"
        params.append(exam_type)

    if slot:
        query += " AND slot = %s"
        params.append(slot)

    if session:
        query += " AND session = %s"
        params.append(session)

    query += " ORDER BY created_at DESC"

    cur.execute(query, params)
    papers = cur.fetchall()

    cur.close()
    conn.close()

    return jsonify(papers), 200