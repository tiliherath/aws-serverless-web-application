// API Gateway endpoint for the serverless backend.
const API_URL = "https://1280qpehok.execute-api.us-east-1.amazonaws.com";


/*
 * Load all tasks from the API.
 */
async function loadTasks() {

    const tasksContainer = document.getElementById("tasks");

    try {

        // FIXED LINE 15: Using standard string concatenation
        const response = await fetch(API_URL + "/tasks");

        if (!response.ok) {
            throw new Error("Failed to load tasks");
        }

        const tasks = await response.json();

        displayTasks(tasks);

    } catch (error) {

        console.error("Error loading tasks:", error);

        tasksContainer.innerHTML =
            '<p class="error">Unable to load tasks.</p>';
    }
}


/*
 * Display tasks on the page.
 */
function displayTasks(tasks) {

    const tasksContainer =
        document.getElementById("tasks");

    if (!tasks || tasks.length === 0) {

        tasksContainer.innerHTML =
            '<p class="message">No tasks found.</p>';

        return;
    }

    tasksContainer.innerHTML = "";

    tasks.forEach(task => {

        const taskElement =
            document.createElement("div");

        taskElement.className = "task";

        // FIXED: Replaced inline string template with safe DOM nodes to avoid backtick crashes
        const span = document.createElement("span");
        span.textContent = task.title;

        const button = document.createElement("button");
        button.className = "delete-button";
        button.textContent = "Delete";
        button.onclick = function() {
            deleteTask(task.taskId || task.id);
        };

        taskElement.appendChild(span);
        taskElement.appendChild(button);
        tasksContainer.appendChild(taskElement);
    });
}


/*
 * Add a new task using the POST API.
 */
async function addTask() {

    const input =
        document.getElementById("taskTitle");

    const title = input.value.trim();

    if (!title) {
        alert("Please enter a task.");
        return;
    }

    try {

        // FIXED: Using standard string concatenation
        const response = await fetch(
            API_URL + "/tasks",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    title: title
                })
            }
        );

        if (!response.ok) {
            throw new Error("Failed to create task");
        }

        input.value = "";

        await loadTasks();

    } catch (error) {

        console.error("Error creating task:", error);

        alert("Unable to create task.");
    }
}


/*
 * Delete a task using the DELETE API.
 */
async function deleteTask(taskId) {

    try {

        // FIXED: Using standard string concatenation
        const response = await fetch(
            API_URL + "/tasks",
            {
                method: "DELETE",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    taskId: taskId
                })
            }
        );

        if (!response.ok) {
            throw new Error("Failed to delete task");
        }

        await loadTasks();

    } catch (error) {

        console.error("Error deleting task:", error);

        alert("Unable to delete task.");
    }
}


/*
 * Basic HTML escaping to prevent user-provided
 * task titles from being interpreted as HTML.
 */
function escapeHtml(value) {

    const div = document.createElement("div");

    div.textContent = value;

    return div.innerHTML;
}


/*
 * Load tasks when the page opens.
 */
document.addEventListener(
    "DOMContentLoaded",
    loadTasks
);


