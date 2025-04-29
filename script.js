// script.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
  
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
    function saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  
    function renderTasks() {
        tasks.forEach((task, index) => {
          const item = document.createElement('div');
          item.className = 'list-group-item d-flex justify-content-between align-items-center';
      
          const taskText = document.createElement('span');
          taskText.className = 'task-text';
          if (task.completed) taskText.classList.add('completed');
          taskText.innerHTML = `
            <strong>${task.text}</strong><br/>
            <small class="text-muted">
              ${task.category ? `Category: ${task.category} | ` : ''}
              ${task.priority ? `Priority: ${task.priority} | ` : ''}
              ${task.dueDate ? `Due: ${task.dueDate}` : ''}
              ${task.dueTime ? `at ${task.dueTime}` : ''}
            </small>
          `;
      
          const buttons = document.createElement('div');
          buttons.className = 'd-flex gap-2';

          const completeBtn = document.createElement('button');
          completeBtn.className = 'btn btn-sm btn-success';
          completeBtn.textContent = '✓';
          completeBtn.addEventListener('click', () => {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            renderTasks();
          });

          const deleteBtn = document.createElement('button');
          deleteBtn.className = 'btn btn-sm btn-danger';
          deleteBtn.textContent = '✕';
          deleteBtn.addEventListener('click', () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
          });

          buttons.appendChild(completeBtn);
          buttons.appendChild(deleteBtn);
      
          item.appendChild(taskText);
          item.appendChild(buttons);
          taskList.appendChild(item);
        });
      }
  
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = taskInput.value.trim();
        const category = document.getElementById('category-input').value;
        const priority = document.getElementById('priority-input').value;
        const dueDate = document.getElementById('due-date-input').value;
        const dueTime = document.getElementById('due-time-input')?.value || '';
        if (text) {
        tasks.push({
            text,
            category,
            priority,
            dueDate,
            dueTime,
            completed: false
        });
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