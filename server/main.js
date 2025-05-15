const express = require('express');
const cors = require('cors'); // Для разрешения跨域请求
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let messages = []; // Хранилище сообщений

// Получить все сообщения
app.get('/messages', (req, res) => {
  res.json(messages);
});

// Отправить новое сообщение
app.post('/messages', (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).send('Текст сообщения обязателен');
  
  const newMessage = {
    id: Date.now(),
    text,
    timestamp: new Date().toISOString()
  };
  
  messages.push(newMessage);
  res.status(201).json(newMessage);
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
