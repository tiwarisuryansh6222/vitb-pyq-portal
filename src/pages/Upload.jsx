import { useState } from "react";

const BACKEND = import.meta.env.VITE_BACKEND_URL;

export default function Upload() {
  const [form, setForm] = useState({
    subject: "",
    exam_type: "",
    slot: "",
    session: "",
    file: null
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(form).forEach(key => data.append(key, form[key]));

    const res = await fetch(`${BACKEND}/upload`, {
      method: "POST",
      body: data
    });

    if (res.ok) alert("Uploaded");
    else alert("Upload failed");
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: 20 }}>
      <input placeholder="Subject" onChange={e => setForm({...form, subject: e.target.value})} /><br/>
      <select onChange={e => setForm({...form, exam_type: e.target.value})}>
        <option value="">Select Exam</option>
        <option>Mid Term</option>
        <option>End Term</option>
        <option>Supply</option>
        <option>Arrear</option>
      </select><br/>
      <input placeholder="Slot" onChange={e => setForm({...form, slot: e.target.value})} /><br/>
      <input placeholder="Session" onChange={e => setForm({...form, session: e.target.value})} /><br/>
      <input type="file" accept="application/pdf" onChange={e => setForm({...form, file: e.target.files[0]})} /><br/>
      <button type="submit">Upload</button>
    </form>
  );
}