import { useEffect, useState, useCallback } from "react";

const BACKEND = import.meta.env.VITE_BACKEND_URL;
const ADMIN_KEY = import.meta.env.VITE_ADMIN_KEY;

export default function Admin() {
  const [papers, setPapers] = useState([]);

  const fetchPending = useCallback(async () => {
    try {
      const res = await fetch(`${BACKEND}/admin/papers`, {
        headers: {
          "x-admin-key": ADMIN_KEY
        }
      });

      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();
      setPapers(data);
    } catch (err) {
      console.error(err);
    }
  }, [BACKEND, ADMIN_KEY]); // 🔥 IMPORTANT

  const approvePaper = async (id) => {
    await fetch(`${BACKEND}/admin/approve/${id}`, {
      method: "POST",
      headers: { "x-admin-key": ADMIN_KEY }
    });
    fetchPending();
  };

  const deletePaper = async (id) => {
    await fetch(`${BACKEND}/admin/delete/${id}`, {
      method: "DELETE",
      headers: { "x-admin-key": ADMIN_KEY }
    });
    fetchPending();
  };

  useEffect(() => {
    fetchPending();
  }, [fetchPending]); // 🔥 Stable dependency

  return (
    <div style={{ padding: 20 }}>
      <h2>Admin Dashboard</h2>

      {papers.length === 0 && <p>No pending papers</p>}

      {papers.map(p => (
        <div
          key={p.id}
          style={{
            border: "1px solid #ccc",
            padding: 10,
            marginBottom: 10
          }}
        >
          <h4>{p.subject}</h4>
          <p>{p.exam_type} | {p.slot}</p>

          <button onClick={() => approvePaper(p.id)}>Approve</button>
          <button
            onClick={() => deletePaper(p.id)}
            style={{ marginLeft: 10 }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}