import { createContext, useState, useContext, useEffect } from "react";

const CryptoContext = createContext();

export const CryptoProvider = ({ children }) => {
  const [coins, setCoins] = useState([]);
  const [currency, setCurrency] = useState("usd");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMarket = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=10&page=1`
        );

        if (!res.ok) throw new Error("The Market is closed (API Error)");

        const data = await res.json();
        setCoins(data);

        setTimeout(() => setLoading(false), 500);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMarket();
  }, [currency]);

  return (
    <CryptoContext.Provider
      value={{ coins, currency, setCurrency, loading, error }}
    >
      {children}
    </CryptoContext.Provider>
  );
};

export const useCrypto = () => useContext(CryptoContext);