import { useState } from "react";

// Success Modal Component
function SuccessModal({ onClose }) {
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
      backgroundColor: "rgba(0,0,0,0.6)", display: "flex",
      alignItems: "center", justifyContent: "center", zIndex: 1000,
      animation: "fadeIn 0.3s ease"
    }}>
      <div style={{
        background: "linear-gradient(135deg, #1e1b4b, #2d1b69)",
        border: "1px solid #7c3aed",
        borderRadius: "20px", padding: "40px", textAlign: "center",
        maxWidth: "380px", width: "90%",
        boxShadow: "0 0 40px rgba(124, 58, 237, 0.4)",
        animation: "slideUp 0.3s ease"
      }}>
        {/* Animated checkmark */}
        <div style={{
          width: "70px", height: "70px", borderRadius: "50%",
          background: "linear-gradient(135deg, #7c3aed, #a855f7)",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 20px", fontSize: "32px",
          boxShadow: "0 0 20px rgba(168, 85, 247, 0.5)"
        }}>
          ✓
        </div>

        <h2 style={{ color: "#fff", margin: "0 0 10px", fontSize: "24px" }}>
          Thank You! 🎉
        </h2>
        <p style={{ color: "#c4b5fd", margin: "0 0 25px", lineHeight: "1.6" }}>
          Your feedback has been submitted successfully. We really appreciate you taking the time!
        </p>

        <button
          onClick={onClose}
          style={{
            background: "linear-gradient(135deg, #7c3aed, #a855f7)",
            color: "#fff", border: "none", borderRadius: "12px",
            padding: "12px 32px", fontSize: "16px", cursor: "pointer",
            fontWeight: "600", transition: "transform 0.2s, box-shadow 0.2s",
            boxShadow: "0 4px 15px rgba(124, 58, 237, 0.4)"
          }}
          onMouseOver={e => e.target.style.transform = "scale(1.05)"}
          onMouseOut={e => e.target.style.transform = "scale(1)"}
        >
          Awesome! 👍
        </button>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { transform: translateY(30px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
      `}</style>
    </div>
  );
}

function Feedback() {
  const [form, setForm] = useState({ name: "", email: "", rating: 0, message: "" });
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("https://pyq-backend-4zj5.onrender.com/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (res.ok) {
        setShowSuccess(true); // 👈 Show modal instead of alert
        setForm({ name: "", email: "", rating: 0, message: "" });
      } else {
        alert("Failed to submit feedback");
      }
    } catch (err) {
      console.error(err);
      alert(`Server error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: "40px" }}>
      {showSuccess && <SuccessModal onClose={() => setShowSuccess(false)} />}

      <h2>💬 Feedback</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name (optional)"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <br /><br />
        <input
          placeholder="Email (optional)"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <br /><br />
        <label>Rating:</label>
        <select
          value={form.rating}
          onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
        >
          <option value="0">Select</option>
          <option value="5">⭐⭐⭐⭐⭐</option>
          <option value="4">⭐⭐⭐⭐</option>
          <option value="3">⭐⭐⭐</option>
          <option value="2">⭐⭐</option>
          <option value="1">⭐</option>
        </select>
        <br /><br />
        <textarea
          placeholder="Your feedback..."
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />
        <br /><br />
        <button type="submit" onClick={handleSubmit} disabled={loading}>
          {loading ? "Submitting..." : "Submit Feedback"}
        </button>
      </form>
    </div>
  );
}

export default Feedback;