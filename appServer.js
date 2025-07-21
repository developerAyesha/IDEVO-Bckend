require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT =  5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/task_management';

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/tasks', require('./endpoints/taskRoutes'));
app.use('/api/kanban', require('./endpoints/kanbanRoutes'));
app.use('/api/team-members', require('./endpoints/teamMemberRoutes'));

app.get('/', (req, res) => {
  res.send('Task Management Backend Running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
