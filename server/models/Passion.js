const mongoose = require('mongoose');

const passionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  icon: { type: String, required: true }, // React-icon name
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Passion', passionSchema);
