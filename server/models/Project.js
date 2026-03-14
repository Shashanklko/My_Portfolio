const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  tech: [{ type: String }],
  span: { type: String, enum: ['sm', 'md', 'lg'], default: 'md' },
  githubLink: { type: String },
  liveLink: { type: String },
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
