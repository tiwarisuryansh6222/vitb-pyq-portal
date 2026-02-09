import { useEffect, useState } from "react";

const BACKEND = import.meta.env.VITE_BACKEND_URL;

export default function ViewPapers() {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BACKEND}/papers`)
      .then(res => res.json())
      .then(data => {
        setPapers(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading papers...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Available Papers</h2>

      {papers.length === 0 && <p>No papers available.</p>}

      {papers.map((paper, i) => (
        <div key={i} style={{ border: "1px solid #ddd", padding: 15, marginBottom: 12 }}>
          <h3>{paper.subject}</h3>
          <p><b>Exam:</b> {paper.exam_type}</p>
          <p><b>Slot:</b> {paper.slot}</p>
          <p><b>Session:</b> {paper.session}</p>

          <a
            href={paper.file_url}
            target="_blank"
            rel="noreferrer"
            style={{ color: "blue", marginRight: 12 }}
          >
            View
          </a>

          <a href={paper.file_url} download>
            Download
          </a>
        </div>
      ))}
    </div>
  );
}