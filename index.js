require('dotenv').config();
import React, { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleSubmit = async () => {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input })
    });
    const data = await res.json();
    setOutput(data.reply);
  };

  return (
    <div>
      <h1>AIChatBabu</h1>
      <input value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={handleSubmit}>Send</button>
      <p>{output}</p>
    </div>
  );
}
