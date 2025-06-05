import { Router } from 'express';

const router = Router();

export default (pool) => {
  // Получить все заказы пользователя
  router.get('/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
      const result = await pool.query(
        'SELECT id, service, status, created_at FROM orders WHERE user_id = $1 ORDER BY created_at DESC',
        [userId]
      );
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Ошибка сервера' });
    }
  });

  // Создать новый заказ
  router.post('/', async (req, res) => {
    const { userId, service } = req.body;
    if (!userId || !service) return res.status(400).json({ error: 'userId и service обязательны' });

    try {
      await pool.query(
        'INSERT INTO orders (user_id, service, status, created_at) VALUES ($1, $2, $3, NOW())',
        [userId, service, 'новый']
      );
      res.status(201).json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Ошибка создания заказа' });
    }
  });

  // Обновить статус заказа
  router.put('/:orderId/status', async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;
    if (!status) return res.status(400).json({ error: 'Статус обязателен' });

    try {
      await pool.query('UPDATE orders SET status = $1 WHERE id = $2', [status, orderId]);
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Ошибка обновления статуса' });
    }
  });

  return router;
};
