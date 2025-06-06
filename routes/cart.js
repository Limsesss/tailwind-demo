import { Router } from 'express';

const router = Router();

export default (pool) => {
  // Получить корзину пользователя
  router.get('/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
      const result = await pool.query(
        `SELECT id, "userId", service, price, quantity 
         FROM "CartItem" WHERE "userId" = $1 ORDER BY id DESC`,
        [userId]
      );
      res.json(result.rows);
    } catch (err) {
      console.error('Ошибка в GET /api/cart/:userId:', err);
      res.status(500).json({ error: 'Ошибка сервера' });
    }
  });

  // Обновить количество товара в корзине
  router.put('/:userId/:itemId', async (req, res) => {
    const { userId, itemId } = req.params;
    const { quantity } = req.body;

    if (typeof quantity !== 'number' || quantity < 1) {
      return res.status(400).json({ error: 'Количество должно быть числом и >= 1' });
    }

    try {
      const result = await pool.query(
        'UPDATE "CartItem" SET quantity = $1 WHERE id = $2 AND "userId" = $3 RETURNING *',
        [quantity, itemId, userId]
      );

      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'Элемент корзины не найден' });
      }

      res.json({ success: true, item: result.rows[0] });
    } catch (err) {
      console.error('Ошибка обновления количества:', err);
      res.status(500).json({ error: 'Ошибка обновления количества' });
    }
  });

  // Добавить элемент в корзину
  router.post('/', async (req, res) => {
    const { userId, service, price, quantity } = req.body;

    if (!userId || !service || price == null || quantity == null) {
      return res.status(400).json({ error: 'userId, service, price и quantity обязательны' });
    }

    try {
      await pool.query(
        `INSERT INTO "CartItem" ("userId", service, price, quantity) VALUES ($1, $2, $3, $4)`,
        [userId, service, price, quantity]
      );
      res.status(201).json({ success: true });
    } catch (err) {
      console.error('Ошибка добавления в корзину:', err);
      res.status(500).json({ error: 'Ошибка добавления в корзину' });
    }
  });

  // Удалить элемент из корзины
  router.delete('/:userId/:itemId', async (req, res) => {
    const { userId, itemId } = req.params;

    try {
      const result = await pool.query(
        'DELETE FROM "CartItem" WHERE id = $1 AND "userId" = $2 RETURNING *',
        [itemId, userId]
      );
      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'Элемент корзины не найден или не принадлежит пользователю' });
      }
      res.json({ success: true });
    } catch (err) {
      console.error('Ошибка удаления из корзины:', err);
      res.status(500).json({ error: 'Ошибка удаления из корзины' });
    }
  });

  return router;
};
