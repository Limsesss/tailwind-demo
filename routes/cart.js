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

  // Добавить элемент в корзину
  router.post('/', async (req, res) => {
  const { userId, service, price, quantity } = req.body;
  if (!userId || !service || price == null || quantity == null)
    return res.status(400).json({ error: 'userId, service, price и quantity обязательны' });

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
    // Удаляем только если этот элемент принадлежит пользователю
    await pool.query('DELETE FROM "CartItem" WHERE id = $1 AND "userId" = $2', [itemId, userId]);
    res.json({ success: true });
  } catch (err) {
    console.error('Ошибка удаления из корзины:', err);
    res.status(500).json({ error: 'Ошибка удаления из корзины' });
  }
});

  return router;
};
