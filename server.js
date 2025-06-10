import express from 'express';
import { Pool } from 'pg';
import path from 'path';
import { fileURLToPath } from 'url';

import inquiryRoutes from './routes/inquiry.js';
import profileRoutes from './routes/profile.js';
import ordersRoutes from './routes/orders.js';
import cartRoutes from './routes/cart.js';
import authRoutes from './routes/auth.js';

const app = express();

// Получаем текущую директорию
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Подключение к базе данных
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

app.use(express.json());

app.use('/api/inquiry', inquiryRoutes(pool));
app.use('/api/profile', profileRoutes(pool));
app.use('/api/orders', ordersRoutes(pool));
app.use('/api/cart', cartRoutes(pool));
app.use('/api/auth', authRoutes(pool));

// Тестовый маршрут для проверки подключения к БД
app.get('/api/test', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ now: result.rows[0].now });
  } catch (err) {
    console.error('DB Error:', err);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

// Статические файлы клиента
const clientDistPath = path.join(__dirname, 'client', 'dist');
app.use(express.static(clientDistPath));

// Поддержка client-side routing (например, React Router)
app.get('*', (req, res) => {
  res.sendFile(path.join(clientDistPath, 'index.html'));
});
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

// Запуск сервера
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
app.post('/api/inquiry', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Все поля обязательны' });
  }

  try {
    await pool.query(
      'INSERT INTO inquiries (name, email, message, created_at) VALUES ($1, $2, $3, NOW())',
      [name, email, message]
    );

    res.status(201).json({ success: true });
  } catch (err) {
    console.error('Ошибка при добавлении заявки:', err);
    res.status(500).json({ error: 'Ошибка при сохранении заявки' });
  }
});
app.get('/api/inquiries', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM inquiries ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Ошибка получения заявок:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});
