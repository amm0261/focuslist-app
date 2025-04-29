// script.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
  
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let currentFilter = 'all';
  
    function saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  
    function renderTasks() {
      taskList.innerHTML = '';

      const filteredTasks = tasks.filter(task => {
        if (currentFilter === 'active') return !task.completed;
        if (currentFilter === 'completed') return task.completed;
        return true;
      });

      filteredTasks.forEach((task) => {
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
          const realIndex = tasks.findIndex(t => t.text === task.text && t.dueDate === task.dueDate && t.category === task.category);
          if (realIndex > -1) {
            tasks[realIndex].completed = !tasks[realIndex].completed;
            saveTasks();
            renderTasks();
          }
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-sm btn-danger';
        deleteBtn.textContent = '✕';
        deleteBtn.addEventListener('click', () => {
          const realIndex = tasks.findIndex(t => t.text === task.text && t.dueDate === task.dueDate && t.category === task.category);
          if (realIndex > -1) {
            tasks.splice(realIndex, 1);
            saveTasks();
            renderTasks();
          }
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
      const categoryInput = document.getElementById('category-input');
      const priorityInput = document.getElementById('priority-input');
      const category = categoryInput.value;
      const priority = priorityInput.value;
      const dueDate = document.getElementById('due-date-input').value;
      const dueTime = document.getElementById('due-time-input')?.value || '';
      if (text) {
        const categoryList = document.getElementById('category-options');
        const existingCategories = Array.from(categoryList.options).map(opt => opt.value);

        if (category && !existingCategories.includes(category)) {
          const newOption = document.createElement('option');
          newOption.value = category;
          categoryList.appendChild(newOption);
        }

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
        document.getElementById('category-input').value = '';
        document.getElementById('priority-input').value = '';
        document.getElementById('due-date-input').value = '';
        if (document.getElementById('due-time-input')) {
          document.getElementById('due-time-input').value = '';
        }
      }
    });
  
  
    renderTasks();

    document.getElementById('filter-buttons').addEventListener('click', (e) => {
      if (e.target.matches('button[data-filter]')) {
        currentFilter = e.target.dataset.filter;
        document.querySelectorAll('#filter-buttons button').forEach(btn =>
          btn.classList.remove('active')
        );
        e.target.classList.add('active');
        renderTasks();
      }
    });
  });