import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { CryptoProvider } from './context/CryptoContext';
import Home from './pages/Home';
import Analysis from './pages/Analysis';

function App() {
  return (
    <CryptoProvider>
      <BrowserRouter>
        <nav>
          <Link to="/">Market</Link> | 
          <Link to="/analysis">Analysis</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analysis" element={<Analysis />} />
        </Routes>
      </BrowserRouter>
    </CryptoProvider>
  );
}

export default App;