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

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});