import React from "react";

export default function Tabs({ activeTab, onTabChange }) {
  const tabs = [
    { key: "price", label: "APT Price" },
    { key: "tvl", label: "TVL" },
    { key: "chain", label: "Chain Activity" },
    { key: "ecosystem", label: "Projects" },
    { key: "twitter", label: "Twitter" },
  ];

  return (
    <div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
      {tabs.map(tab => (
        <button
          key={tab.key}
          onClick={() => onTabChange(tab.key)}
          style={{
            margin: "0 5px",
            padding: "10px 20px",
            borderRadius: "6px",
            border: activeTab === tab.key ? "2px solid #0070f3" : "1px solid #ccc",
            background: activeTab === tab.key ? "#0070f3" : "#fff",
            color: activeTab === tab.key ? "#fff" : "#333",
            cursor: "pointer"
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
