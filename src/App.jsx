import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { CryptoProvider } from "./context/CryptoContext";
import Home from "./pages/Home";
import Analysis from "./pages/Analysis";

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
          <Route path="/" element={<Home />} />
          <Route path="/analysis" element={<Analysis />} />
        </Routes>
      </Router>
    </CryptoProvider>
  );
}

export default App;