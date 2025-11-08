const todos = [
  'Learn a new course',
  'Read a book',
  'Go to the gym',
  'Go shopping'
];

/* Ex. 1: Add a event listener that triggers when the DOM is loaded here */
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('list-date').innerHTML = new Date().toLocaleDateString();
  renderTodoList();
});


/* Ex. 2: Complete todo rendering */
// complete function to remove all child nodes
// arg parent is the node to clean
function removeAllChildNodes(parent) {
  while (parent.lastChild) {
    parent.removeChild(parent.lastChild);
  }
}


// render todo array here
function renderTodoList() {
  const todoList = document.getElementById("todo-list");
  removeAllChildNodes(todoList);

  todos.forEach(t => {
    // create <li>
    const listItem = document.createElement("li");
    listItem.className = "todo-list-item";

    // create the <p> for the <li>
    const paragraph = document.createElement("p");
    paragraph.textContent = t;

    // create the <button> for the <li>
    const deleteButton = document.createElement("button");
    deleteButton.className = 'deleteButton';
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', removeTodoItem);

    // add the <p> to the <li>
    listItem.appendChild(paragraph);
    // add the <button> to the <li>
    listItem.appendChild(deleteButton);

    // add the <li> to the <ul>
    todoList.appendChild(listItem);
  });
}



/* Ex. 3: Add a event listener to element 'todo-form'*/
document.getElementById('todo-form').addEventListener('submit', event => {
  event.preventDefault();

  const input = document.getElementById('task-input');
  const taskText = input.value.trim();

  // empty input
  if (taskText != "") {
    // already exists in the todo list
    if (!todos.includes(taskText)) {
      todos.push(taskText);
    }
  }

  // clean the input text
  input.value = "";

  renderTodoList();

});


/* Ex. 4 and 5: complete delete button click logic */
// arg event is the triggered event (with event you can get the element clicked).
function removeTodoItem(event) {
  const button = event.target;
  const p = button.previousElementSibling;
  const li = button.parentElement;

  const t = p.innerHTML;

  // remove the todo
  const index = todos.indexOf(t);
  if (index !== -1) todos.splice(index, 1);

  button.removeEventListener('click', removeTodoItem);
  li.remove();
}
