const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const auth = require('../authMiddleware');

// Public: Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort('order');
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Private: Add project
router.post('/', auth, async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Private: Update project
router.put('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Private: Delete project
router.delete('/:id', auth, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
