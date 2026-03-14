const express = require('express');
const router = express.Router();
const Experience = require('../models/Experience');
const authMiddleware = require('../authMiddleware');

// Get all experience
router.get('/', async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ order: 1 });
    res.json(experiences);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create experience (Admin only)
router.post('/', authMiddleware, async (req, res) => {
  const experience = new Experience(req.body);
  try {
    const newExp = await experience.save();
    res.status(201).json(newExp);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update experience (Admin only)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const updatedExp = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedExp);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete experience (Admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await Experience.findByIdAndDelete(req.params.id);
    res.json({ message: 'Experience deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
