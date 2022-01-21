const userInput = document.querySelector("#input-task");
const addTask_btn = document.querySelector("#add-task-button");
const taskList = document.querySelector("#task-list");
const deleteBtn = document.querySelector(".delete-btn");
const task = document.querySelectorAll(".task");
const checkbox = document.querySelectorAll(".checkbox");

let tasksList = [];

let todo;
// creating id for each item

date = new Date();
id = (Date.now() + "").slice(-10);

function renderTask(task) {
  // clear everything inside <ul> with class=todo-items
  taskList.innerHTML = "";

  // run through each item inside todos
  tasksList.forEach(function (task) {
    // check if the item is completed
    const checked = task.completed ? "checked" : null;
    console.log(task);

    const li = document.createElement("li");
    li.setAttribute("class", "item");
    li.setAttribute("data-key", task.id);

    // if item is completed, then add a class to <li> called 'checked', which will add line-through style
    if (task.completed === true) {
      li.classList.add("checked");
    }

    let html = `<li class="item" data-key="${task.id}"> <input class ='checkbox' type="checkbox" ${checked}>
        <label><span class="task" name ="${task.name}">${task.name}</span></label>
        <button class="delete-btn"></button></li>`;

    taskList.insertAdjacentHTML("beforeend", html);
  });
}

function addNewTask() {
  const task = userInput.value;
  if (task !== "") {
    todo = {
      id: Date.now(),
      name: task,
      completed: false,
    };
  } else {
    alert("Please input valid task!");
    return;
  }

  console.log(todo);

  // push new task to array
  tasksList.push(todo);
  console.log(tasksList);

  //tasks.forEach(t => renderTask(t)

  //uploading storage with new task
  setLocalStorage(tasksList);
  // clean input box value
  userInput.value = "";
}

addTask_btn.addEventListener("click", addNewTask);

// clear user input field after 1 sec
userInput.addEventListener("click", function () {
  setTimeout(() => (userInput.value = ""), 100);
});

// implementing localStorage

function setLocalStorage(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasksList)); // convert object to string since browser api requires srting
  renderTask(taskList);
}

function getLocalStorage() {
  const data = JSON.parse(localStorage.getItem("tasks"));

  if (!data) return;

  tasksList = data;

  renderTask(taskList);
}

function toggle(id) {
  tasksList.forEach(function (task) {
    // use == not ===, because here types are different. One is number and other is string
    if (task.id == id) {
      // toggle the value
      task.completed = !task.completed;
    }
  });
  setLocalStorage(taskList);
}

// deletes a todo from todos array, then updates localstorage and renders updated list to screen
function deleteTodo(id) {
  // filters out the <li> with the id and updates the todos array
  tasksList = tasksList.filter(function (task) {
    // use != not !==, because here types are different. One is number and other is string
    return task.id != id;
  });
  // update the localStorage
  setLocalStorage(taskList);
}

getLocalStorage();

taskList.addEventListener("click", function (event) {
  // check if the event is on checkbox
  if (event.target.type === "checkbox") {
    // toggle the state
    toggle(event.target.parentElement.getAttribute("data-key"));
  }
  // check if that is a delete-button
  if (event.target.classList.contains("delete-btn")) {
    // get id from data-key attribute's value of parent <li> where the delete-button is present
    deleteTodo(event.target.parentElement.getAttribute("data-key"));
  }
});
