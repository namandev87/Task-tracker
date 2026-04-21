const API_URL = "http://localhost:3000/tasks";

const taskList = document.getElementById("taskList");
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");

async function fetchTasks() {
    const res = await fetch(API_URL);
    const tasks = await res.json();

    renderTasks(tasks);
}

function renderTasks(tasks) {
  taskList.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span>${task.title} (${task.status})</span>
      <button>Delete</button>
    `;

    taskList.appendChild(li);
  });
}

addBtn.addEventListener("click", async () => {
    const title = taskInput.value;

    if(!title.trim()) {
        return alert("Task cannot be empty");
    }

    await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title })
    });

    taskInput.value="";
    fetchTasks();
})

fetchTasks();