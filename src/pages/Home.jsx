import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ padding: 20 }}>
      <h1>PYQ Portal</h1>

      <Link to="/upload">
        <button>Upload Paper</button>
      </Link>

      <Link to="/view" style={{ marginLeft: 10 }}>
        <button>View Papers</button>
      </Link>
    </div>
  );
}