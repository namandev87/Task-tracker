const Task = require("../models/Task");

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({
      error: "Server error"
    })
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
  
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(task);
  } catch (err) {
    res.status(500).json({
      error: "Server error"
    });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({ error: "Title is required" });
    }

    const newTask = await Task.create({ title });

    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({
      error: "Server error"
    });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { title, status } = req.body;

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, status},
      {new: true}
    );

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(task);
  } catch (err) {
    res.status(500).json({
      error: "Server error"
    });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if(!task){
      return res.status(404).json({
        error: "Task not found"
      });
    }

    res.json({
      message: "Task deleted successfully",
      task
    });
  } catch (err) {
    res.status(500).json({
      error: "Server error"
    });
  }
};