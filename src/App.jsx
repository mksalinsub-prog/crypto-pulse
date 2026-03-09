import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { CryptoProvider } from "./context/CryptoContext";
import Home from "./pages/Home";
import Analysis from "./pages/Analysis";

function App() {
  return (
    <CryptoProvider>
      <Router>
        <div style={{ minHeight: "100vh", backgroundColor: "#0f172a" }}>
          <nav
            style={{
              padding: "16px 20px",
              background: "#111827",
              borderBottom: "1px solid #334155",
              display: "flex",
              gap: "16px",
            }}
          >
            <NavLink
              to="/"
              style={({ isActive }) => ({
                color: isActive ? "#22d3ee" : "white",
                textDecoration: "none",
                fontWeight: "bold",
              })}
            >
              Market
            </NavLink>

            <NavLink
              to="/analysis"
              style={({ isActive }) => ({
                color: isActive ? "#22d3ee" : "white",
                textDecoration: "none",
                fontWeight: "bold",
              })}
            >
              Analysis
            </NavLink>
          </nav>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/analysis" element={<Analysis />} />
          </Routes>
        </div>
      </Router>
    </CryptoProvider>
  );
}

export default App;