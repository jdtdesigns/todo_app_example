var input = document.querySelector('#todo-input');
var output = document.querySelector('#todo-output');

function saveTodos(arr) {
  localStorage.setItem('todos', JSON.stringify(arr));
}

function getTodos() {
  return JSON.parse(localStorage.getItem('todos')) || [];
}

function displayTodos() {
  var todos = getTodos();

  output.innerHTML = '';

  if (!todos.length) {
    output.innerHTML = '<p>No todos have been added.</p>';
  }

  todos.forEach(function (todo, index) {
    output.insertAdjacentHTML('afterbegin', `
    <li>
      <span>${todo}</span>
      <button data-index="${index}">Complete</button>
    </li> 
    `);
  });
}

function addTodo(event) {
  var keyPressed = event.keyCode;

  if (keyPressed === 13) {
    var todos = getTodos();
    var todoText = input.value;

    if (!todoText) return;

    todos.push(todoText);
    saveTodos(todos);

    input.value = '';

    displayTodos();
  }
}

function deleteTodo(event) {
  var el = event.target;

  if (el.tagName === 'BUTTON') {
    var todos = getTodos();
    var todoIndex = el.dataset.index;

    todos.splice(todoIndex, 1);
    saveTodos(todos);

    displayTodos();
  }
}

function init() {
  input.addEventListener('keydown', addTodo);
  output.addEventListener('click', deleteTodo);

  displayTodos();
}

init();
