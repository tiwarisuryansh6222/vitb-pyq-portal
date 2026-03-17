import os
import psycopg2
from psycopg2.extras import RealDictCursor

DATABASE_URL = os.getenv("DATABASE_URL")

print("CONNECTED TO DATABASE:", DATABASE_URL)

if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL is not set in environment variables")


def get_db():
    return psycopg2.connect(
        DATABASE_URL,
        cursor_factory=RealDictCursor,
        options="-c client_encoding=UTF8"
    )

def init_db():
    conn = get_db()
    cur = conn.cursor()

    # Papers table
    cur.execute("""
        CREATE TABLE IF NOT EXISTS papers (
            id SERIAL PRIMARY KEY,
            subject TEXT NOT NULL,
            exam_type TEXT NOT NULL,
            slot TEXT,
            session TEXT,
            file_url TEXT NOT NULL,
            status VARCHAR(20) DEFAULT 'pending',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    """)

    # Feedback table
    cur.execute("""
        CREATE TABLE IF NOT EXISTS feedback (
            id SERIAL PRIMARY KEY,
            name TEXT,
            email TEXT,
            rating INTEGER,
            message TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    """)

    conn.commit()
    cur.close()
    conn.close()