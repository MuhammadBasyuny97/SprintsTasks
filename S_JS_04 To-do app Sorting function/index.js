let tasks = [];

const findMostImportantTask = () => {
  let mostPriorityTask = [];
  for (let i = 1; i <= 5; ++i) {
    for (let j = 0; j < tasks.length; ++j) {
      if (tasks[j].priority === i) {
        mostPriorityTask.push(tasks[j]);
        break;
      }
    }
    if (mostPriorityTask.length > 0) break;
  }
  console.log(mostPriorityTask);
  addTasksToTable(mostPriorityTask);
};

const validate = (task, priority) => {
  if (task === "" || task === undefined)
    return alert("Task name is not Valid, Please Enter Valid Name");
  else if (isNaN(priority) || priority < 1 || priority > 5)
    return alert("Priority is not Valid, Please Enter priority from 0 to 5");
  else return true;
};
const edit = (i) => {
  let saveBtn = document.getElementById(`save${i}`);
  let cancelBtn = document.getElementById(`cancel${i}`);
  let editBtn = document.getElementById(`edit${i}`);

  let taskCell = document.getElementById(`taskCell${i}`);
  let priorityCell = document.getElementById(`priorityCell${i}`);

  let footer = document.getElementById("footer");

  /*  taskCell.contentEditable = "true";
  priorityCell.contentEditable = "true"; */
  taskCell.setAttribute("contentEditable", "true");
  priorityCell.setAttribute("contentEditable", "true");

  editBtn.style.display = "none";
  saveBtn.style.display = "inline-block";
  cancelBtn.style.display = "inline-block";
  saveBtn.style.backgroundColor = "yellow";
  cancelBtn.style.backgroundColor = "yellow";

  footer.style.display = "table-row";
};

function save(i) {
  console.log(tasks[i]);
  let taskCell = document.getElementById(`taskCell${i}`);
  let priorityCell = document.getElementById(`priorityCell${i}`);

  let saveBtn = document.getElementById(`save${i}`);
  let cancelBtn = document.getElementById(`cancel${i}`);
  let editBtn = document.getElementById(`edit${i}`);

  if (validate(taskCell.innerHTML, priorityCell.innerHTML)) {
    tasks[i].task = taskCell.innerHTML;
    tasks[i].priority = priorityCell.innerHTML;

    taskCell.setAttribute("contentEditable", "false");
    priorityCell.setAttribute("contentEditable", "false");

    saveBtn.style.display = "none";
    cancelBtn.style.display = "none";
    editBtn.style.display = "inline-block";
  }

  let Save = document.getElementsByClassName("save");
  let j = 0;
  for (let i = 0; i < Save.length; ++i) {
    if (Save[i].style.display !== "none") {
      ++j;
      break;
    }
  }
  if (j === 0) {
    document.getElementById("footer").style.display = "none";
    addTasksToTable(tasks);
  }

  console.log(tasks[i]);
}

const cancel = (i) => {
  document.getElementById(`save${i}`).style.display = "none";
  document.getElementById(`cancel${i}`).style.display = "none";
  document.getElementById(`edit${i}`).style.display = "inline-block";

  let taskCell = document.getElementById(`taskCell${i}`);
  let priorityCell = document.getElementById(`priorityCell${i}`);
  taskCell.innerHTML = tasks[i].task;
  priorityCell.innerHTML = tasks[i].priority;

  taskCell.setAttribute("contentEditable", "false");
  priorityCell.setAttribute("contentEditable", "false");

  let Cancel = document.getElementsByClassName("cancel");
  let j = 0;
  for (let i = 0; i < Cancel.length; ++i) {
    if (Cancel[i].style.display !== "none") {
      ++j;
      break;
    }
  }
  j === 0 ? (document.getElementById("footer").style.display = "none") : " ";
};

const saveAll = () => {
  let Save = document.getElementsByClassName("save");
  for (let i = 0; i < Save.length; ++i) {
    save(i);
  }
  document.getElementById("footer").style.display = "none";
  addTasksToTable(tasks);
};

const addTasksToTable = (Tasks) => {
  //console.log(tasks);
  sort(tasks);
  let row = document.getElementById("row");
  let body = document.getElementById("body");
  body.innerHTML = " ";
  for (let i = 0; i < Tasks.length; ++i) {
    let newRow = body.insertRow(-1);
    let newCellId = newRow.insertCell(0);
    newCellId.innerHTML = i + 1;
    Tasks[i].id = i;
    let newCellTask = newRow.insertCell(1);
    newCellTask.innerHTML = Tasks[i].task;
    newCellTask.setAttribute("id", `taskCell${i}`);
    let newCellPriority = newRow.insertCell(2);
    newCellPriority.innerHTML = Tasks[i].priority;
    newCellPriority.setAttribute("id", `priorityCell${i}`);
    let newCellRemove = newRow.insertCell(3);
    let newBtn1 = document.createElement("button");
    newBtn1.innerText = "Remove";
    newBtn1.value = i;
    newCellRemove.appendChild(newBtn1);

    newCell = newRow.insertCell(4);
    let newBtn2 = document.createElement("button");
    newBtn2.innerText = "Edit";
    newBtn2.value = i;
    newBtn2.setAttribute("class", "edit");
    newBtn2.setAttribute("id", `edit${i}`);
    newBtn2.style.backgroundColor = "orange";
    newCell.appendChild(newBtn2);

    let newBtn3 = document.createElement("button");
    newBtn3.innerText = "Save";
    newBtn3.value = i;
    newBtn3.setAttribute("class", "save");
    newBtn3.setAttribute("id", `save${i}`);
    newBtn3.setAttribute("style", `display:none`);
    newCell.appendChild(newBtn3);

    let newBtn4 = document.createElement("button");
    newBtn4.innerText = "Cancel";
    newBtn4.value = i;
    newBtn4.setAttribute("class", "cancel");
    newBtn4.setAttribute("id", `cancel${i}`);
    newBtn4.setAttribute("style", `display:none`);
    newCell.appendChild(newBtn4);

    newBtn1.addEventListener("click", function () {
      Tasks.splice(newBtn1.value, 1);
      addTasksToTable(Tasks);
    });

    newBtn2.addEventListener("click", function () {
      edit(tasks[i].id);
    });

    newBtn3.addEventListener("click", function () {
      save(tasks[i].id);
    });

    newBtn4.addEventListener("click", function () {
      cancel(tasks[i].id);
    });
  }
};
const sort = (tasks) => {
  let temp = 0;
  for (let i = 0; i < tasks.length; ++i) {
    for (let j = 0; j < tasks.length - 1; ++j) {
      if (tasks[j].priority > tasks[j + 1].priority) {
        temp = tasks[j];
        tasks[j] = tasks[j + 1];
        tasks[j + 1] = temp;
      }
    }
  }
};
const add = () => {
  //console.log(task,priority);
  let task = document.getElementById("task").value;
  task = task.trim();
  let priority = Number(document.getElementById("priority").value);

  if (validate(task, priority)) {
    tasks.push({ task, priority });
    document.getElementById("task").value = " ";
    document.getElementById("priority").value = " ";
  }

  addTasksToTable(tasks);
};
