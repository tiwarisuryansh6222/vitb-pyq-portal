import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Feedback from "../components/Feedback";

const BACKEND = "https://pyq-backend-4zj5.onrender.com";

export default function Home() {
  const [ratingSummary, setRatingSummary] = useState(null);

  useEffect(() => {
    fetch(`${BACKEND}/api/feedback/summary`)
      .then(res => res.json())
      .then(data => setRatingSummary(data))
      .catch(err => console.error(err));
  }, []);

  const scrollToFeedback = () => {
    document.getElementById("feedback-section").scrollIntoView({
      behavior: "smooth"
    });
  };

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

            {/* Rating Badge */}
            {ratingSummary && ratingSummary.total > 0 && (
              <div style={{
                display: "inline-block",
                background: "rgba(124, 58, 237, 0.15)",
                border: "1px solid rgba(124, 58, 237, 0.4)",
                borderRadius: "99px",
                padding: "6px 18px",
                marginBottom: "20px",
                fontSize: "15px",
                color: "#a78bfa"
              }}>
                ⭐ {ratingSummary.avg_rating} / 5 rating from {ratingSummary.total} students
              </div>
            )}

            <div className="hero-buttons">
              <Link to="/upload" className="btn btn-primary btn-lg">
                📤 Upload Paper
              </Link>
              <Link to="/view" className="btn btn-secondary btn-lg">
                📖 Browse Papers
              </Link>
              <button onClick={scrollToFeedback} className="btn btn-secondary btn-lg">
                💬 Give Feedback
              </button>
            </div>
          </div>

          {/* Features Section */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "var(--spacing-lg)",
            marginTop: "var(--spacing-2xl)"
          }}>
            <div className="card">
              <h3 style={{ fontSize: "1.25rem", marginBottom: "var(--spacing-sm)", color: "var(--accent-purple)" }}>
                📤 Easy Upload
              </h3>
              <p style={{ color: "var(--text-secondary)", marginBottom: 0 }}>
                Upload question papers with details like subject, exam type, slot, and session in seconds.
              </p>
            </div>

            <div className="card">
              <h3 style={{ fontSize: "1.25rem", marginBottom: "var(--spacing-sm)", color: "var(--accent-purple)" }}>
                🔍 Smart Search
              </h3>
              <p style={{ color: "var(--text-secondary)", marginBottom: 0 }}>
                Filter papers by subject, exam type, slot, and session to find exactly what you need.
              </p>
            </div>

            <div className="card">
              <h3 style={{ fontSize: "1.25rem", marginBottom: "var(--spacing-sm)", color: "var(--accent-purple)" }}>
                💾 Cloud Storage
              </h3>
              <p style={{ color: "var(--text-secondary)", marginBottom: 0 }}>
                All papers are securely stored in the cloud and accessible anytime, anywhere.
              </p>
            </div>
          </div>

          {/* Feedback Section */}
          <div id="feedback-section" style={{ marginTop: "100px" }}>
            <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
              💬 Help Us Improve
            </h2>
            <Feedback />
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <p className="footer-text">
            Made by <span className="footer-name">BH01</span>-
            <span className="footer-name">A524</span>
          </p>
        </div>
      </footer>

    </div>
  );
}