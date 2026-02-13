import { useEffect, useState } from "react";

const BACKEND = import.meta.env.VITE_BACKEND_URL;

export default function Admin() {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPending = async () => {
    try {
      const res = await fetch(`${BACKEND}/admin/papers`);
      const data = await res.json();
      setPapers(data);
    } catch (err) {
      console.error("Error fetching pending papers:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const approvePaper = async (id) => {
    await fetch(`${BACKEND}/admin/approve/${id}`, {
      method: "POST",
    });
    fetchPending();
  };

  const deletePaper = async (id) => {
    await fetch(`${BACKEND}/admin/delete/${id}`, {
      method: "DELETE",
    });
    fetchPending();
  };

  return (
    <div className="container">
      <h2>Admin Panel</h2>

      {loading && <p>Loading...</p>}

      {!loading && papers.length === 0 && (
        <p>No pending papers.</p>
      )}

      {papers.map((paper) => (
        <div key={paper.id} className="card" style={{ marginBottom: "15px" }}>
          <h3>{paper.subject}</h3>
          <p>{paper.exam_type} | {paper.slot} | {paper.session}</p>

          <div style={{ display: "flex", gap: "10px" }}>
            <a
              href={paper.file_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
            >
              View
            </a>

            <button
              className="btn"
              onClick={() => approvePaper(paper.id)}
            >
              Approve
            </button>

            <button
              className="btn"
              style={{ background: "red" }}
              onClick={() => deletePaper(paper.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
