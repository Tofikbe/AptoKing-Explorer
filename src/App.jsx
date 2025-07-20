import React, { useState } from 'react';
import Tabs from './components/Tabs.jsx';
import AptosChart from './components/AptosChart.jsx';

export default function App() {
  const [activeTab, setActiveTab] = useState('price');

  return (
    <div style={{ maxWidth: 800, margin: '40px auto', fontFamily: 'Arial, sans-serif', padding: '0 16px' }}>
      <h1 style={{ textAlign: 'center' }}>Aptos Ecosystem Dashboard (Live)</h1>
      
      <Tabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Tab Content */}
      {activeTab === 'price' && <AptosChart />}
      {activeTab === 'tvl' && <div><h2>Total Value Locked (TVL)</h2><p>Coming soon...</p></div>}
      {activeTab === 'stablecoins' && <div><h2>Stablecoin Market</h2><p>Coming soon...</p></div>}
    </div>
  );
}
