// routes/auth.js
import { Router } from 'express';
import bcrypt from 'bcryptjs';

const router = Router();

export default (pool) => {
  // Регистрация
  router.post('/register', async (req, res) => {
    const { email, name, password } = req.body;

    if (!email || !name || !password)
      return res.status(400).json({ error: 'Все поля обязательны' });

    try {
      // Проверка, есть ли пользователь
      const existing = await pool.query('SELECT id FROM "User" WHERE email = $1', [email]);
      if (existing.rows.length > 0)
        return res.status(400).json({ error: 'Email уже зарегистрирован' });

      // Хеширование пароля
      const hashed = await bcrypt.hash(password, 10);

      // Сохраняем в БД
      const result = await pool.query(
        'INSERT INTO "User" (email, name, password) VALUES ($1, $2, $3) RETURNING id, email, name, "createdAt"',
        [email, name, hashed]
      );

      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error('Ошибка при регистрации:', err);
      res.status(500).json({ error: 'Ошибка регистрации' });
    }
  });

  // Авторизация
  router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ error: 'Email и пароль обязательны' });

    try {
      const result = await pool.query('SELECT * FROM "User" WHERE email = $1', [email]);
      const user = result.rows[0];

      if (!user) return res.status(404).json({ error: 'Пользователь не найден' });

      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(403).json({ error: 'Неверный пароль' });

      // Можно вернуть токен или просто данные (временно)
      res.json({
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
      });
    } catch (err) {
      console.error('Ошибка при входе:', err);
      res.status(500).json({ error: 'Ошибка входа' });
    }
  });

  return router;
};
