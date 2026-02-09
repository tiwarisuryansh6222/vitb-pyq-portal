import sqlite3

DB_PATH = "db/database.db"

def get_db():
    conn = sqlite3.connect(DB_PATH)
    return conn

def init_db():
    conn = get_db()
    cur = conn.cursor()
    cur.execute("""
        CREATE TABLE IF NOT EXISTS papers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            subject TEXT,
            exam_type TEXT,
            slot TEXT,
            session TEXT,
            file_url TEXT
        )
    """)
    conn.commit()
    conn.close()