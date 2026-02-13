import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const BACKEND = import.meta.env.VITE_BACKEND_URL;

export default function Upload() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    subject: "",
    exam_type: "",
    slot: "",
    session: "",
    file: null
  });

  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!BACKEND) {
      alert("Backend URL not set. Check VITE_BACKEND_URL");
      return;
    }

    if (!form.file) {
      alert("Please select a PDF file");
      return;
    }

    setIsUploading(true);

    const data = new FormData();
    data.append("file", form.file);
    data.append("subject", form.subject);
    data.append("exam_type", form.exam_type);
    data.append("slot", form.slot);
    data.append("session", form.session);

    console.log("Uploading to:", BACKEND + "/upload");

    try {
      const res = await fetch(`${BACKEND}/upload`, {
        method: "POST",
        body: data
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(err);
      }

      alert("Upload successful ✅");
      navigate("/view");

    } catch (err) {
      console.error("UPLOAD ERROR:", err);
      alert("Upload failed ❌");
    } finally {
      setIsUploading(false);
    }
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
            <Link to="/upload" className="navbar-link active">Upload Paper</Link>
            <Link to="/view" className="navbar-link">View Papers</Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <div className="container container-sm">
          <div className="page-header">
            <h1 className="page-title">Upload Paper</h1>
            <p className="page-subtitle">
              Share a question paper with your fellow students by uploading it here.
            </p>
          </div>

          <div className="card">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Subject Name *</label>
                <input
                  className="form-input"
                  placeholder="e.g., Data Structures, Mathematics"
                  required
                  value={form.subject}
                  onChange={e => setForm({ ...form, subject: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Exam Type *</label>
                <select
                  className="form-select"
                  required
                  value={form.exam_type}
                  onChange={e => setForm({ ...form, exam_type: e.target.value })}
                >
                  <option value="">Select Exam Type</option>
                  <option>Mid Term</option>
                  <option>End Term</option>
                  <option>Supply</option>
                  <option>Arrear</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Slot *</label>
                <input
                  className="form-input"
                  placeholder="e.g., A1, B2, C1"
                  required
                  value={form.slot}
                  onChange={e => setForm({ ...form, slot: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Session</label>
                <input
                  className="form-input"
                  placeholder="e.g., 2023-24, Winter 2024"
                  value={form.session}
                  onChange={e => setForm({ ...form, session: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">PDF File *</label>
                <input
                  className="form-file"
                  type="file"
                  accept="application/pdf"
                  required
                  onChange={e => setForm({ ...form, file: e.target.files[0] })}
                />
                {form.file && (
                  <p style={{ marginTop: 'var(--spacing-sm)', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    Selected: {form.file.name}
                  </p>
                )}
              </div>

              <button 
                type="submit" 
                disabled={isUploading}
                className="btn btn-primary btn-block btn-lg"
              >
                {isUploading ? "⏳ Uploading..." : "📤 Upload Paper"}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}