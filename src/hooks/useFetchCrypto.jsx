import { useState, useEffect } from "react";
import { useCrypto } from "../context/CryptoContext";

export const useFetchCrypto = () => {
  const { setCoins, currency } = useCrypto();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchMarket = async () => {
      try {
        setLoading(true);
        setError(null);

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 10000);

        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=10&page=1&sparkline=false`,
          {
            headers: { Accept: "application/json" },
            signal: controller.signal,
          }
        );

        clearTimeout(timeout);

        if (!response.ok) {
          throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();

        if (!data || data.length === 0) {
          throw new Error("No data received from API");
        }

        if (isMounted) {
          setCoins(data);
          setLoading(false);
        }
      } catch (err) {
        console.error("FETCH ERROR:", err);

        if (isMounted) {
          setError(
            err.name === "AbortError"
              ? "Request timed out. Please check your connection."
              : "Network error while fetching crypto data."
          );
          setLoading(false);
        }
      }
    };

    fetchMarket();

    return () => {
      isMounted = false;
    };
  }, [currency, setCoins]);

  return { loading, error };
};