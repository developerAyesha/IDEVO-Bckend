require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/task_management';

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/tasks', require('./routes/taskRoutes'));
app.use('/api/kanban', require('./routes/kanbanRoutes'));
app.use('/api/team-members', require('./routes/teamMemberRoutes'));

app.get('/', (req, res) => {
  res.send('Task Management Backend Running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
