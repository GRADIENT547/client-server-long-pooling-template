import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  // Загрузка сообщений при монтировании
  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get('http://localhost:5000/messages');
      setMessages(response.data);
    } catch (error) {
      console.error('Ошибка загрузки сообщений:', error);
    }
  };

  const sendMessage = async () => {
    if (!inputText.trim()) return;
    
    try {
      await axios.post('http://localhost:5000/messages', {
        text: inputText
      });
      setInputText('');
      fetchMessages(); // Обновляем список сообщений
    } catch (error) {
      console.error('Ошибка отправки:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Простой чат</h1>
      <div>
        {messages.map((msg) => (
          <div key={msg.id} style={{ margin: '10px', padding: '10px', border: '1px solid #ccc' }}>
            <p>{msg.text}</p>
            <small>{new Date(msg.timestamp).toLocaleTimeString()}</small>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Введите сообщение..."
      />
      <button onClick={sendMessage}>Отправить</button>
    </div>
  );
};

export default Chat;