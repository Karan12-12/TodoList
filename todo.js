let tasks = [];
const taskList2 = document.getElementById("list2");
const taskList = document.getElementById("list");
const addTaskInput = document.getElementById("add");
const taskCounter = document.getElementById("tasks-counter");
const forAdd = document.getElementById("addTasks");
const clearAll = document.getElementById("clear-btn");
const completedCounter = document.getElementById("completed-counter");

function renderList() {
  taskList.innerHTML = "";
  taskList2.innerHTML = "";
  var completed = 0;
  var left = 0;
  for (let i = 0; i < tasks.length; i++) {
    const li = document.createElement("li");
    li.innerHTML = `
        <input type="checkbox" id="${tasks[i].id}" ${
      tasks[i].completed ? "checked" : ""
    } class="custom-checkbox">
        <label for="${tasks[i].id}" id="label">${tasks[i].text}</label>
        <img src="bin.png" class="delete" data-id="${tasks[i].id}" />
      `;
    taskList.append(li);

    if (tasks[i].completed == true) {
      const li2 = document.createElement("li");
      li2.innerHTML = `
      <i class="fa-solid fa-hand-point-right"></i>
      <label id="label2">${tasks[i].text}</label>`;
      taskList2.append(li2);
      completed++;
    }
    if (tasks[i].completed == false) {
      left++;
    }
  }

  completedCounter.innerHTML = completed;
  taskCounter.innerHTML = left;
}

function toggleTask(taskId) {
  const task = tasks.filter(function (task) {
    return task.id == taskId;
  });
  if (task.length > 0) {
    const currentTask = task[0];
    currentTask.completed = !currentTask.completed;

    renderList();
    return;
  }
}

function deleteTask(taskId) {
  const newTask = tasks.filter(function (task) {
    return task.id != taskId;
  });
  tasks = newTask;
  renderList();
}

function addTask(task) {
  if (task) {
    tasks.push(task);
    renderList();
    return;
  }
  showNotification("task cannot be added");
}

function showNotification(text) {
  alert(text);
}

function handleInputKeypress() {
  const text = addTaskInput.value;
  if (!text) {
    showNotification("task text can not be empty");
    return;
  }
  const task = {
    text,
    id: Date.now().toString(),
    completed: false,
  };

  addTaskInput.value = "";
  addTask(task);
}

function handleClickListener(e) {
  const target = e.target;
  if (target.className == "delete") {
    const taskId = target.dataset.id;
    deleteTask(taskId);
    return;
  } else if (target.className == "custom-checkbox") {
    const taskId = target.id;
    toggleTask(taskId);
    return;
  }
}

function ClearAll() {
  tasks = [];
  renderList();
}

/*add event listener */
forAdd.addEventListener("click", handleInputKeypress);

document.addEventListener("click", handleClickListener);

clearAll.addEventListener("click", ClearAll);
