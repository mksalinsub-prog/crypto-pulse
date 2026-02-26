import { useRef, useEffect } from "react";
import { useCrypto } from "../context/CryptoContext";

const Home = () => {
  const { coins, currency, setCurrency, loading, error } = useCrypto();
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const getSymbol = () => {
    if (currency === "usd") return "$";
    if (currency === "eur") return "€";
    if (currency === "php") return "₱";
  };

  if (loading)
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] text-white">
        <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-xl font-semibold tracking-wide">
          ⛓️ Scanning Blockchain...
        </p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-[60vh] text-red-500 text-xl">
        {error}
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-6 text-white">
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        className="mb-6 px-4 py-2 rounded-lg bg-slate-800 border border-slate-600"
      >
        <option value="usd">USD ($)</option>
        <option value="eur">EUR (€)</option>
        <option value="php">PHP (₱)</option>
      </select>

      <input
        ref={inputRef}
        type="text"
        placeholder="Search coin..."
        className="w-full p-3 rounded-lg bg-slate-800 border border-slate-600 mb-8"
      />

      <div className="grid md:grid-cols-2 gap-6">
        {coins.map((coin) => (
          <div
            key={coin.id}
            className="bg-slate-800/70 p-6 rounded-2xl shadow-lg hover:scale-105 transition"
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