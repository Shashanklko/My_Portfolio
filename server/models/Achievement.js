const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  type: { type: String, enum: ['win', 'cert'], required: true },
  title: { type: String, required: true }, // or name for cert
  desc: { type: String }, // or org for cert
  icon: { type: String }, // React-icon name for wins
  color: { type: String }, 
  date: { type: String }, // for certs
  url: { type: String }, // for certs
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Achievement', achievementSchema);
