const API_URL = "http://localhost:3000/tasks";

const taskList = document.getElementById("taskList");

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

fetchTasks();