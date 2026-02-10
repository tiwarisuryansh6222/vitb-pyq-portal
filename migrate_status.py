import os
import psycopg2

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise Exception("DATABASE_URL not set")

conn = psycopg2.connect(DATABASE_URL)
cur = conn.cursor()

cur.execute("""
ALTER TABLE papers
ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'pending';
""")

conn.commit()
cur.close()
conn.close()

print("✅ status column added successfully")