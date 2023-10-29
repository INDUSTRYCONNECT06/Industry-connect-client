
import { useEffect, useState } from "react";

const useFetch = ( url, method, requestConfig ) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    const fetchData = async () => {
      try {
        let response = await fetch(url, {
          method: method.toLowerCase(),
          ...requestConfig, // body or headers if req
        });

        let data = await response.json();
        setData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // claenup useeffect
    return () => {
      controller.abort();
    };
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
