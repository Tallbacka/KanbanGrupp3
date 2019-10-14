// ------------------------------------------------------------------
// onload functions
// ------------------------------------------------------------------
getById('body').onload = function () {
getById('formatContainer').style.display = 'none'; //Placeholder

}

// ------------------------------------------------------------------
// Eventlisteners
// ------------------------------------------------------------------
function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
  
  function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
  }

function login(){
  getById('modalContainer').style.display = 'none'; //Placeholder
  getById('formatContainer').style.display = 'flex'; //Placeholder
}

function logout() {
  getById('modalContainer').style.display = 'block'; //Placeholder
  getById('formatContainer').style.display = 'none'; //Placeholder
  }
  // ----------------------------------------------------------------
// Fetches data from local JSON files
// ------------------------------------------------------------------

// ------------------------------------------------------------------
// Localstorage related functions
// ------------------------------------------------------------------

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
  toDo.innerHTML += "<div id=\"" + newId + "\" class=\"dragable\" draggable=\"true\" ondragstart=\"drag(event)\"></div>";

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
    newToDo.innerHTML += "<button onclick=\"removeCard(this)\" value=\" " + newId + " \" id=\"removeBtn\">Delete</button>"; 

    //New object with key "Name" and "desc"
    let myInfo = {};
    myInfo["Name"] = toDoName;
    myInfo["Desc"] = toDoDesc;
    myInfo["ColID"] = "";
    
    //Saves into localstorage
    localStorage.setItem(newId, JSON.stringify(myInfo));
    console.log(myInfo);

    //Spara in i object
    //Adds another button to enable edit
    newToDo.innerHTML += "<button onclick=\"editToDo(this)\" value=\" " + newId + " \" id=\"editBtn\">Edit</button>"; 
  }
}

function editToDo(myId) {
  //Saves object from JSON to myCard 
  var myCard = JSON.parse(localStorage.getItem(Number(myId.value)));
  
  //Gets id from the button pressed
  var newCol = getById(Number(myId.value));

  //Lets user edit his card
  newCol.innerHTML = "Name: <br><input type=\"text\" id=\"toDoHeader\" value=\"" + myCard.Name + "\" style=\"width:100%;\">";
  newCol.innerHTML += "Description: <br><input type=\"text\" id=\"toDoDesc\" value=\"" + myCard.Desc + "\"style=\"width:100%;\">";
  newCol.innerHTML += "<button id=\"saveEdit\">Spara</button>";
  getById("saveEdit").addEventListener("click", saveEdit);

  //Calls the save function
  function saveEdit() {
    let toDoName = getById("toDoHeader").value,
        toDoDesc = getById("toDoDesc").value,
        newToDo = getById(Number(myId.value));
    newToDo.innerHTML = "<h5>" + toDoName + "</h5>";
    newToDo.innerHTML += "<p>" + toDoDesc + "</p>";
    newToDo.innerHTML += "<button onclick=\"editToDo(this)\" value=\" " + Number(myId.value) + " \" id=\"editBtn\">Edit</button>"; 
    //Removes id from localstorage then sets a new one 
    localStorage.removeItem(Number(myId.value));
  
    let myInfo = {};
    myInfo["Name"] = toDoName;
    myInfo["Desc"] = toDoDesc;
    newToDo.innerHTML += "<button onclick=\"removeCard(this)\" value=\" " + Number(myId.value) + " \" id=\"removeBtn\">Delete</button>"; 
    localStorage.setItem(Number(myId.value), JSON.stringify(myInfo));
  
  }
}
//Removes div with the id of button pressed
//Removes id from localstorage
function removeCard(myId) {
  getById(Number(myId.value)).remove();
  localStorage.removeItem(Number(myId.value));
  alert("Card Removed");
}