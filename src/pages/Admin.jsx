import { useEffect, useState } from "react";

const BACKEND = import.meta.env.VITE_BACKEND_URL;

export default function Admin() {
  const [papers, setPapers] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("papers");

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

  const fetchFeedbacks = async () => {
    try {
      const res = await fetch(`${BACKEND}/admin/feedbacks`);
      const data = await res.json();
      setFeedbacks(data);
    } catch (err) {
      console.error("Error fetching feedbacks:", err);
    }
  };

  useEffect(() => {
    fetchPending();
    fetchFeedbacks();
  }, []);

  const approvePaper = async (id) => {
    await fetch(`${BACKEND}/admin/approve/${id}`, { method: "POST" });
    fetchPending();
  };

  const deletePaper = async (id) => {
    await fetch(`${BACKEND}/admin/delete/${id}`, { method: "DELETE" });
    fetchPending();
  };

  const deleteFeedback = async (id) => {
    await fetch(`${BACKEND}/admin/feedback/${id}`, { method: "DELETE" });
    fetchFeedbacks();
  };

  const renderStars = (rating) => "⭐".repeat(rating || 0);

  return (
    <div className="container">
      <h2>Admin Panel</h2>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "24px" }}>
        <button
          className="btn"
          onClick={() => setActiveTab("papers")}
          style={{
            background: activeTab === "papers" ? "#7c3aed" : "transparent",
            border: "1px solid #7c3aed"
          }}
        >
          📄 Pending Papers {papers.length > 0 && `(${papers.length})`}
        </button>
        <button
          className="btn"
          onClick={() => setActiveTab("feedbacks")}
          style={{
            background: activeTab === "feedbacks" ? "#7c3aed" : "transparent",
            border: "1px solid #7c3aed"
          }}
        >
          💬 Feedbacks {feedbacks.length > 0 && `(${feedbacks.length})`}
        </button>
      </div>

      {/* Papers Tab */}
      {activeTab === "papers" && (
        <>
          {loading && <p>Loading...</p>}
          {!loading && papers.length === 0 && <p>No pending papers.</p>}
          {papers.map((paper) => (
            <div key={paper.id} className="card" style={{ marginBottom: "15px" }}>
              <h3>{paper.subject}</h3>
              <p>{paper.exam_type} | {paper.slot} | {paper.session}</p>
              <div style={{ display: "flex", gap: "10px" }}>
                <a href={paper.file_url} target="_blank" rel="noopener noreferrer" className="btn">View</a>
                <button className="btn" onClick={() => approvePaper(paper.id)}>Approve</button>
                <button className="btn" style={{ background: "red" }} onClick={() => deletePaper(paper.id)}>Delete</button>
              </div>
            </div>
          ))}
        </>
      )}

      {/* Feedbacks Tab */}
      {activeTab === "feedbacks" && (
        <>
          {feedbacks.length === 0 && <p>No feedbacks yet.</p>}
          {feedbacks.map((fb) => (
            <div key={fb.id} className="card" style={{ marginBottom: "15px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <h3 style={{ margin: "0 0 4px" }}>
                    {fb.name || "Anonymous"} {fb.email && <span style={{ fontSize: "13px", color: "#a78bfa" }}>({fb.email})</span>}
                  </h3>
                  <p style={{ margin: "4px 0" }}>{renderStars(fb.rating)}</p>
                  <p style={{ margin: "8px 0 0", color: "#e2e8f0" }}>{fb.message}</p>
                </div>
                <button
                  className="btn"
                  style={{ background: "red", flexShrink: 0 }}
                  onClick={() => deleteFeedback(fb.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}