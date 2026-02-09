import { useEffect, useState } from "react";

const BACKEND = import.meta.env.VITE_BACKEND_URL;

export default function ViewPapers() {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BACKEND}/papers`)
      .then((res) => res.json())
      .then((data) => {
        setPapers(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading papers...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Available Papers</h2>

      {papers.length === 0 && <p>No papers available.</p>}

      {papers.map((paper, i) => (
        <div
          key={i}
          style={{
            border: "1px solid #ddd",
            padding: 15,
            marginBottom: 12,
            borderRadius: 6
          }}
        >
          <h3>{paper.subject}</h3>
          <p><b>Exam:</b> {paper.exam_type}</p>
          <p><b>Slot:</b> {paper.slot}</p>
          {paper.session && <p><b>Session:</b> {paper.session}</p>}

          {/* VIEW (opens PDF in browser safely) */}
          <a
            href={`https://docs.google.com/gview?url=${encodeURIComponent(
              paper.file_url
            )}&embedded=true`}
            target="_blank"
            rel="noreferrer"
            style={{ marginRight: 12, color: "#2563eb" }}
          >
            View
          </a>

          {/* DOWNLOAD */}
          <a
            href={paper.file_url}
            download
            style={{ color: "#16a34a" }}
          >
            Download
          </a>
        </div>
      ))}
    </div>
  );
}