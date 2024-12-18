const form = document.getElementById('todo-form');
//console.log(typeof(form));
const input = document.getElementById('todo-input');
//console.log(input);
const todoList = document.getElementById('todo-list');
//console.log(todoList);

// let todos = [{id: 1, text: "test", status: false}];
let todos = []

form.addEventListener('submit', function (event) {
    event.preventDefault();
    const taskText = input.value.trim();
    // console.log(taskText);
    if (taskText === '') {
        return;
    }
    const newTask = {
        id: Date.now(),
        text: taskText,
        status: false
    };
    todos.push(newTask);
    // console.log(todos);
    input.value = '';
    showTodos();
})

function showTodos() {
    todoList.innerHTML = '';

    todos.forEach((task) => {
        const listItem = document.createElement('li');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.status;
        checkbox.setAttribute('aria-label', 'Aufgabe erledigen');
        checkbox.addEventListener('change', () => {
            task.status = checkbox.checked;
            showTodos();
            saveTodos();
        })

        const taskName = document.createElement('span');
        taskName.textContent = task.text;
        if (task.status) {
            taskName.style.textDecoration = 'line-through';
        }

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Löschen';
        deleteButton.setAttribute('aria-label', 'Aufgabe löschen');
        deleteButton.addEventListener('click', () => {
            todos = todos.filter((t) => t.id !== task.id);
            showTodos();
            saveTodos();
        })


        listItem.appendChild(checkbox);
        listItem.appendChild(taskName);
        listItem.appendChild(deleteButton);
        todoList.appendChild(listItem);
    })
    saveTodos();
}

function saveTodos(){
    // console.log(todos.length);
    if (todos.length === 0){
        return;
    }
    const localStorageTodos = JSON.stringify(todos);
    //console.log(typeof(localStorageTodos));
    localStorage.setItem('todos', localStorageTodos);

}

function loadTodos(){
    // console.log(localStorage.getItem('todos'));
    const existingTodos = localStorage.getItem('todos');
    if (!existingTodos){
        todos = [];
    }
    todos = JSON.parse(existingTodos);
    // console.log(todos);


}
loadTodos();
showTodos();
