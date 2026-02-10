import sqlite3

conn = sqlite3.connect("db/database.db")
cursor = conn.cursor()

cursor.execute("SELECT COUNT(*) FROM papers")
count = cursor.fetchone()[0]

print("Total rows in papers table:", count)

cursor.execute("SELECT * FROM papers")
rows = cursor.fetchall()

print("Rows:")
for row in rows:
    print(row)

conn.close()