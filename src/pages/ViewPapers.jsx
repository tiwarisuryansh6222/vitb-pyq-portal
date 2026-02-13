import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";

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
    <div>
      {/* Navigation */}
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-brand">
            📚 PYQ Portal
          </Link>
          <div className="navbar-menu">
            <Link to="/upload" className="navbar-link">Upload Paper</Link>
            <Link to="/view" className="navbar-link active">View Papers</Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <div className="container">
          <div className="page-header">
            <h1 className="page-title">Browse Papers</h1>
            <p className="page-subtitle">
              Search and filter through our collection of previous year question papers.
            </p>
          </div>

          {/* Filter Section */}
          <div className="filter-section">
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: 'var(--spacing-lg)', color: 'var(--text-primary)' }}>
              🔍 Filter Papers
            </h3>
            <div className="filter-grid">
              <div className="form-group" style={{ marginBottom: 0 }}>
                <input
                  className="form-input"
                  placeholder="Search by subject"
                  value={filters.subject}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, subject: e.target.value }))
                  }
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <select
                  className="form-select"
                  value={filters.exam_type}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, exam_type: e.target.value }))
                  }
                >
                  <option value="">All Exam Types</option>
                  <option>Mid Term</option>
                  <option>End Term</option>
                  <option>Supply</option>
                  <option>Arrear</option>
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <input
                  className="form-input"
                  placeholder="Filter by slot"
                  value={filters.slot}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, slot: e.target.value }))
                  }
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <input
                  className="form-input"
                  placeholder="Filter by session"
                  value={filters.session}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, session: e.target.value }))
                  }
                />
              </div>
            </div>

            <button 
              onClick={fetchPapers}
              className="btn btn-primary"
              style={{ marginTop: 'var(--spacing-md)' }}
            >
              Apply Filters
            </button>
          </div>

          {/* Papers List */}
          {loading && (
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <p style={{ marginTop: 'var(--spacing-md)' }}>Loading papers...</p>
            </div>
          )}

          {!loading && papers.length === 0 && (
            <div className="empty-state">
              <p style={{ fontSize: '1.125rem', marginBottom: 'var(--spacing-sm)' }}>📭 No papers found</p>
              <p>Try adjusting your filters or upload a new paper.</p>
            </div>
          )}

          {!loading && papers.length > 0 && (
            <div className="papers-grid">
              {papers.map((paper) => (
                <div key={paper.id} className="paper-card">
                  <h3 className="paper-title">{paper.subject}</h3>
                  
                  <div className="paper-meta">
                    <div className="paper-meta-item">
                      <span className="paper-meta-label">Exam Type</span>
                      <span className="paper-meta-value">{paper.exam_type}</span>
                    </div>
                    
                    <div className="paper-meta-item">
                      <span className="paper-meta-label">Slot</span>
                      <span className="paper-meta-value">{paper.slot}</span>
                    </div>
                    
                    {paper.session && (
                      <div className="paper-meta-item">
                        <span className="paper-meta-label">Session</span>
                        <span className="paper-meta-value">{paper.session}</span>
                      </div>
                    )}
                  </div>

                  <div className="paper-actions">
                    
                      href={paper.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                      style={{ textDecoration: 'none', display: 'inline-flex' }}
                    <a>
                      📄 View PDF
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}