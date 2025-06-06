import { Router } from 'express';

const router = Router();

export default (pool) => {
  // Получить все заказы пользователя
  router.get('/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
      const result = await pool.query(
        'SELECT id, service, status, "createdAt" FROM "Order" WHERE user_id = $1 ORDER BY "createdAt" DESC',
        [userId]
      );
      res.json(result.rows);
    } catch (err) {
      console.error('Ошибка в GET /api/orders/:userId:', err);
      res.status(500).json({ error: 'Ошибка сервера' });
    }
  });

  // Создать новый заказ вручную (оставляем для совместимости)
  router.post('/', async (req, res) => {
    const { userId, service } = req.body;
    if (!userId || !service) return res.status(400).json({ error: 'userId и service обязательны' });

    try {
      await pool.query(
        'INSERT INTO "Order" (user_id, service, status, "createdAt") VALUES ($1, $2, $3, NOW())',
        [userId, service, 'новый']
      );
      res.status(201).json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Ошибка создания заказа' });
    }
  });

  // Новый роут оформления заказа из корзины
  router.post('/create', async (req, res) => {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ error: 'userId обязателен' });

    try {
      // Получаем содержимое корзины пользователя
      const cartResult = await pool.query(
        'SELECT id, service, price, quantity FROM "CartItem" WHERE user_id = $1',
        [userId]
      );

      const cartItems = cartResult.rows;
      if (cartItems.length === 0) {
        return res.status(400).json({ error: 'Корзина пуста' });
      }

      // Считаем общую сумму
      const total = cartItems.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);

      // Формируем строку services для записи в orders (например, через запятую)
      const servicesList = cartItems.map(i => `${i.service} x${i.quantity || 1}`).join(', ');

      // Создаем заказ
      const orderResult = await pool.query(
        'INSERT INTO "Order" (user_id, service, status, "createdAt", total) VALUES ($1, $2, $3, NOW(), $4) RETURNING id',
        [userId, servicesList, 'новый', total]
      );
      const orderId = orderResult.rows[0].id;

      // Очищаем корзину
      await pool.query('DELETE FROM "CartItem" WHERE user_id = $1', [userId]);

      res.status(201).json({ success: true, orderId, total });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Ошибка оформления заказа' });
    }
  });

  // Обновить статус заказа
  router.put('/:orderId/status', async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;
    if (!status) return res.status(400).json({ error: 'Статус обязателен' });

    try {
      await pool.query('UPDATE "Order" SET status = $1 WHERE id = $2', [status, orderId]);
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Ошибка обновления статуса' });
    }
  });

  return router;
};
