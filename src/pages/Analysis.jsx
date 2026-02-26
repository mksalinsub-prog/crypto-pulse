import { useCrypto } from "../context/CryptoContext";
import MarketChart from "../components/MarketChart";

const Analysis = () => {
  const { currency, setCurrency, loading, error } = useCrypto();

  if (loading)
    return <p className="text-center mt-10 text-white">Loading chart...</p>;

  if (error)
    return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 text-white">
      <h1 className="text-2xl font-bold mb-6">Market Analysis</h1>

      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        className="mb-6 px-4 py-2 rounded-lg bg-slate-800 border border-slate-600 focus:ring-2 focus:ring-cyan-400"
      >
        <option value="usd">USD ($)</option>
        <option value="eur">EUR (€)</option>
        <option value="php">PHP (₱)</option>
      </select>

      <MarketChart />
    </div>
  );
};

export default Analysis;