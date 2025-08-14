// Load tasks from localStorage or empty array
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const form = document.getElementById('newTaskForm');
const input = document.getElementById('taskInput');
const list = document.getElementById('taskList');

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Render tasks
function render() {
  list.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = 'item' + (task.completed ? ' completed' : '');

    // Checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => {
      task.completed = checkbox.checked;
      saveTasks();
      render();
    });

    // Task text
    const span = document.createElement('span');
    span.className = 'item__text';
    span.textContent = task.text;

    // Delete button
    const delBtn = document.createElement('button');
    delBtn.className = 'icon-btn';
    delBtn.textContent = '🗑';
    delBtn.addEventListener('click', () => {
      tasks.splice(index, 1);
      saveTasks();
      render();
    });

    // Arrange elements
    const leftDiv = document.createElement('div');
    leftDiv.style.display = 'flex';
    leftDiv.style.alignItems = 'center';
    leftDiv.append(checkbox, span);

    li.append(leftDiv, delBtn);
    list.appendChild(li);
  });
}

// Add new task
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (text) {
    tasks.push({ text, completed: false });
    saveTasks();
    input.value = '';
    render();
  }
});

// Initial render
render();
