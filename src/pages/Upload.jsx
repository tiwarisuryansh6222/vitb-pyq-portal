import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: 20 }}>
      <h2>Upload Paper</h2>

      <input
        placeholder="Subject"
        required
        value={form.subject}
        onChange={e => setForm({ ...form, subject: e.target.value })}
      />
      <br />

      <select
        required
        value={form.exam_type}
        onChange={e => setForm({ ...form, exam_type: e.target.value })}
      >
        <option value="">Select Exam</option>
        <option>Mid Term</option>
        <option>End Term</option>
        <option>Supply</option>
        <option>Arrear</option>
      </select>
      <br />

      <input
        placeholder="Slot"
        required
        value={form.slot}
        onChange={e => setForm({ ...form, slot: e.target.value })}
      />
      <br />

      <input
        placeholder="Session"
        value={form.session}
        onChange={e => setForm({ ...form, session: e.target.value })}
      />
      <br />

      <input
        type="file"
        accept="application/pdf"
        required
        onChange={e => setForm({ ...form, file: e.target.files[0] })}
      />
      <br />

      <button type="submit">Upload</button>
    </form>
  );
}