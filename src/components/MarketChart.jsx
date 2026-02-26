import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useCrypto } from "../context/CryptoContext";

const MarketChart = () => {
  const { coins, currency } = useCrypto();

  const getSymbol = () => {
    if (currency === "usd") return "$";
    if (currency === "eur") return "€";
    if (currency === "php") return "₱";
  };

  const chartData = coins.map((coin) => ({
    name: coin.symbol.toUpperCase(),
    price: coin.current_price,
  }));

  return (
    <div className="h-96 w-full p-6 bg-slate-800/70 backdrop-blur-md rounded-2xl shadow-xl mt-8">
      <h2 className="text-white mb-4 text-xl font-semibold">
        Market Trend ({currency.toUpperCase()} {getSymbol()})
      </h2>

      <ResponsiveContainer>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip formatter={(value) => `${getSymbol()} ${value}`} />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#10b981"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MarketChart;