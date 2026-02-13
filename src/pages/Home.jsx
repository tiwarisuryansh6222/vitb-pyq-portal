import { Link } from "react-router-dom";

export default function Home() {
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
            <Link to="/view" className="navbar-link">View Papers</Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <div className="container">
          {/* Hero Section */}
          <div className="hero-section">
            <h1 className="hero-title">PYQ Portal</h1>
            <p className="hero-subtitle">
              Access previous year question papers, upload new papers, and help fellow students prepare better for exams.
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
              <h3 style={{ fontSize: '1.25rem', marginBottom: 'var(--spacing-sm)', color: 'var(--primary-color)' }}>
                📤 Easy Upload
              </h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 0 }}>
                Upload question papers with details like subject, exam type, slot, and session in seconds.
              </p>
            </div>

            <div className="card">
              <h3 style={{ fontSize: '1.25rem', marginBottom: 'var(--spacing-sm)', color: 'var(--primary-color)' }}>
                🔍 Smart Search
              </h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 0 }}>
                Filter papers by subject, exam type, slot, and session to find exactly what you need.
              </p>
            </div>

            <div className="card">
              <h3 style={{ fontSize: '1.25rem', marginBottom: 'var(--spacing-sm)', color: 'var(--primary-color)' }}>
                💾 Cloud Storage
              </h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 0 }}>
                All papers are securely stored in the cloud and accessible anytime, anywhere.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}