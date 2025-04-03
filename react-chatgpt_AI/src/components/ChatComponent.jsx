import React, { useState } from 'react';

const ChatComponent = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    // Replace 'YOUR_API_KEY' with your actual ChatGPT API key
    const apiKey = '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';
    const apiUrl = 'https://api.openai.com/v1/chat/completions';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: input },
          ],
        }),
      });

      const data = await response.json();     
      setMessages([...messages, { role: 'assistant', content: data.choices[0].message.content }]);
      setInput('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      <ul>
        {messages.map((message, index) => (
          <li key={index} className={message.role}>
            {message.content}
          </li>
        ))}
      </ul>
      <div>
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
        <button onClick={sendMessage}> Send </button>
      </div>
    </div>
  );
}

export default ChatComponent;

