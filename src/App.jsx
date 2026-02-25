import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { CryptoProvider } from "./context/CryptoContext";

function App() {
  return (
    <CryptoProvider>
      <Router>
        <nav style={{ padding: "20px", background: "#111", color: "white" }}>
          <Link to="/" style={{ marginRight: "20px", color: "white" }}>
            Market
          </Link>
          <Link to="/analysis" style={{ color: "white" }}>
            Analysis
          </Link>
        </nav>

        <Routes>
          <Route path="/" element={<h1>Home Page</h1>} />
          <Route path="/analysis" element={<h1>Analysis Page</h1>} />
        </Routes>
      </Router>
    </CryptoProvider>
  );
}

export default App;