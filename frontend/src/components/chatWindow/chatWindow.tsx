import React, { useState } from 'react';
import './chatWindow.css';

function formatAIText(text: string) {
  // Try to pretty-print JSON, else return as plain text with line breaks
  try {
    const obj = JSON.parse(text);
    return <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(obj, null, 2)}</pre>;
  } catch {
    return <pre style={{ whiteSpace: 'pre-wrap' }}>{text}</pre>;
  }
}

const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<{ sender: 'user' | 'ai', text: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: 'user', text: input }]);
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('access_token');
      const payload = { content: input }; // Always send a valid JSON object
      //console.log("DEBUG: Sending payload to backend:", payload); // Add this line
      const response = await fetch('http://localhost:8000/core/chat/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify(payload), // Ensure this is a stringified JSON
      });
      const data = await response.json();
      //console.log("DEBUG: Received response from backend:", data); // Log the backend response
      let aiText = '';
      if (typeof data === 'string') {
        aiText = data;
      } else if (data && typeof data.response === 'string') {
        aiText = data.response;
      } else if (data && typeof data.summary === 'string') {
        aiText = data.summary;
      } else {
        aiText = JSON.stringify(data);
      }
      if (response.ok) {
        setMessages(msgs => [...msgs, { sender: 'ai', text: aiText }]);
      } else {
        setError(data.error || 'Error from server');
      }
    } catch (err) {
      setError('Network error');
    }
    setInput('');
    setLoading(false);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !loading) {
      handleSend();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <span className="chat-tab">CHAT</span>
      </div>
      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`chat-message ${msg.sender}`}>
            {msg.sender === 'ai' ? formatAIText(msg.text) : <span>{msg.text}</span>}
          </div>
        ))}
        {loading && <div className="chat-message ai">Thinking...</div>}
      </div>
      <div className="chat-input-section">
        <input
          type="text"
          className="chat-input"
          placeholder="Start typing..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleInputKeyDown}
          disabled={loading}
        />
        <div className="chat-footer">
          <button className="chat-send-btn" onClick={handleSend} disabled={loading || !input.trim()}>
            <img src="send.png" alt="Send" className="send-button" />
          </button>
        </div>
        {error && <div className="chat-error">{error}</div>}
      </div>
    </div>
  );
};

export default ChatWindow;
