import { useEffect, useState, useCallback } from "react";

const BACKEND = import.meta.env.VITE_BACKEND_URL;
const ADMIN_KEY = import.meta.env.VITE_ADMIN_KEY;

export default function Admin() {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPending = useCallback(async () => {
    if (!BACKEND) {
      setError("Backend URL not configured");
      return;
    }

    if (!ADMIN_KEY) {
      setError("Admin key not configured");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${BACKEND}/admin/papers`, {
        headers: {
          "x-admin-key": ADMIN_KEY
        }
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Unauthorized");
      }

      const data = await res.json();
      setPapers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Admin fetch error:", err);
      setError("Failed to load pending papers");
    } finally {
      setLoading(false);
    }
  }, [BACKEND, ADMIN_KEY]);

  const approvePaper = async (id) => {
    try {
      await fetch(`${BACKEND}/admin/approve/${id}`, {
        method: "POST",
        headers: { "x-admin-key": ADMIN_KEY }
      });
      fetchPending();
    } catch (err) {
      console.error("Approve error:", err);
    }
  };

  const deletePaper = async (id) => {
    if (!window.confirm("Delete this paper?")) return;

    try {
      await fetch(`${BACKEND}/admin/delete/${id}`, {
        method: "DELETE",
        headers: { "x-admin-key": ADMIN_KEY }
      });
      fetchPending();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  useEffect(() => {
    fetchPending();
  }, [fetchPending]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Admin Dashboard</h2>

      {loading && <p>Loading pending papers...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && papers.length === 0 && !error && (
        <p>No pending papers</p>
      )}

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

          {/* Direct Preview */}
          <button
            onClick={() => window.open(p.file_url, "_blank")}
            style={{
              marginRight: 12,
              background: "#2563eb",
              color: "white",
              border: "none",
              padding: "6px 12px",
              borderRadius: 4,
              cursor: "pointer"
            }}
          >
            View
          </button>

          <button
            onClick={() => approvePaper(p.id)}
            style={{
              background: "green",
              color: "white",
              border: "none",
              padding: "6px 12px",
              borderRadius: 4,
              cursor: "pointer"
            }}
          >
            Approve
          </button>

          <button
            onClick={() => deletePaper(p.id)}
            style={{
              marginLeft: 10,
              background: "red",
              color: "white",
              border: "none",
              padding: "6px 12px",
              borderRadius: 4,
              cursor: "pointer"
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}