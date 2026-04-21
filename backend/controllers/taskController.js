// in-memory data (temporary)
const tasks = [
  { id: 1, title: "Learn Express", status: "pending" },
  { id: 2, title: "Build Task API", status: "pending" }
];

// GET all tasks
exports.getAllTasks = (req, res) => {
  res.json(tasks);
};

// GET single task
exports.getTaskById = (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(t => t.id === taskId);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.json(task);
};

// POST task
exports.createTask = (req, res) => {
  const { title } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({ error: "Title is required" });
  }

  const newTask = {
    id: tasks.length + 1,
    title,
    status: "pending"
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
};

// PUT task
exports.updateTask = (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(t => t.id === taskId);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  const { title, status } = req.body;

  if (title !== undefined) task.title = title;
  if (status !== undefined) task.status = status;

  res.json(task);
};

// DELETE task
exports.deleteTask = (req, res) => {
  const taskId = parseInt(req.params.id);
  const index = tasks.findIndex(t => t.id === taskId);

  if (index === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  const deleted = tasks.splice(index, 1);

  res.json({
    message: "Task deleted successfully",
    task: deleted[0]
  });
};