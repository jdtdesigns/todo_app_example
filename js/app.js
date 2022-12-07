var input = $('#todo-input');
var output = $('#todo-output');

function saveTodos(arr) {
  localStorage.setItem('todos', JSON.stringify(arr));
}

function getTodos() {
  return JSON.parse(localStorage.getItem('todos')) || [];
}

function displayTodos() {
  var todos = getTodos();

  output.html('');

  if (!todos.length) {
    output.html('<p>No todos have been added.</p>');
  }

  $.each(todos, function (index, todo) {
    output.prepend(`
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
    var todoText = input.val();

    if (!todoText) return;

    todos.push(todoText);
    saveTodos(todos);

    input.val('');

    displayTodos();
  }
}

function deleteTodo() {
  var btn = $(this);
  var todos = getTodos();
  var todoIndex = btn.data('index');

  todos.splice(todoIndex, 1);
  saveTodos(todos);

  displayTodos();
}

function init() {
  input.keydown(addTodo);
  output.on('click', 'button', deleteTodo);

  displayTodos();
}

init();
