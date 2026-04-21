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

app.get("/", (req, res) => {
    res.send("Backend is working");
});

app.get("/tasks", (req, res) => {
    res.json(tasks);
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});