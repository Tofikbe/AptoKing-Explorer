import React, { useEffect, useState } from 'react'

function App() {
  const [aptPrice, setAptPrice] = useState(null)
  const [aptMcap, setAptMcap] = useState(null)
  const [tvl, setTvl] = useState(null)
  const [usdcPrice, setUsdcPrice] = useState(null)
  const [error, setError] = useState(null)

  const fmt = (n) => n ? n.toLocaleString() : '…'

  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/coins/aptos')
      .then(r => r.json())
      .then(data => {
        setAptPrice(data.market_data.current_price.usd)
        setAptMcap(data.market_data.market_cap.usd)
      })
      .catch(e => setError(e.message))

    fetch('https://api.llama.fi/tvl/aptos')
      .then(r => r.json())
      .then(data => setTvl(data))
      .catch(e => setError(e.message))

    fetch('https://api.coingecko.com/api/v3/simple/price?ids=usd-coin&vs_currencies=usd')
      .then(r => r.json())
      .then(data => setUsdcPrice(data['usd-coin'].usd))
      .catch(e => setError(e.message))
  }, [])

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>Aptos Ecosystem Dashboard</h1>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      <div style={cardStyle}>
        <h2>APT Token</h2>
        <p>Price: {aptPrice ? `$${aptPrice}` : 'Loading…'}</p>
        <p>Market Cap: {aptMcap ? `$${fmt(aptMcap)}` : 'Loading…'}</p>
      </div>

      <div style={cardStyle}>
        <h2>Total Value Locked</h2>
        <p>{tvl ? `$${fmt(tvl)}` : 'Loading…'}</p>
      </div>

      <div style={cardStyle}>
        <h2>USDC Stablecoin</h2>
        <p>Price: {usdcPrice ? `$${usdcPrice}` : 'Loading…'}</p>
      </div>
    </div>
  )
}

const cardStyle = {
  background: '#fff',
  padding: '16px',
  marginTop: '20px',
  borderRadius: '8px',
  boxShadow: '0 1px 4px rgba(0,0,0,0.1)'
}

export default App
