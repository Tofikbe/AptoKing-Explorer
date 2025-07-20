import React, { useState } from 'react';

export default function Tabs({ data }) {
  const [tab, setTab] = useState('stats');

  return (
    <div>
      {/* Tab Buttons */}
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', cursor: 'pointer' }}>
        <div onClick={() => setTab('stats')} style={{ fontWeight: tab === 'stats' ? 'bold' : 'normal' }}>Stats</div>
        <div onClick={() => setTab('volume')} style={{ fontWeight: tab === 'volume' ? 'bold' : 'normal' }}>Volume</div>
        <div onClick={() => setTab('market')} style={{ fontWeight: tab === 'market' ? 'bold' : 'normal' }}>Market Cap</div>
      </div>

      {/* Tab Content */}
      <div style={{ marginTop: '20px' }}>
        {tab === 'stats' && data && (
          <p>Current Price: ${data.market_data.current_price.usd}</p>
        )}
        {tab === 'volume' && data && (
          <p>24h Volume: ${data.market_data.total_volume.usd}</p>
        )}
        {tab === 'market' && data && (
          <p>Market Cap: ${data.market_data.market_cap.usd}</p>
        )}
      </div>
    </div>
  );
}
