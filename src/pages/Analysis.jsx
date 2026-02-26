import { useCrypto } from "../context/CryptoContext";

const Analysis = () => {
  const { currency, setCurrency } = useCrypto();

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl mb-4">Settings</h2>

      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        className="p-2 text-black rounded"
      >
        <option value="usd">USD</option>
        <option value="eur">EUR</option>
        <option value="php">PHP</option>
      </select>
    </div>
  );
};

export default Analysis;