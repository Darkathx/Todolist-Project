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
    document.addEventListener("DOMContentLoaded", loadTodosToUI);
    secondPart.addEventListener("click", deleteTodo);
    clearAll.addEventListener("click", removeAllTodos);
    todoSearch.addEventListener("keydown", searchTodos);
}

function searchTodos(e) {
    const searchValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");
    listItems.forEach(function(listItem) {
        const text = listItem.textContent.toLowerCase();
        if(text.indexOf(searchValue) === -1) {
            listItem.setAttribute("style", "display:none");
        }
        else {
            listItem.setAttribute("style", "display:block");
        }
    });
}

function removeAllTodos() {
    let listItems = document.querySelectorAll(".list-group-item");
    for(let i = 0; i < listItems.length; i++) {
        listItems[i].remove();
    }
    // OR
    // while(todoList.firstElementChild) {
    //     todoList.removeChild(todoList.firstElementChild);
    // }
    localStorage.setItem("todos", JSON.stringify([]));
}

function deleteTodo(e) {
    if(e.target.className === "fa fa-remove") {
        e.target.parentElement.parentElement.remove();
        removeTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success", "Todo deleted successfully!");
    }
    
}

function removeTodoFromStorage(dtodo, index) {
    let todos = getTodosFromStorage();
    todos.forEach((todo) => {
        if(todo === dtodo) {
            todos.splice(index, 1);
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodosToUI() {
    let todox = getTodosFromStorage();
    for(let i = 0; i < todox.length; i++) {
        UIadder(todox[i]);
    }
}
//adding new todo lines
function addTodo(e) {
    const newTodo = todoInp.value.trim();
    if(newTodo === "") {
        showAlert("danger", "Please do not enter an empty todo!");
    }
    else {
        UIadder(newTodo);
        addToStorage(newTodo);
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
    const remove = document.createElement("i");
    remove.className = "fa fa-remove";
    remove.style = "float:right";
    link.appendChild(remove);
    listItem.className = "list-group-item d-flex justify-content-between";
    listItem.appendChild(document.createTextNode(tba));
    listItem.appendChild(link);
    todoList.appendChild(listItem);
    todoInp.value = "";
}

function getTodosFromStorage() {
    if(localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
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

function addToStorage(tba) {
    let todos;
    todos = getTodosFromStorage();
    todos.push(tba);
    localStorage.setItem("todos", JSON.stringify(todos));
}