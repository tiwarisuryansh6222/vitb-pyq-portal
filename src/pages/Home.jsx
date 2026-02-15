import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const BACKEND = import.meta.env.VITE_BACKEND_URL;

export default function Home() {
  const [paperCount, setPaperCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        if (!BACKEND) {
          console.error("VITE_BACKEND_URL is not defined");
          setLoading(false);
          return;
        }

        const res = await fetch(`${BACKEND}/papers/count`);
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        console.log("Count data received:", data);
        
        setPaperCount(data.total || 0);
      } catch (err) {
        console.error("Count fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCount();
  }, []);

  return (
    <div>
      {/* Navigation */}
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-brand">
            📚 VITB PYQs
          </Link>
          <div className="navbar-menu">
            <Link to="/upload" className="navbar-link">Upload Paper</Link>
            <Link to="/view" className="navbar-link">View Papers</Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <div className="container">
          {/* Hero Section */}
          <div className="hero-section">
            <h1 className="hero-title">VITB PYQs</h1>
            <p className="hero-subtitle">
              Access previous year question papers easily and help fellow students prepare better for exams.
            </p>

            {/* Paper Count */}
            <p className="paper-count" style={{ 
              fontSize: '1.25rem', 
              fontWeight: '600', 
              color: 'var(--text-secondary)',
              marginTop: 'var(--spacing-lg)',
              marginBottom: 'var(--spacing-xl)'
            }}>
              {loading ? "📄 Loading..." : `📄 ${paperCount}+ papers available`}
            </p>

            <div className="hero-buttons">
              <Link to="/upload" className="btn btn-primary btn-lg">
                📤 Upload Paper
              </Link>
              <Link to="/view" className="btn btn-secondary btn-lg">
                📖 Browse Papers
              </Link>
            </div>
          </div>

          {/* Features Section */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--spacing-lg)', marginTop: 'var(--spacing-2xl)' }}>
            <div className="card">
              <h3 style={{ fontSize: '1.25rem', marginBottom: 'var(--spacing-sm)', color: 'var(--accent-purple)' }}>
                📤 Easy Upload
              </h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 0 }}>
                Upload question papers with details like subject, exam type, slot, and session in seconds.
              </p>
            </div>

            <div className="card">
              <h3 style={{ fontSize: '1.25rem', marginBottom: 'var(--spacing-sm)', color: 'var(--accent-purple)' }}>
                🔍 Smart Search
              </h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 0 }}>
                Filter papers by subject, exam type, slot, and session to find exactly what you need.
              </p>
            </div>

            <div className="card">
              <h3 style={{ fontSize: '1.25rem', marginBottom: 'var(--spacing-sm)', color: 'var(--accent-purple)' }}>
                💾 Cloud Storage
              </h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 0 }}>
                All papers are securely stored in the cloud and accessible anytime, anywhere.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <p className="footer-text">
            Made with 💜 by <span className="footer-name">Suryansh</span> and <span className="footer-name">Sparsh</span>
          </p>
        </div>
      </footer>
    </div>
  );
}