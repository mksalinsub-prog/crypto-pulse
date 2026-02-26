import { useState, useEffect } from "react";
import { useCrypto } from "../context/CryptoContext";

export const useFetchCrypto = () => {
  const { setCoins, currency } = useCrypto();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMarket = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=10&page=1`,
          {
            headers: {
              Accept: "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();

        if (!data || data.length === 0) {
          throw new Error("No data received from API");
        }

        setCoins(data);
        setLoading(false);
      } catch (err) {
        console.error("FETCH ERROR:", err);
        setError("Network error while fetching crypto data.");
        setLoading(false);
      }
    };

    fetchMarket();
  }, [currency, setCoins]);

  return { loading, error };
};