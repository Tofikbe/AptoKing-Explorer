import { useEffect, useState } from 'react';

export function useAutoFetch(url, { intervalMs = 60000, requestInit = {}, transform } = {}) {
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
    } catch (e) {
      setError(e.message);
    }
  }

  useEffect(() => {
    fetchData();
    const timer = setInterval(fetchData, intervalMs);
    return () => clearInterval(timer);
  }, [url, JSON.stringify(requestInit), intervalMs]);

  return { data, error, lastUpdated };
}
