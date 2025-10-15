import React, { useState } from 'react';
import TypingDots from './typingdots';
import ToolPanel from './toolpanel';
import { getApiKey } from '../utils/apirouter';
import './ChatLayout.css';

export default function ChatLayout() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showTools, setShowTools] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedToolId, setSelectedToolId] = useState('chatbot'); // default tool

  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: 'user', text: input }]);
    setInput('');
    setLoading(true);

    const apiKey = getApiKey(selectedToolId);

    try {
      const res = await fetch('https://your-api-endpoint.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({ prompt: input })
      });

      const data = await res.json();
      setMessages((prev) => [...prev, { role: 'ai', text: data.reply }]);
    } catch {
      setMessages((prev) => [...prev, { role: 'ai', text: 'Error from Gemini.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-layout">
      {sidebarOpen && (
        <div className="sidebar">
          <img src="/logo.png" alt="Orbnyt" className="logo" />
          <button className="tools-btn" onClick={() => setShowTools(!showTools)}>Tools</button>
          <button className="close-sidebar" onClick={() => setSidebarOpen(false)}>×</button>
        </div>
      )}

      {!sidebarOpen && (
        <button className="open-sidebar" onClick={() => setSidebarOpen(true)}>☰</button>
      )}

      <div className="chat-window">
        {messages.map((msg, i) => (
          <div key={i} className={`bubble ${msg.role}`}>{msg.text}</div>
        ))}
        {loading && <TypingDots />}
        <div className="input-area">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>

      {showTools && (
        <ToolPanel
          onSelect={(toolId) => {
            setSelectedToolId(toolId);
            setShowTools(false);
          }}
        />
      )}
    </div>
  );
}