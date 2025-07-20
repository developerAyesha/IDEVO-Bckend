const mongoose = require('mongoose');
const Task = require('./models/Task');
const TeamMember = require('./models/TeamMember');
const KanbanColumn = require('./models/KanbanColumn');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/task_management')
  .then(() => console.log('MongoDB connected for seeding'))
  .catch((err) => console.error('MongoDB connection error:', err));

const seedData = async () => {
  try {
    // Clear existing data
    await Task.deleteMany({});
    await TeamMember.deleteMany({});
    await KanbanColumn.deleteMany({});

    // Create team members
    const teamMembers = await TeamMember.create([
      { name: "John Doe", avatar: "/placeholder-user.jpg" },
      { name: "Jane Smith", avatar: "/placeholder-user.jpg" },
      { name: "Mike Johnson", avatar: "/placeholder-user.jpg" },
      { name: "Sarah Wilson", avatar: "/placeholder-user.jpg" },
    ]);

    console.log('Team members created:', teamMembers.length);

    // Create default columns
    const columns = await KanbanColumn.create([
      { name: "Todo", tasks: [] },
      { name: "In Progress", tasks: [] },
      { name: "Review", tasks: [] },
      { name: "Completed", tasks: [] },
      { name: "Archive", tasks: [] },
    ]);

    console.log('Columns created:', columns.length);

    // Create sample tasks
    const tasks = await Task.create([
      {
        title: "UX Research",
        subtitle: "School Website",
        priority: "Urgent",
        status: "todo",
        assignees: [teamMembers[0]._id, teamMembers[1]._id],
        comments: 5,
        dueDate: "5 Oct",
        completion: 0,
      },
      {
        title: "UI Design",
        subtitle: "School Website",
        priority: "Medium",
        status: "inprogress",
        assignees: [teamMembers[1]._id, teamMembers[2]._id],
        comments: 3,
        dueDate: "10 Oct",
        completion: 30,
      },
      {
        title: "Frontend Development",
        subtitle: "School Website",
        priority: "High",
        status: "review",
        assignees: [teamMembers[2]._id, teamMembers[3]._id],
        comments: 8,
        dueDate: "15 Oct",
        completion: 80,
      },
    ]);

    console.log('Tasks created:', tasks.length);

    // Add tasks to columns
    for (const task of tasks) {
      const columnName = task.status.charAt(0).toUpperCase() + task.status.slice(1).replace(/([A-Z])/g, ' $1');
      const column = await KanbanColumn.findOne({ name: columnName });
      if (column) {
        column.tasks.push(task._id);
        await column.save();
      }
    }

    console.log('Seed data completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData(); 