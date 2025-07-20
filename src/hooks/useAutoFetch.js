import { useEffect, useState } from 'react';

export function useAutoFetch(url, { intervalMs = 60000, requestInit, transform } = {}) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  async function fetchData() {
    try {
      const res = await fetch(url, requestInit);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setData(transform ? transform(json) : json);
      setLastUpdated(Date.now());
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  }

  useEffect(() => {
    fetchData();
    const id = setInterval(fetchData, intervalMs);
    return () => clearInterval(id);
  }, [url]);

  return { data, error, lastUpdated };
}
