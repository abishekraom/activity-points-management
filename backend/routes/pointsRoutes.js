import express from 'express';
import Point from '../models/Point.js';

const router = express.Router();

router.get('/test', (req, res) => {
  res.json({ message: 'Points route working' });
});


// GET all points (for chart)
router.get('/', async (req, res) => {
  try {
    const points = await Point.find().sort({ date: 1 });
    res.json(points);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
