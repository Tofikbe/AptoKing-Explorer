import React, { useMemo, useEffect } from 'react';
import { useAutoFetch } from './hooks/useAutoFetch';

const cgUrl = () =>
  'https://api.coingecko.com/api/v3/simple/price?' +
  new URLSearchParams({
    ids: 'aptos,usd-coin',
    vs_currencies: 'usd',
    include_market_cap: 'true',
    include_24hr_change: 'true',
  }).toString();

const defillamaUrl = 'https://api.llama.fi/tvl/aptos';

const indexerUrl = 'https://indexer.mainnet.aptoslabs.com/v1/graphql';
const indexerBody = JSON.stringify({
  query: `
    query ChainStats {
      user_transactions_aggregate { aggregate { count } }
      processor_status(where: {processor: {_eq: "transaction_processor"}}) {
        last_success_version
        last_transaction_timestamp
      }
    }
  `,
});

const fmt = (n, maxFrac = 2) =>
  n == null ? '…' : Number(n).toLocaleString(undefined, { maximumFractionDigits: maxFrac });

export default function App() {
  const { data: cgData, error: cgErr, lastUpdated: cgUpdated } = useAutoFetch(cgUrl(), { intervalMs: 60000 });
  const { data: tvlData, error: tvlErr, lastUpdated: tvlUpdated } = useAutoFetch(defillamaUrl, { intervalMs: 300000 });
  const { data: chainData, error: chainErr, lastUpdated: chainUpdated } = useAutoFetch(indexerUrl, {
    intervalMs: 60000,
    requestInit: {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: indexerBody,
    },
    transform: (d) => d?.data,
  });

  useEffect(() => {
    console.log("CoinGecko Data:", cgData);
    console.log("TVL Data:", tvlData);
    console.log("Chain Data:", chainData);
  }, [cgData, tvlData, chainData]);

  const aptPrice = cgData?.aptos?.usd;
  const aptMcap = cgData?.aptos?.usd_market_cap;
  const usdcPrice = cgData?.['usd-coin']?.usd;
  const tvl = tvlData;
  const txCount = chainData?.user_transactions_aggregate?.aggregate?.count;
  const lastChainTs = chainData?.processor_status?.[0]?.last_transaction_timestamp;

  const latestUpdated = useMemo(() => Math.max(cgUpdated ?? 0, tvlUpdated ?? 0, chainUpdated ?? 0) || null, [
    cgUpdated, tvlUpdated, chainUpdated
  ]);

  return (
    <div style={{ maxWidth: 700, margin: '40px auto', fontFamily: 'Inter, Arial, sans-serif', padding: '0 16px' }}>
      <h1 style={{ textAlign: 'center' }}>Aptos Ecosystem Dashboard (Live)</h1>

      {(cgErr || tvlErr || chainErr) && (
        <div style={{ background: '#ffe5e5', color: '#b00020', padding: 8, borderRadius: 6, marginBottom: 16 }}>
          {cgErr && <div>CoinGecko error: {cgErr}</div>}
          {tvlErr && <div>DeFiLlama error: {tvlErr}</div>}
          {chainErr && <div>Aptos Indexer error: {chainErr}</div>}
        </div>
      )}

      <StatCard title="APT Token">
        <p>Price (USD): <strong>{aptPrice ? `$${fmt(aptPrice, 4)}` : 'Fetching…'}</strong></p>
        <p>Market Cap: <strong>{aptMcap ? `$${fmt(aptMcap)}` : 'Fetching…'}</strong></p>
      </StatCard>

      <StatCard title="USDC Stablecoin">
        <p>Price: <strong>{usdcPrice ? `$${fmt(usdcPrice, 4)}` : 'Fetching…'}</strong></p>
      </StatCard>

      <StatCard title="Total Value Locked (TVL)">
        <p><strong>{tvl ? `$${fmt(tvl)}` : 'Fetching…'}</strong></p>
      </StatCard>

      <StatCard title="Chain Activity">
        <p>Total User Transactions: <strong>{txCount ? fmt(txCount, 0) : 'Fetching…'}</strong></p>
        <p>Last Tx Timestamp: <strong>{lastChainTs ?? 'Fetching…'}</strong></p>
      </StatCard>

      <p style={{ marginTop: 40, fontSize: 12, opacity: 0.7, textAlign: 'center' }}>
        {latestUpdated ? `Last updated: ${new Date(latestUpdated).toLocaleTimeString()}` : 'Updating…'}
      </p>
    </div>
  );
}

function StatCard({ title, children }) {
  return (
    <section style={{
      background: '#fff',
      padding: '16px 20px',
      marginTop: '20px',
      borderRadius: '8px',
      boxShadow: '0 1px 4px rgba(0,0,0,0.08)'
    }}>
      <h2 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>{title}</h2>
      {children}
    </section>
  );
}
