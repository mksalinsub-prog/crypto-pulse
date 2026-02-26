import { useCrypto } from "../context/CryptoContext";
import MarketChart from "../components/MarketChart";

const Analysis = () => {
  const { coins } = useCrypto();

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Market Analysis</h1>

      <p className="mb-4">
        Total Coins Loaded: {coins.length}
      </p>

      <MarketChart />
    </div>
  );
};

export default Analysis;