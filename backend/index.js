const express = require("express");

const app = express();

const PORT = 3000;

const tasks = [
    {
        id: 1,
        title: "Learn Express",
        status: "pending"
    },
    {
        id: 2,
        title: "Build Task API",
        status: "pending"
    }
];

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend is working");
});

app.get("/tasks", (req, res) => {
    res.json(tasks);
});

app.post("/tasks", (req, res) => {
    const newTask = {
        id: tasks.length+1,
        title: req.body.title,
        status: "pending"
    };

    tasks.push(newTask);

    res.json(newTask);
});

app.get("/tasks/:id", (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);

    if(!task){
        return res.status(404).json({
            error: "Task not found"
        });
    }

    res.json(task);
});

app.put("/tasks/:id", (req, res) => {
    const taskId = parseInt(req.params.id);

    const task = tasks.find(t => t.id === taskId);

    if(!task){
        res.status(404).json({
            error: "Task not found"
        });
    }

    const {title, status} = req.body;
    
    if(title !== undefined) {
        task.title = title;
    }

    if (status !== undefined) {
        task.status = status;
    }

    res.json(task);
});

app.delete("/tasks/:id", (req, res) => {
    const taskId = parseInt(req.params.id);

    const taskIndex = tasks.findIndex(t => t.id === taskId);

    if(taskIndex === -1){
        return res.status(404).json({
            error: "Task not found"
        });
    }
    const deletedTask = tasks.splice(taskIndex, 1);
    res.json({
        message: "Task deleted successfully",
        task : deletedTask[0]
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});