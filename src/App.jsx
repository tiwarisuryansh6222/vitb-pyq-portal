import { BrowserRouter, Routes, Route } from "react-router-dom";
import Upload from "./pages/Upload";
import ViewPapers from "./pages/ViewPapers";
import Home from "./pages/Home";
import Admin from "./pages/Admin";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/view" element={<ViewPapers />} />
        <Route path="/admin" element={<Admin />} /> {/* 🔥 */}
      </Routes>
    </BrowserRouter>
  );
}