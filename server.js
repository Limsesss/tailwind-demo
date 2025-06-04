import express from 'express';
import { Pool } from 'pg';
import path from 'path';
import { fileURLToPath } from 'url';

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

// Запуск сервера
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
