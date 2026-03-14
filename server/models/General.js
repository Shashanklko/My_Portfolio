const mongoose = require('mongoose');

const generalSchema = new mongoose.Schema({
  name: { type: String, default: 'SHASHANK KUMAR' },
  role: { type: String, default: 'Software Developer' },
  secondaryRole: { type: String, default: '& UI Designer' },
  location: { type: String, default: 'BASED IN LUCKNOW, INDIA' },
  email: { type: String },
  github: { type: String },
  resumeUrl: { type: String },
  customLinkName: { type: String },
  customLinkUrl: { type: String },
  customLinkIcon: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('General', generalSchema);
