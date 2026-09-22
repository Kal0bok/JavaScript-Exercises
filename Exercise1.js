<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JavaScript Fundamentals & DOM Exercises</title>
    <style>
        * { box-sizing: border-box; font-family: Arial, sans-serif; }
        body { max-width: 800px; margin: 30px auto; padding: 20px; background: #f0f2f5; color: #333; }
        .card { background: #fff; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
        h1, h2 { color: #1a73e8; }
        input, button, select { padding: 10px; margin: 5px 0; font-size: 14px; border: 1px solid #ccc; border-radius: 4px; }
        button { background: #1a73e8; color: white; border: none; cursor: pointer; transition: 0.2s; }
        button:hover { background: #1557b0; }
        ul { list-style: none; padding: 0; }
        li { padding: 10px; background: #f8f9fa; border: 1px solid #ddd; margin-bottom: 5px; display: flex; justify-content: space-between; align-items: center; border-radius: 4px; }
        .completed { text-decoration: line-through; opacity: 0.6; }
        .delete-btn { background: #dc3545; padding: 5px 10px; font-size: 12px; }
        .delete-btn:hover { background: #bd2130; }
    </style>
</head>
<body>

    <h1>JavaScript Basics & DOM Manipulation</h1>

    <!-- 1. Interactive To-Do List (DOM + LocalStorage) -->
    <div class="card">
        <h2>1. Interactive Task Manager</h2>
        <div style="display: flex; gap: 10px;">
            <input type="text" id="taskInput" placeholder="Enter a new task..." style="flex: 1;">
            <button id="addTaskBtn">Add Task</button>
        </div>
        <ul id="taskList"></ul>
    </div>

    <!-- 2. Array Filtering and Search -->
    <div class="card">
        <h2>2. Array Filter & Search</h2>
        <input type="text" id="searchInput" placeholder="Search product by name...">
        <ul id="productList"></ul>
    </div>

    <!-- 3. Async Fetch API Demo -->
    <div class="card">
        <h2>3. Fetch API (Async / Await)</h2>
        <button id="fetchQuoteBtn">Get Random Quote</button>
        <blockquote id="quoteText" style="margin-top: 15px; font-style: italic; color: #555;">
            Click the button to load a quote.
        </blockquote>
    </div>

    <script>
        // === 1. TO-DO LIST WITH LOCALSTORAGE ===
        const taskInput = document.getElementById('taskInput');
        const addTaskBtn = document.getElementById('addTaskBtn');
        const taskList = document.getElementById('taskList');

        let tasks = JSON.parse(localStorage.getItem('js_tasks')) || [];

        function saveAndRenderTasks() {
            localStorage.setItem('js_tasks', JSON.stringify(tasks));
            taskList.innerHTML = '';
            
            tasks.forEach((task, index) => {
                const li = document.createElement('li');
                li.className = task.completed ? 'completed' : '';
                li.innerHTML = `
                    <span onclick="toggleTask(${index})" style="cursor: pointer;">${task.text}</span>
                    <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
                `;
                taskList.appendChild(li);
            });
        }

        addTaskBtn.addEventListener('click', () => {
            const text = taskInput.value.trim();
            if (text) {
                tasks.push({ text, completed: false });
                taskInput.value = '';
                saveAndRenderTasks();
            }
        });

        window.toggleTask = (index) => {
            tasks[index].completed = !tasks[index].completed;
            saveAndRenderTasks();
        };

        window.deleteTask = (index) => {
            tasks.splice(index, 1);
            saveAndRenderTasks();
        };

        saveAndRenderTasks();


        // === 2. ARRAY FILTERING ===
        const products = [
            { name: "Gaming Mouse", price: 25 },
            { name: "Mechanical Keyboard", price: 75 },
            { name: "HD Monitor", price: 150 },
            { name: "USB Headset", price: 40 },
            { name: "Webcam 1080p", price: 60 }
        ];

        const searchInput = document.getElementById('searchInput');
        const productList = document.getElementById('productList');

        function renderProducts(filterText = '') {
            productList.innerHTML = '';
            const filtered = products.filter(p => 
                p.name.toLowerCase().includes(filterText.toLowerCase())
            );

            filtered.forEach(p => {
                const li = document.createElement('li');
                li.textContent = `${p.name} - $${p.price}`;
                productList.appendChild(li);
            });
        }

        searchInput.addEventListener('input', (e) => {
            renderProducts(e.target.value);
        });

        renderProducts();


        // === 3. FETCH API (ASYNC / AWAIT) ===
        const fetchQuoteBtn = document.getElementById('fetchQuoteBtn');
        const quoteText = document.getElementById('quoteText');

        fetchQuoteBtn.addEventListener('click', async () => {
            quoteText.textContent = "Loading quote...";
            try {
                const response = await fetch('https://dummyjson.com/quotes/random');
                const data = await response.json();
                quoteText.textContent = `"${data.quote}" — ${data.author}`;
            } catch (error) {
                quoteText.textContent = "Failed to fetch quote. Check internet connection.";
            }
        });
    </script>
</body>
</html>