const express = require('express');
const router = express.Router();
const General = require('../models/General');
const auth = require('../authMiddleware');

router.get('/', async (req, res) => {
  try {
    const general = await General.findOne();
    res.json(general || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    let general = await General.findOne();
    if (general) {
      general = await General.findByIdAndUpdate(general._id, req.body, { new: true });
    } else {
      general = new General(req.body);
      await general.save();
    }
    res.json(general);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
