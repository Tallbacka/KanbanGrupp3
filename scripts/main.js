

// ------------------------------------------------------------------
// Globals
// ------------------------------------------------------------------
let dragSourceEl = null;


// ------------------------------------------------------------------
// onload functions
// ------------------------------------------------------------------
getById('body').onload = function () {
  getById('columns').style.display = 'none'; //Placeholder

}

// ------------------------------------------------------------------
// Drag and Drop
// ------------------------------------------------------------------

function handleDragStart(ev) {
  this.style.opacity = '0.8';
  dragSourceEl = this;

  ev.dataTransfer.effectAllowed = 'move';
  ev.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragOver(ev) {
  if (ev.preventDefault) {
    ev.preventDefault();
  }
  ev.dataTransfer.dropEffect = 'move';

  return false;
}

function handleDragEnter(ev) {
  this.classList.add('over');
}

function handleDragLeave(ev) {
  this.classList.remove('over');
}

var cols = document.querySelectorAll('#columns .dropTarget');
[].forEach.call(cols, function (col) {
  col.addEventListener('dragstart', handleDragStart, false);
  col.addEventListener('dragenter', handleDragEnter, false);
  col.addEventListener('dragover', handleDragOver, false);
  col.addEventListener('dragleave', handleDragLeave, false);
  col.addEventListener('drop', handleDrop, false);
  col.addEventListener('dragend', handleDragEnd, false);


});

function dragstart_handler(ev) {

  let dt = event.dataTransfer;

  dt.setData("text/html", ev.target.outerHTML);
  dt.setData("text/html", ev.target.innerHTML);
  dt.setData("text/plain", ev.target.innerText);
  ev.dataTransfer.effectAllowed = "move";
  ev.dataTransfer.dropEffect = "move";


}

function handleDrop(ev) {
  if (ev.stopPropagation) {
    ev.stopPropagation();
  }

  if(dragSourceEl !== this){
    dragSourceEl.innerHTML = this.innerHTML;
    this.innerHTML = ev.dataTransfer.getData('text/html');
  }
  return false;
}

function handleDragEnd(ev) {
  [].forEach.call(cols, function (col) {
    col.classList.remove('over');
  });
}

// ------------------------------------------------------------------
// Eventlisteners
// ------------------------------------------------------------------

function login() {
  getById('modalContainer').style.display = 'none'; //Placeholder
  getById('columns').style.display = 'flex'; //Placeholder
}

function logout() {
  getById('modalContainer').style.display = 'block'; //Placeholder
  getById('columns').style.display = 'none'; //Placeholder
}

// ------------------------------------------------------------------
// Helper functions
// ------------------------------------------------------------------

function localGet(key) {
  return localStorage.getItem(key)
}

function localSet(key, value) {
  return localStorage.setItem(key, value)
}
function Fetcher(url) {
  return fetch(url)
    .then(checkStatus)
    .then(response => response.json())
    .catch(error => console.log("Problems with your fetch operation", error))
}

function checkStatus(response) {
  if (response.ok) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}

function sortByPopulation(cityData) {
  cityData.sort(function (a, b) { return b.population - a.population });
  return cityData;
}


function appendText(element, text) {
  return element.innerHTML = text;
}

function setAtt(element, attribute, name) {
  return element.setAttribute(attribute, name)
}

function createNode(element) {
  return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

function getById(ele) {
  return document.getElementById(ele)
}

function getByName(ele) {
  return document.getElementsByName(ele)
}

function removeChilds(parent) {
  while (parent.hasChildNodes()) {
    parent.removeChild(parent.lastChild);
  }
}



//----------------------------Alexander Funktion--------------------------//
//Get id of addBtn, call function addToDo
getById("btnAdd").addEventListener("click", addToDo);
var toDo = document.getElementById("toDo");

function addToDo() {
  //Saves a new id to a variable
  var newId = Date.now();
  toDo.innerHTML += "<div id=\"" + newId + "\" class=\"draggable\" draggable=\"true\" ondragstart=\"dragstart_handler(event)\"></div>";

  var newCol = getById(newId);
  newCol.innerHTML += "Name: <br><input type=\"text\" id=\"toDoHeader\" style=\"width:100%;\">";
  newCol.innerHTML += "Description: <br><input type=\"text\" id=\"toDoDesc\" style=\"width:100%;\">";
  newCol.innerHTML += "<input type=\"submit\" value=\"Spara\" id=\"saveToDo\">";

  //Adds an eventListener to the new button created, calls another function to save value
  getById("saveToDo").addEventListener("click", saveToDo);
  function saveToDo() {
    let toDoName = getById("toDoHeader").value,
      toDoDesc = getById("toDoDesc").value,
      newToDo = getById(newId);
    newToDo.innerHTML = "<h5>" + toDoName + "</h5>";
    newToDo.innerHTML += "<p>" + toDoDesc + "</p>";

    //Adds another button to enable edit
    newToDo.innerHTML += "<input type=\"submit\" value=\"Edit\" id=\"" + newId + "\">";
  }
}

//----------------------------Tero Function: save to localStorage--------------------------//
let userInp = document.getElementById('txtUser');
console.log(userInp);

function saveToLocalStorage() {

  fetch("./json/user.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (userToLocal) {

      for (u = 0; i < userToLocal.length; i++) {

        if (userInp.value === toString(userToLocal[i].username)) {

          const key = userToLocal[i].id;
          const value = userToLocal[i].username;

          localSet(key, value)
        }
      }// End of for
    })
    .catch(error => console.log(JSON.stringify(error)));
}
