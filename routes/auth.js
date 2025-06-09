// routes/auth.js
import express from 'express';
import bcrypt from 'bcrypt';

const router = express.Router();

export default (pool) => {
  router.post('/register', async (req, res) => {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Все поля обязательны' });
    }

    try {
      // Проверка на существующего пользователя
      const existing = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
      if (existing.rows.length > 0) {
        return res.status(400).json({ error: 'Пользователь уже существует' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      // Вставка нового пользователя
      const result = await pool.query(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
        [name, email, hashedPassword]
      );

      const user = result.rows[0];
      res.status(201).json({ user }); // <-- важно, чтобы поле `user` присутствовало
    } catch (err) {
      console.error('Ошибка регистрации:', err);
      res.status(500).json({ error: 'Ошибка сервера при регистрации' });
    }
  });

  router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
      const result = await pool.query('SELECT id, name, email, password FROM users WHERE email = $1', [email]);

      if (result.rows.length === 0) {
        return res.status(400).json({ error: 'Неверный email или пароль' });
      }

      const user = result.rows[0];
      const valid = await bcrypt.compare(password, user.password);

      if (!valid) {
        return res.status(400).json({ error: 'Неверный email или пароль' });
      }

      // Удаляем пароль перед отправкой
      delete user.password;
      res.json({ user });
    } catch (err) {
      console.error('Ошибка входа:', err);
      res.status(500).json({ error: 'Ошибка сервера при входе' });
    }
  });

  return router;
};
