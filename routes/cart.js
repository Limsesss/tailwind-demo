import { Router } from 'express';

const router = Router();

export default (pool) => {
  // Получить корзину пользователя
  router.get('/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
      const result = await pool.query(
        'SELECT id, service, created_at FROM "CartItem" WHERE user_id = $1 ORDER BY created_at DESC',
        [userId]
      );
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Ошибка сервера' });
    }
  });

  // Добавить элемент в корзину
  router.post('/', async (req, res) => {
    const { userId, service } = req.body;
    if (!userId || !service) return res.status(400).json({ error: 'userId и service обязательны' });

    try {
      await pool.query(
        'INSERT INTO "CartItem" (user_id, service, created_at) VALUES ($1, $2, NOW())',
        [userId, service]
      );
      res.status(201).json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Ошибка добавления в корзину' });
    }
  });

  // Удалить элемент из корзины
  router.delete('/:itemId', async (req, res) => {
    const { itemId } = req.params;

    try {
      await pool.query('DELETE FROM "CartItem" WHERE id = $1', [itemId]);
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Ошибка удаления из корзины' });
    }
  });

  return router;
};
