import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { CryptoProvider } from "./context/CryptoContext";
import Home from "./pages/Home";
import Analysis from "./pages/Analysis";

function App() {
  return (
    <CryptoProvider>
      <Router>
        <nav className="bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 text-white shadow-xl">
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-extrabold tracking-widest text-cyan-400">
              CRYPTO•PULSE
            </h1>

            <div className="flex gap-8 text-lg font-medium">
              <Link to="/" className="hover:text-cyan-400 transition">
                Market
              </Link>
              <Link to="/analysis" className="hover:text-cyan-400 transition">
                Analysis
              </Link>
            </div>
          </div>
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