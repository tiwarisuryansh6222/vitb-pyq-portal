import sqlite3

DB_PATH = "db/database.db"

def get_db():
    conn = sqlite3.connect(DB_PATH, check_same_thread=False)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    cur = conn.cursor()

    cur.execute("""
        CREATE TABLE IF NOT EXISTS papers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            subject TEXT NOT NULL,
            exam_type TEXT NOT NULL,
            slot TEXT,
            session TEXT,
            file_url TEXT NOT NULL
        )
    """)

    conn.commit()
    conn.close()