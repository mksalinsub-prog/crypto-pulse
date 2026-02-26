import { useRef, useEffect } from "react";
import { useCrypto } from "../context/CryptoContext";
import { useLocalStorage } from "../hooks/useLocalStorage";

const Home = () => {
  const { coins, currency, setCurrency, loading, error } = useCrypto();

  const [search, setSearch] = useLocalStorage("searchQuery", "");

  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
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
    <div className="p-6 text-white">
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        className="mb-4 p-2 rounded text-black"
      >
        <option value="usd">USD ($)</option>
        <option value="eur">EUR (€)</option>
        <option value="php">PHP (₱)</option>
      </select>

      <input
        ref={inputRef}
        type="text"
        placeholder="Search coin..."
        className="w-full p-2 rounded mb-6 text-black"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid md:grid-cols-2 gap-4">
        {filteredCoins.map((coin) => (
          <div key={coin.id} className="bg-gray-800 p-4 rounded-xl shadow">
            <h3 className="text-lg font-bold">{coin.name}</h3>

            <p>
              Price: {getSymbol()} {coin.current_price}
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