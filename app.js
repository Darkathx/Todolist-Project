//Selecting all elements 
const form = document.querySelector("#todo-form");
const todoInp = document.querySelector("#todoinp");
const todoList = document.querySelector(".todo-list");
const todoBody = document.querySelector(".todo-body");
const todoSearch = document.querySelector(".todosearch");
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
    UIadder(newTodo);
    
    
    e.preventDefault();
}
//helper function to add todo list element to UI
function UIadder(tba) {
    const listItem = document.createElement("li");
    const link = document.createElement("a");
    link.href = "#";
    link.className = "remove-item";
    link.innerHTML = "remove";
    listItem.className = "list-item";
    listItem.appendChild(document.createTextNode(tba));
    listItem.appendChild(link);
    todoList.appendChild(listItem);
}