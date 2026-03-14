const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
  year: { type: String, required: true },
  degree: { type: String, required: true },
  school: { type: String, required: true },
  note: { type: String },
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Education', educationSchema);
