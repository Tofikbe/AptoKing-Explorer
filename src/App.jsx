import React, { useState } from 'react';
import Tabs from './components/Tabs.jsx';
import AptosChart from './components/AptosChart.jsx';
import AIAgent from './components/AIAgent.jsx';

export default function App() {
  const [activeTab, setActiveTab] = useState('price');

  return (
    <div style={{ maxWidth: 800, margin: '40px auto', fontFamily: 'Arial, sans-serif', padding: '0 16px' }}>
      <h1 style={{ textAlign: 'center' }}>Aptos Ecosystem Dashboard (Live)</h1>
      
      {/* Tabs Section */}
      <Tabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Tab Content */}
      {activeTab === 'price' && <AptosChart />}
      {activeTab === 'tvl' && (
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
          <h2>Total Value Locked (TVL)</h2>
          <p>Coming soon...</p>
        </div>
      )}
      {activeTab === 'stablecoins' && (
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
          <h2>Stablecoin Market</h2>
          <p>Coming soon...</p>
        </div>
      )}

      {/* AI Agent Section */}
      <AIAgent />
    </div>
  );
}
