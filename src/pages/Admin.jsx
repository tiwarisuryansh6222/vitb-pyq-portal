import { Link } from "react-router-dom";

export default function Admin() {
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
            <Link to="/081024" className="navbar-link active">Admin</Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <div className="container">
          <div className="page-header">
            <h1 className="page-title">🔒 Admin Panel</h1>
            <p className="page-subtitle">
              Manage papers and monitor system activity.
            </p>
          </div>

          <div className="card">
            <h3>Admin Dashboard</h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Add your admin functionality here.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}