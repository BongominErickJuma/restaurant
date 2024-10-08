import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (url, options) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!url) return;

    console.log(url);
    const fetchData = async () => {
      setLoading(true);
      try {
        const config = {
          url,
          method: options.method || "GET",
          headers: options.headers || {},
        };

        // Only add data to config if the method is POST, PUT, etc.
        if (options.method && options.method !== "GET") {
          config.data = options.body || null;
        }

        const response = await axios(config);
        setData(response.data);
        setError(null);
      } catch (err) {
        // Handle axios' error structure
        console.log(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, JSON.stringify(options)]); // Stringify options to prevent unnecessary re-fetches

  return { data, error, loading };
};

export default useFetch;
