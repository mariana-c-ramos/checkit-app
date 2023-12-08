const tbody = document.querySelector('tbody');
const addForm = document.querySelector('.add-form');
const inputTask = document.querySelector('.input-task');

const fetchTasks = async () => {
  const response = await fetch('http://localhost:3000/tasks');
  const tasks = await response.json();
  return tasks;
}

const addTask = async (event) => {
  event.preventDefault();

  const task = { title: inputTask.value };

  await fetch('http://localhost:3000/tasks', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });

  loadTasks();
  inputTask.value= '';
}

const formateDate = (dateUTC) => {
  const options = { dateStyle: 'long', timeStyle: 'short'}
  const date = new Date(dateUTC).toLocaleString('en',options);
  return date;
}

const createElement = (tag, innerText = '', innerHTML = '') => {
  const element = document.createElement(tag);

  if(innerText){
    element.innerText = innerText;
  }
  if(innerHTML){
    element.innerHTML = innerHTML;
  }

  return element;
}

const createSelect = (value) => {
  const options = `
  <option value="in_queue">In Queue</option>
  <option value="in_progress">In Progress</option>
  <option value="completed">Completed</option>
  `;
  
  const select = createElement('select', '', options);
  select.value = value;
  return select;
}

const createRow = (task) => {
  const { id, title, created_at, status } = task;

  // create a row
  const tr = createElement('tr');

  // create blocks from row
  const tdTitle = createElement('td', title);
  const tdCreatedAt = createElement('td', formateDate(created_at));
  const tdStatus = createElement('td');
  const tdActions = createElement('td');

  // create specific elemetns
  const select = createSelect(status);
  const editBtn = createElement('button', '', '<span class="material-symbols-outlined">edit</span>');
  const deleteBtn = createElement('button', '', '<span class="material-symbols-outlined">delete</span>');

  // add css classes
  editBtn.classList.add('btn-action');
  deleteBtn.classList.add('btn-action');

  // append elements to specific blocks
  tdStatus.appendChild(select);
  tdActions.appendChild(editBtn);
  tdActions.appendChild(deleteBtn);

  // append elements to row
  tr.appendChild(tdTitle);
  tr.appendChild(tdCreatedAt);
  tr.appendChild(tdStatus);
  tr.appendChild(tdActions);

  return tr;
}

const loadTasks = async () => {
  const tasks = await fetchTasks();

  tbody.innerHTML = '';

  tasks.forEach((task) => {
    const tr = createRow(task);
    tbody.appendChild(tr);
  })
}

addForm.addEventListener('submit', addTask);
loadTasks();