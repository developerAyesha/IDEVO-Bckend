const mongoose = require('mongoose');

const KanbanColumnSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., 'Todo', 'In Progress', etc.
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
});

module.exports = mongoose.model('KanbanColumn', KanbanColumnSchema); 