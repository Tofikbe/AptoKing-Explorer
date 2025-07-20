import React, { useState } from 'react';

export default function AIAgent() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    // Mock AI Response
    const response = `AI Agent: Currently I can give Aptos updates like APT price, TVL, stablecoin market cap (real-time data will come soon).`;

    setMessages([...newMessages, { sender: 'ai', text: response }]);
    setLoading(false);
  };

  return (
    <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '16px', marginTop: '20px' }}>
      <h2>Aptos AI Agent</h2>
      <div style={{ minHeight: '150px', maxHeight: '300px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px', borderRadius: '4px' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left', margin: '8px 0' }}>
            <strong>{msg.sender === 'user' ? 'You' : 'AI'}:</strong> {msg.text}
          </div>
        ))}
        {loading && <p>AI is typing...</p>}
      </div>
      <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ flex: 1, padding: '8px' }}
          placeholder="Ask about Aptos ecosystem..."
        />
        <button onClick={sendMessage} style={{ padding: '8px 16px' }}>Send</button>
      </div>
    </div>
  );
}
