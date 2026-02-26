import { useState, useRef, useEffect } from "react";
import { useFetchCrypto } from "../hooks/useFetchCrypto";
import { useCrypto } from "../context/CryptoContext";
import MarketChart from "../components/MarketChart";

const Home = () => {
  const { loading, error } = useFetchCrypto();
  const { coins } = useCrypto();

  const [search, setSearch] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (!loading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [loading]);

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  if (loading)
    return (
      <div style={styles.center}>
        <div style={styles.spinner}></div>
        <h2>Scanning Blockchain...</h2>
      </div>
    );

  if (error)
    return (
      <div style={styles.center}>
        <h2 style={{ color: "red" }}>Error: {error}</h2>
      </div>
    );

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Crypto Market</h1>

      <input
        ref={inputRef}
        type="text"
        placeholder="Search coin..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.search}
      />

      <div style={styles.grid}>
        {filteredCoins.map((coin) => {
          const isPositive = coin.price_change_percentage_24h >= 0;

          return (
            <div key={coin.id} style={styles.card}>
              <h3>
                {coin.name} ({coin.symbol.toUpperCase()})
              </h3>

              <p style={styles.price}>
                ${coin.current_price.toLocaleString()}
              </p>

              <p
                style={{
                  color: isPositive ? "#16c784" : "#ea3943",
                  fontWeight: "bold",
                }}
              >
                {coin.price_change_percentage_24h.toFixed(2)}%
              </p>
            </div>
          );
        })}
      </div>

      <MarketChart />
    </div>
  );
};

const styles = {
  container: {
    padding: "30px",
    backgroundColor: "#0f172a",
    minHeight: "100vh",
    color: "white",
  },
  title: {
    marginBottom: "20px",
  },
  search: {
    padding: "10px",
    width: "300px",
    marginBottom: "30px",
    borderRadius: "8px",
    border: "none",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
  },
  card: {
    backgroundColor: "#1e293b",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
  },
  price: {
    fontSize: "18px",
    margin: "10px 0",
  },
  center: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0f172a",
    color: "white",
  },
  spinner: {
    width: "50px",
    height: "50px",
    border: "5px solid #1e293b",
    borderTop: "5px solid #22d3ee",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    marginBottom: "20px",
  },
};

export default Home;