const mongoose = require('mongoose');

const SectionSchema = new mongoose.Schema({
  label: { type: String, required: true }, // e.g., 'Todo', 'In Progress', etc.
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Entry' }],
});

module.exports = mongoose.model('Section', SectionSchema); 