import { useState } from "react";

function Feedback() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    rating: 0,
    message: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://pyq-backend-4zj5.onrender.com/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      if (res.ok) {
        alert("Thanks for your feedback!");
        setForm({ name: "", email: "", rating: 0, message: "" });
      } else {
        alert("Failed to submit feedback");
      }

    } catch (err) {
      console.error(err);
      alert("Server error. Please try again later.");
    }
  };

  return (
    <div style={{ marginTop: "40px" }}>
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

        <button type="submit">Submit Feedback</button>

      </form>
    </div>
  );
}

export default Feedback;