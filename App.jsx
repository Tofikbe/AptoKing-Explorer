import React, { useEffect, useState } from 'react'

const fetchData = async (url) => {
  const res = await fetch(url)
  return await res.json()
}

export default function App() {
  const [tokens, setTokens] = useState([])

  useEffect(() => {
    fetchData('https://api.movemarketcap.com/v1/tokens?chain=aptos')
      .then(data => setTokens(data.tokens || []))
  }, [])

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>AptoKing Explorer</h1>
      <ul>
        {tokens.map((token) => (
          <li key={token.symbol}>
            {token.name} — {token.symbol} — {token.priceUsd} USD
          </li>
        ))}
      </ul>
    </div>
  )
}
