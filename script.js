//script.js
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('task-form');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
      const item = document.createElement('div');
      item.className = 'list-group-item list-group-item-action';
      if (task.completed) item.classList.add('completed');

      item.innerHTML = `
        <span>${task.text}</span>
        <div>
          <button class="btn btn-sm btn-success me-2" onclick="toggleTask(${index})">✓</button>
          <button class="btn btn-sm btn-danger" onclick="deleteTask(${index})">✕</button>
        </div>
      `;
      taskList.appendChild(item);
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = taskInput.value.trim();
    if (text) {
      tasks.push({ text, completed: false });
      saveTasks();
      renderTasks();
      taskInput.value = '';
    }
  });

  window.toggleTask = (index) => {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
  };

  window.deleteTask = (index) => {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  };

  renderTasks();
});