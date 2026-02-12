import { useEffect, useState, useCallback } from "react";

const BACKEND = import.meta.env.VITE_BACKEND_URL;

export default function ViewPapers() {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    subject: "",
    exam_type: "",
    slot: "",
    session: ""
  });

  const fetchPapers = useCallback(async () => {
    try {
      if (!BACKEND) {
        console.error("VITE_BACKEND_URL is not defined");
        return;
      }

      setLoading(true);

      const params = new URLSearchParams();

      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });

      const res = await fetch(`${BACKEND}/papers?${params.toString()}`);

      if (!res.ok) throw new Error("Failed to fetch papers");

      const data = await res.json();

      setPapers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch error:", err);
      setPapers([]);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchPapers();
  }, [fetchPapers]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Available Papers</h2>

      {/* Filters */}
      <div style={{ marginBottom: 20 }}>
        <input
          placeholder="Search by subject"
          onChange={e =>
            setFilters(prev => ({ ...prev, subject: e.target.value }))
          }
        />

        <select
          onChange={e =>
            setFilters(prev => ({ ...prev, exam_type: e.target.value }))
          }
        >
          <option value="">All Exams</option>
          <option>Mid Term</option>
          <option>End Term</option>
          <option>Supply</option>
          <option>Arrear</option>
        </select>

        <input
          placeholder="Slot"
          onChange={e =>
            setFilters(prev => ({ ...prev, slot: e.target.value }))
          }
        />

        <input
          placeholder="Session"
          onChange={e =>
            setFilters(prev => ({ ...prev, session: e.target.value }))
          }
        />

        <button onClick={fetchPapers}>
          Apply Filters
        </button>
      </div>

      {loading && <p>Loading papers...</p>}
      {!loading && papers.length === 0 && <p>No papers found.</p>}

      {papers.map(paper => (
        <div
          key={paper.id}
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

          <a
            href={paper.file_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#2563eb" }}
          >
            View
          </a>
        </div>
      ))}
    </div>
  );
}