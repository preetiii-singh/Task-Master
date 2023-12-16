const taskContainer = document.querySelector('.task-container');
const taskList = document.querySelector('.task-list');
function createTaskElement(taskName, taskDescription, dueDate) {
  const taskElement = document.createElement('div');
  taskElement.classList.add('task');

  const taskHeader = document.createElement('div');
  taskHeader.classList.add('task-header');

  const taskTitle = document.createElement('h2');
  taskTitle.textContent = taskName;

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('delete-task');
  deleteButton.textContent = 'X';

  taskHeader.appendChild(taskTitle);
  taskHeader.appendChild(deleteButton);

  const taskBody = document.createElement('div');
  taskBody.classList.add('task-body');

  const descriptionParagraph = document.createElement('p');
  descriptionParagraph.textContent = taskDescription;

  const dueDateParagraph = document.createElement('p');
  dueDateParagraph.textContent = 'Due date: ' + dueDate;

  const editButton = document.createElement('button');
  editButton.classList.add('edit-task');
  editButton.textContent = 'Edit';

  taskBody.appendChild(descriptionParagraph);
  taskBody.appendChild(dueDateParagraph);
  taskBody.appendChild(editButton);

  taskElement.appendChild(taskHeader);
  taskElement.appendChild(taskBody);

  return taskElement;
}

function addTask(event) {
  event.preventDefault();

  const taskNameInput = document.getElementById('task-name');
  const taskDescriptionInput = document.getElementById('task-description');
  const dueDateInput = document.getElementById('due-date');

  const taskName = taskNameInput.value;
  const taskDescription = taskDescriptionInput.value;
  const dueDate = dueDateInput.value;

  const taskElement = createTaskElement(taskName, taskDescription, dueDate);
  taskContainer.appendChild(taskElement);

  taskNameInput.value = '';
  taskDescriptionInput.value = '';
  dueDateInput.value = '';
  updateTaskList();
}

function deleteTask(event) {
  const taskElement = event.target.closest('.task');
  taskElement.remove();

  updateTaskList();
}

function updateTask(event) {
  const taskElement = event.target.closest('.task');
  const taskTitle = taskElement.querySelector('h2');
  const taskDescription = taskElement.querySelector('p:first-of-type');
  const dueDate = taskElement.querySelector('p:last-of-type');

  const newTaskName = prompt('Enter new task name:', taskTitle.textContent);
  const newTaskDescription = prompt('Enter new task description:', taskDescription.textContent);
  const newDueDate = prompt('Enter new due date:', dueDate.textContent.substring(10));

  taskTitle.textContent = newTaskName;
  taskDescription.textContent = newTaskDescription;
  dueDate.textContent = 'Due date: ' + newDueDate;
  updateTaskList();
}

function updateTaskList() {

  taskList.innerHTML = '';
  const taskElements = document.querySelectorAll('.task');
  taskElements.forEach(taskElement => {
    const taskTitle = taskElement.querySelector('h2').textContent;
    const taskDescription = taskElement.querySelector('p:first-of-type').textContent;
    const dueDate = taskElement.querySelector('p:last-of-type').textContent;

    const taskListItem = document.createElement('li');
    taskListItem.textContent = `${taskTitle} - ${taskDescription} - ${dueDate}`;

    taskList.appendChild(taskListItem);
  });
}


const addTaskForm = document.querySelector('.add-task-container form');
addTaskForm.addEventListener('submit', addTask);

const deleteTaskButtons = document.querySelectorAll('.delete-task');
deleteTaskButtons.forEach(button => {
  button.addEventListener('click', deleteTask);
});

const editTaskButtons = document.querySelectorAll('.edit-task');
editTaskButtons.forEach(button => {
  button.addEventListener('click', updateTask);
});
updateTaskList();