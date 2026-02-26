import { useCrypto } from "../context/CryptoContext";
import MarketChart from "../components/MarketChart";

const Analysis = () => {
  const { coins, currency, setCurrency } = useCrypto();

  const getSymbol = () => {
    if (currency === "usd") return "$";
    if (currency === "eur") return "€";
    if (currency === "php") return "₱";
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Market Analysis</h1>

      {/* Currency Selector */}
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        className="mb-4 p-2 rounded text-black"
      >
        <option value="usd">USD ($)</option>
        <option value="eur">EUR (€)</option>
        <option value="php">PHP (₱)</option>
      </select>

      {/* Summary */}
      <div className="bg-gray-800 p-4 rounded-xl mb-6">
        <p>Total Coins Loaded: {coins.length}</p>
        <p>Current Currency: {currency.toUpperCase()} ({getSymbol()})</p>
      </div>

      {/* Chart */}
      <MarketChart />
    </div>
  );
};

export default Analysis;