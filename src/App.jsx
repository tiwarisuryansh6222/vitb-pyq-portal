import { BrowserRouter, Routes, Route } from "react-router-dom";
import Upload from "./pages/Upload";
import ViewPapers from "./pages/ViewPapers";
import Home from "./pages/Home";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/view" element={<ViewPapers />} />
      </Routes>
    </BrowserRouter>
  );
}