import { useState, useRef, useEffect } from "react";
import { useFetchCrypto } from "../hooks/useFetchCrypto";
import { useCrypto } from "../context/CryptoContext";

const Home = () => {
  const { loading, error } = useFetchCrypto();
  const { coins } = useCrypto();

  const [search, setSearch] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <h2>Scanning Blockchain...</h2>;
  if (error) return <h2>Error: {error}</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Search coin..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ul>
        {filteredCoins.map((coin) => (
          <li key={coin.id}>
            {coin.name} - ${coin.current_price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;