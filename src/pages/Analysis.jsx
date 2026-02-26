import { useCrypto } from "../context/CryptoContext";
import MarketChart from "../components/MarketChart";

const Analysis = () => {
  const { currency, setCurrency, loading, error } = useCrypto();

  if (loading)
    return <p className="text-center mt-10 text-white">Loading chart...</p>;

  if (error)
    return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Market Analysis</h1>

      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        className="mb-4 p-2 rounded text-black"
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