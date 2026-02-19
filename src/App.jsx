import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Upload from "./pages/Upload";
import ViewPapers from "./pages/ViewPapers";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import "./App.css";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />

        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/view" element={<ViewPapers />} />

        {/* 🔒 Secret Admin Route */}
        <Route path="/081024" element={<Admin />} />
      </Routes>

      {/* Footer */}
      <footer
        style={{
          marginTop: "40px",
          padding: "20px",
          textAlign: "center",
          borderTop: "1px solid #ddd",
        }}
      >
        <Link to="/about">About</Link> |{" "}
        <Link to="/contact">Contact</Link> |{" "}
        <Link to="/privacy">Privacy Policy</Link> |{" "}
        <Link to="/terms">Terms</Link>
      </footer>
    </BrowserRouter>
  );
}
