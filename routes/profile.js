import { Router } from 'express';
import bcrypt from 'bcryptjs';

const router = Router();

export default (pool) => {
  // Получить профиль пользователя по id
  router.get('/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
      const result = await pool.query('SELECT id, email, name, "createdAt" FROM users WHERE id = $1', [userId]);
      if (result.rows.length === 0)
        return res.status(404).json({ error: 'Пользователь не найден' });
      res.json(result.rows[0]);
    } catch (err) {
      console.error('Ошибка в GET /api/profile/:userId:', err);
      res.status(500).json({ error: 'Ошибка сервера' });
    }
  });

  // Обновить профиль (только имя и email)
  router.put('/:userId', async (req, res) => {
    const { userId } = req.params;
    const { name, email } = req.body;

    if (!name || !email)
      return res.status(400).json({ error: 'Имя и email обязательны' });

    try {
      await pool.query(
        'UPDATE users SET name = $1, email = $2 WHERE id = $3',
        [name, email, userId]
      );
      res.json({ success: true });
    } catch (err) {
      console.error('Ошибка в PUT /api/profile/:userId:', err);
      res.status(500).json({ error: 'Ошибка обновления' });
    }
  });

  // Изменить пароль
  router.put('/:userId/password', async (req, res) => {
    const { userId } = req.params;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword)
      return res.status(400).json({ error: 'Оба пароля обязательны' });

    try {
      const result = await pool.query('SELECT password FROM users WHERE id = $1', [userId]);
      if (result.rows.length === 0)
        return res.status(404).json({ error: 'Пользователь не найден' });

      const hash = result.rows[0].password;
      const match = await bcrypt.compare(oldPassword, hash);

      if (!match)
        return res.status(403).json({ error: 'Старый пароль неверен' });

      const newHash = await bcrypt.hash(newPassword, 10);
      await pool.query('UPDATE users SET password = $1 WHERE id = $2', [newHash, userId]);

      res.json({ success: true });
    } catch (err) {
      console.error('Ошибка в PUT /api/profile/:userId/password:', err);
      res.status(500).json({ error: 'Ошибка обновления пароля' });
    }
  });

  return router;
};
