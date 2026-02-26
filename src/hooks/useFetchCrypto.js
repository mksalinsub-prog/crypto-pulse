import { useState, useEffect, useCallback } from "react";
import { useCrypto } from "../context/CryptoContext";

export const useFetchCrypto = () => {
  const { setCoins, currency } = useCrypto();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Define fetchMarket with useCallback so it has a stable reference
  const fetchMarket = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=10&page=1`
      );

      if (!res.ok) throw new Error("API Error");

      const data = await res.json();
      setCoins(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [currency, setCoins]);

  // Call fetchMarket once when currency changes
  useEffect(() => {
    fetchMarket();
  }, [fetchMarket]);

  return { loading, error };
};