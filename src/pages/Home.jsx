import { useState, useRef, useEffect } from "react";
import { useFetchCrypto } from "../hooks/useFetchCrypto";
import { useCrypto } from "../context/CryptoContext";

const Home = () => {
  const { loading, error } = useFetchCrypto();
  const { coins, currency, setCurrency } = useCrypto();

  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("market");
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

  const currencySymbol =
    currency === "usd" ? "$" :
    currency === "eur" ? "€" :
    "₱";

  const rates = {
    usd: 1,
    eur: 0.92,
    php: 56,
  };

  if (loading)
    return (
      <div style={styles.center}>
        <div style={styles.spinner}></div>
        <h2 style={styles.brand}>Crypto Pulse</h2>
        <p>Scanning blockchain...</p>
      </div>
    );

  if (error)
    return (
      <div style={styles.center}>
        <h2 style={{ color: "#ea3943" }}>⚠ {error}</h2>
        <p>Please try switching currency or refreshing.</p>
      </div>
    );

  return (
    <div style={styles.container}>

      <header style={styles.header}>
        <h1 style={styles.brand}>Crypto Pulse</h1>
        <p style={styles.subtitle}>Live market prices</p>
      </header>

      {/* MAIN CONTENT */}
      {activeTab === "market" && (
        <>
          <div style={styles.topBar}>
            <input
              ref={inputRef}
              type="text"
              placeholder="Search coin..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={styles.search}
            />

            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              style={styles.select}
            >
              <option value="usd">USD</option>
              <option value="eur">EUR</option>
              <option value="php">PHP</option>
            </select>
          </div>

          <div style={styles.grid}>
            {filteredCoins.map((coin) => {
              const isPositive = coin.price_change_percentage_24h >= 0;
              const convertedPrice = coin.current_price * rates[currency];

              return (
                <div key={coin.id} style={styles.card}>
                  <div style={styles.cardHeader}>
                    <h3 style={styles.coinName}>{coin.name}</h3>
                    <span style={styles.symbol}>({coin.symbol.toUpperCase()})</span>
                  </div>

                  <p style={styles.price}>
                    {currencySymbol}
                    {convertedPrice.toLocaleString()}
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
        </>
      )}

      {activeTab === "settings" && (
        <div style={styles.settings}>
          <h2>Settings</h2>
          <p>Currency: {currency.toUpperCase()}</p>
          <p>Theme: Dark</p>
        </div>
      )}

      {/* BOTTOM NAV */}
      <nav style={styles.bottomNav}>
        <button
          style={activeTab === "market" ? styles.navActive : styles.navButton}
          onClick={() => setActiveTab("market")}
        >
          📈 Market
        </button>

        <button
          style={activeTab === "settings" ? styles.navActive : styles.navButton}
          onClick={() => setActiveTab("settings")}
        >
          ⚙ Settings
        </button>
      </nav>
    </div>
  );
};

const styles = {
  container: {
    padding: "16px",
    backgroundColor: "#0f172a",
    minHeight: "100vh",
    color: "white",
    paddingBottom: "80px", // space for bottom nav
  },
  header: {
    textAlign: "center",
    marginBottom: "16px",
  },
  brand: {
    margin: 0,
    fontWeight: "700",
  },
  subtitle: {
    marginTop: "4px",
    color: "#94a3b8",
    fontSize: "14px",
  },
  topBar: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "20px",
  },
  search: {
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #334155",
    backgroundColor: "#1e293b",
    color: "white",
    outline: "none",
    width: "100%",
    fontSize: "16px",
  },
  select: {
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #334155",
    backgroundColor: "#1e293b",
    color: "white",
    outline: "none",
    width: "100%",
    fontSize: "16px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "12px",
  },
  card: {
    backgroundColor: "#1e293b",
    padding: "16px",
    borderRadius: "14px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.35)",
  },
  cardHeader: {
    display: "flex",
    flexWrap: "wrap",
    gap: "4px",
    alignItems: "baseline",
    marginBottom: "6px",
  },
  coinName: {
    margin: 0,
    fontSize: "18px",
  },
  symbol: {
    color: "#94a3b8",
    fontSize: "14px",
  },
  price: {
    fontSize: "18px",
    margin: "10px 0",
    wordBreak: "break-word",
  },
  settings: {
    padding: "20px",
    backgroundColor: "#1e293b",
    borderRadius: "14px",
  },
  bottomNav: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    height: "60px",
    backgroundColor: "#1e293b",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    borderTop: "1px solid #334155",
  },
  navButton: {
    background: "none",
    border: "none",
    color: "#94a3b8",
    fontSize: "16px",
  },
  navActive: {
    background: "none",
    border: "none",
    color: "#22d3ee",
    fontWeight: "bold",
    fontSize: "16px",
  },
  center: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0f172a",
    color: "white",
    textAlign: "center",
    padding: "16px",
  },
  spinner: {
    width: "45px",
    height: "45px",
    border: "5px solid #1e293b",
    borderTop: "5px solid #22d3ee",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    marginBottom: "16px",
  },
};

export default Home;