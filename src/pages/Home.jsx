import { useRef, useEffect } from "react";
import { useCrypto } from "../context/CryptoContext";
import { useLocalStorage } from "../hooks/useLocalStorage";

const Home = () => {
  const { coins, currency, setCurrency, loading, error } = useCrypto();
  const [search, setSearch] = useLocalStorage("searchQuery", "");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const getSymbol = () => {
    if (currency === "usd") return "$";
    if (currency === "eur") return "€";
    if (currency === "php") return "₱";
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading)
    return <p className="text-center mt-10 text-white">Scanning Blockchain...</p>;

  if (error)
    return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 text-white">
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        className="mb-6 px-4 py-2 rounded-lg bg-slate-800 border border-slate-600 focus:ring-2 focus:ring-cyan-400"
      >
        <option value="usd">USD ($)</option>
        <option value="eur">EUR (€)</option>
        <option value="php">PHP (₱)</option>
      </select>

      <input
        ref={inputRef}
        type="text"
        placeholder="Search coin..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 rounded-lg bg-slate-800 border border-slate-600 mb-8 focus:ring-2 focus:ring-cyan-400"
      />

      <div className="grid md:grid-cols-2 gap-6">
        {filteredCoins.map((coin) => (
          <div
            key={coin.id}
            className="bg-slate-800/70 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:scale-105 transition duration-300"
          >
            <h3 className="text-xl font-bold mb-2">{coin.name}</h3>

            <p className="text-lg">
              Price: {getSymbol()} {coin.current_price.toLocaleString()}
            </p>

            <p
              className={
                coin.price_change_percentage_24h >= 0
                  ? "text-green-400"
                  : "text-red-400"
              }
            >
              24h: {coin.price_change_percentage_24h.toFixed(2)}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;