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

const Analysis = () => {
  const { coins, currency } = useCrypto();

  const chartData = coins.map((coin) => ({
    name: coin.symbol.toUpperCase(),
    price: coin.current_price,
  }));

  const currencySymbol =
    currency === "usd" ? "$" :
    currency === "eur" ? "€" :
    "₱";

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📊 Crypto Pulse Analysis</h1>

      <div style={styles.card}>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="name" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip
              formatter={(value) =>
                `${currencySymbol}${Number(value).toLocaleString()}`
              }
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "none",
                borderRadius: "10px",
              }}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#22d3ee"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "40px",
    backgroundColor: "#0f172a",
    minHeight: "100vh",
    color: "white",
  },
  title: {
    marginBottom: "30px",
  },
  card: {
    backgroundColor: "#1e293b",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.4)",
  },
};

export default Analysis;