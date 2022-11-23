let addButton = document.getElementById("add-button");
const clearCompletedButton = document.getElementById("clear-completed-button");
const emptyButton = document.getElementById("empty-button");
const saveButton = document.getElementById("save-button");

addButton.addEventListener("click", addToDoItem);
clearCompletedButton.addEventListener("click", clearCompletedToDoItems);
emptyButton.addEventListener("click", emptyList);
saveButton.addEventListener("click", saveList);


var toDoEntryBox = document.getElementById("todo-entry-box");
var list = document.getElementById("list");


function addToDoItem() { 
    let entry = toDoEntryBox.value;
    newToDoItem(entry, false);
}
    

function newToDoItem(entry, completed) {
    let element = document.createElement("li");
    let words = document.createTextNode(entry);
    element.appendChild(words);
    list.appendChild(element);
    element.addEventListener("dblclick", toggleToDoItemState);
}

function toggleToDoItemState() {
    if (this.classList.contains("completed")) {
        this.classList.remove("completed");
    } else {
        this.classList.add("completed");
    }
}

function clearCompletedToDoItems() {
    let completedItems = list.getElementsByClassName("completed");

    while (completedItems.length > 0) {
        completedItems.item(0).remove();
    }alert("clear completed button clicked!");
   
}

function emptyList() {
    const toDoElements = list.children;
    while (toDoElements.length > 0) {
        toDoElements.item(0).remove();
    }alert("empty button clicked!");
}

function saveList() {
    var toDos = [];

    for (let i = 0; i < list.children.length; i++) {
        let toDo = list.children.item(i);

        var toDoInfo = {
            "task": toDo.innerText,
            "completed": toDo.classList.contains("completed"),
        };

        toDos.push(toDoInfo);
    }

   localStorage.setItem("toDos", JSON.stringify(toDos));
    alert("save button clicked!");
}

function loadList() {
    if (localStorage.getItem("toDos") !== null) {
        var toDos = JSON.parse(localStorage.getItem("toDos"));

        for (var i = 0; i < toDos.length; i++) {
            var toDo = toDos[i];
            newToDoItem(toDo.task, toDo.completed);
        }
    }
}


 loadList();