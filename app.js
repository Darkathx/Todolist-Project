//Selecting all elements 
const form = document.querySelector("#todo-form");
const todoInp = document.querySelector("#todoinp");
const todoList = document.querySelector(".list-group");
const todoBody = document.querySelector(".todo-body");
const todoSearch = document.querySelector("#todosearch");
const clearAll = document.querySelector(".clearall");
const secondPart = document.querySelectorAll(".todo-body")[1];

eventListeners();

function eventListeners() {
    // Adding all event listeners
    form.addEventListener("submit", addTodo);
}
//adding new todo lines
function addTodo(e) {
    const newTodo = todoInp.value.trim();
    if(newTodo === "") {
        showAlert("danger", "Please do not enter an empty todo!");
    }
    else {
        UIadder(newTodo);
        showAlert("success", "Todo added successfully");
    }
    
    
    
    e.preventDefault();
}
//helper function to add todo list element to UI
function UIadder(tba) {
    const listItem = document.createElement("li");
    const link = document.createElement("a");
    link.href = "#";
    link.className = "remove";
    link.innerHTML = "<i class='bi bi-trash'></i>";
    listItem.className = "list-group-item";
    listItem.appendChild(document.createTextNode(tba));
    listItem.appendChild(link);
    todoList.appendChild(listItem);
    todoInp.value = "";
}

function showAlert(type, message) {
    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    todoBody.appendChild(alert);
    setTimeout(function() {
        alert.remove();
    }, 1000);
}