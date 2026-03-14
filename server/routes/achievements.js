const express = require('express');
const router = express.Router();
const Achievement = require('../models/Achievement');
const auth = require('../authMiddleware');

router.get('/', async (req, res) => {
  try {
    const achievements = await Achievement.find().sort('order');
    res.json(achievements);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const ach = new Achievement(req.body);
    await ach.save();
    res.status(201).json(ach);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const ach = await Achievement.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(ach);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await Achievement.findByIdAndDelete(req.params.id);
    res.json({ message: 'Achievement deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
