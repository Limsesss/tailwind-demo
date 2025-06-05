import { Router } from 'express';

const router = Router();

export default (pool) => {
  // POST /api/inquiry
  router.post('/', async (req, res) => {
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

  // GET /api/inquiries
  router.get('/', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM inquiries ORDER BY created_at DESC');
      res.json(result.rows);
    } catch (err) {
      console.error('Ошибка получения заявок:', err);
      res.status(500).json({ error: 'Ошибка сервера' });
    }
  });

  return router;
};
