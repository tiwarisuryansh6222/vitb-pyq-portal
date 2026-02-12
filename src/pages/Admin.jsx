import { useEffect, useState, useCallback } from "react";

const BACKEND = import.meta.env.VITE_BACKEND_URL;
const ADMIN_KEY = import.meta.env.VITE_ADMIN_KEY;

export default function Admin() {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPending = useCallback(async () => {
    try {
      setLoading(true);

      const res = await fetch(`${BACKEND}/admin/papers`, {
        headers: { "x-admin-key": ADMIN_KEY }
      });

      if (!res.ok) throw new Error("Unauthorized");

      const data = await res.json();
      setPapers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Admin fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [BACKEND, ADMIN_KEY]);

  const approvePaper = async (id) => {
    await fetch(`${BACKEND}/admin/approve/${id}`, {
      method: "POST",
      headers: { "x-admin-key": ADMIN_KEY }
    });

    fetchPending();
  };

  const deletePaper = async (id) => {
    if (!window.confirm("Delete this paper?")) return;

    await fetch(`${BACKEND}/admin/delete/${id}`, {
      method: "DELETE",
      headers: { "x-admin-key": ADMIN_KEY }
    });

    fetchPending();
  };

  useEffect(() => {
    fetchPending();
  }, [fetchPending]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Admin Dashboard</h2>

      {loading && <p>Loading pending papers...</p>}
      {!loading && papers.length === 0 && <p>No pending papers</p>}

      {papers.map((p) => (
        <div
          key={p.id}
          style={{
            border: "1px solid #ddd",
            padding: 15,
            marginBottom: 12,
            borderRadius: 6
          }}
        >
          <h3>{p.subject}</h3>
          <p><b>Exam:</b> {p.exam_type}</p>
          <p><b>Slot:</b> {p.slot}</p>
          {p.session && <p><b>Session:</b> {p.session}</p>}

          {/* 🔥 FORCE PREVIEW USING IFRAME TAB */}
          <a
            href={`https://docs.google.com/gview?url=${encodeURIComponent(
              p.file_url
            )}&embedded=true`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              marginRight: 12,
              color: "#2563eb",
              fontWeight: "bold"
            }}
          >
            View
          </a>

          <button onClick={() => approvePaper(p.id)}>
            Approve
          </button>

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