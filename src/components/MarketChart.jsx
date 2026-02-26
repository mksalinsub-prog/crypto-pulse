import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { useCrypto } from "../context/CryptoContext";

const MarketChart = () => {
  const { coins, currency } = useCrypto();

  const chartData = coins.map((coin) => ({
    name: coin.symbol.toUpperCase(),
    price: coin.current_price
  }));

  return (
    <div className="h-80 w-full p-4 bg-gray-800 rounded-xl mt-6">
      <h2 className="text-white mb-4">
        Price Comparison ({currency.toUpperCase()})
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <XAxis dataKey="name" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip />
          <Bar dataKey="price" fill="#22d3ee" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MarketChart;