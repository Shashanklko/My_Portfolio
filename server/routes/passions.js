const express = require('express');
const router = express.Router();
const Passion = require('../models/Passion');
const auth = require('../authMiddleware');

router.get('/', async (req, res) => {
  try {
    const passions = await Passion.find().sort('order');
    res.json(passions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const passion = new Passion(req.body);
    await passion.save();
    res.json(passion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const passion = await Passion.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(passion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await Passion.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
