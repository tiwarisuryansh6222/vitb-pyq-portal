import os
import psycopg2

def run_migration():
    DATABASE_URL = os.getenv("DATABASE_URL")

    if not DATABASE_URL:
        print("DATABASE_URL not set. Skipping migration.")
        return

    conn = psycopg2.connect(DATABASE_URL)
    cur = conn.cursor()

    # Check if table exists
    cur.execute("""
        SELECT EXISTS (
            SELECT FROM information_schema.tables
            WHERE table_name = 'papers'
        );
    """)
    table_exists = cur.fetchone()[0]

    if not table_exists:
        print("Table 'papers' does not exist. Skipping migration.")
        cur.close()
        conn.close()
        return

    # Run migration safely
    cur.execute("""
        ALTER TABLE papers
        ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'pending';
    """)

    conn.commit()
    cur.close()
    conn.close()

    print("✅ status column ensured")
