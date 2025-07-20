import { useEffect, useRef, useState } from 'react'

export function useAutoFetch(
  url,
  {
    intervalMs = 60000,
    transform = (d) => d,
    enabled = true,
    requestInit = {},
  } = {}
) {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [lastUpdated, setLastUpdated] = useState(null)
  const timerRef = useRef(null)

  async function load() {
    if (!enabled) return
    try {
      const res = await fetch(url, requestInit)
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
      const json = await res.json()
      const out = transform(json)
      setData(out)
      setLastUpdated(Date.now())
      setError(null)
    } catch (e) {
      setError(e.message)
    }
  }

  useEffect(() => {
    load() // first fetch immediately
    if (!enabled) return
    timerRef.current = setInterval(load, intervalMs)
    return () => clearInterval(timerRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, intervalMs, enabled])

  return { data, error, lastUpdated, reload: load }
}
