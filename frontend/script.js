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
      <button class="delete-btn" data-id="${task._id}">Delete</button>
      <button class="status-btn" data-id="${task._id}">${task.status === "pending" ? "Complete" : "Undo"}</button>
    `;

    const deleteBtn = li.querySelector(".delete-btn");

    deleteBtn.addEventListener("click", async () => {
        const id =deleteBtn.dataset.id;

        const res = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });
        if(!res.ok){
            console.error("Failed to delete task");
        }
        fetchTasks();
    });

    const statusBtn = li.querySelector(".status-btn");

    statusBtn.addEventListener("click", async () => {
        const id = statusBtn.dataset.id;

        const res = await fetch(`${API_URL}/${id}`,  {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "status": task.status === "pending" ? "completed" : "pending"
            })
        });
        if(!res.ok){
            console.log("Failed to update status");
        }
        fetchTasks();
    });

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