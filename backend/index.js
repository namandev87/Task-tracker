const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

mongoose.connect("mongodb+srv://namandev87:developer87kpn@cluster0.1yfldrq.mongodb.net/task-tracker")
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });

const taskRoutes = require("./routes/taskRoutes");

app.use(taskRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});