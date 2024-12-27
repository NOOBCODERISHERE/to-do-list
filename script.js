let tasks = [];

        function addTask() {
            const input = document.getElementById('taskInput');
            const task = input.value.trim();
            
            if (task) {
                tasks.push({
                    id: Date.now(),
                    text: task,
                    completed: false
                });
                input.value = '';
                renderTasks();
            }
        }

        function toggleTask(id) {
            tasks = tasks.map(task => 
                task.id === id ? {...task, completed: !task.completed} : task
            );
            renderTasks();
        }

        function deleteTask(id) {
            tasks = tasks.filter(task => task.id !== id);
            renderTasks();
        }

        function renderTasks() {
            const todoList = document.getElementById('todoList');
            todoList.innerHTML = '';
            
            tasks.forEach(task => {
                const taskElement = document.createElement('div');
                taskElement.className = `todo-item ${task.completed ? 'completed' : ''}`;
                
                taskElement.innerHTML = `
                    <input type="checkbox" 
                           ${task.completed ? 'checked' : ''} 
                           onchange="toggleTask(${task.id})">
                    <span>${task.text}</span>
                    <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
                `;
                
                todoList.appendChild(taskElement);
            });
        }

        // Add task when Enter key is pressed
        document.getElementById('taskInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addTask();
            }
        });