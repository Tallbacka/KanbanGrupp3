// ------------------------------------------------------------------
// Globals
// ------------------------------------------------------------------
let dragSourceEl = null;
var kanbans = document.querySelectorAll('.kanban');
var toDo;

// ------------------------------------------------------------------
// Drag and Drop
// ------------------------------------------------------------------


kanbans.forEach(kanban => {
  sortable(kanban);
});

function sortable(kanban) {
  Sortable.create(kanban, {
    group: {
      name: 'group',
      Put: true,
      pull: true
    },
    animation: 100,
    ghostClass: "sortable-ghost",
    draggable: '.list-group-item',
    onStart: function (/**Event*/e) {
      e.oldIndex;  // element index within parent
    },
    onChoose: function (/**Event*/e) {
      e.oldIndex;  // element index within parent

    },
    onEnd: function (/**Event*/e) {
      var itemEl = e.item;  // dragged HTMLElement

      switch (itemEl.parentNode.id) {
        case "icebox":
          itemEl.childNodes[1].style.background = 'rgb(152, 199, 228)'
          break;

        case "todo":
          itemEl.childNodes[1].style.background = 'rgb(187, 152, 228)'
          break;

        case "doing":
          itemEl.childNodes[1].style.background = 'rgb(228, 189, 152)'
          break;

        case "test":
          itemEl.childNodes[1].style.background = 'rgb(228, 152, 171)'
          break;

        default:
          itemEl.childNodes[1].style.background = 'rgb(163, 228, 152)'
          break;
      }
    },
  })
}


// ------------------------------------------------------------------
// Eventlisteners
// ------------------------------------------------------------------
// $(window).on('load',function(){
//   $('#loginModal').modal('show');
// })

// window.addEventListener('load', (e) => {
//   document.getElementsByClassName('wrapper')[0].style.display = 'none';
// });


function tryAgain() {
  getById('wrongEnteredInfoModalContainer').style.display = 'none'; //Placeholder
  getById('wrapper').style.display = 'none'; //Placeholder
}

function login() {
  $('#loginModal').modal('hide');

  document.getElementsByClassName('wrapper')[0].style.display = 'block'; //placeholder
}

function logout() {
  $('#loginModal').modal('show');
  $("#wrapper").removeAttr("style").hide();
}

function newToDoCard() {
  $('#createNewCard').modal('show');
}

window.addEventListener('load', (e) => {

  var expandButtons = document.getElementsByClassName('expandButton');
  for (let button of expandButtons) {
    switch (button.parentNode.parentNode.id) {
      case "icebox":
        button.style.background = 'rgb(152, 199, 228)'
        break;
      case "todo":
        button.style.background = 'rgb(187, 152, 228)'
        break;

      case "doing":
        button.style.background = 'rgb(228, 189, 152)'
        break;

      case "test":
        button.style.background = 'rgb(228, 152, 171)'
        break;

      default:
        button.style.background = 'rgb(163, 228, 152)'
        break;
    }
  }
});

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


var toDoButtons = document.getElementsByClassName('btnAdd')

for (let button of toDoButtons) {
  button.addEventListener('click', () => {
    switch (button.parentElement.previousElementSibling.id) {
      case "icebox":
        addToDo(button.parentElement.previousElementSibling)

        break;
      case "todo":
        addToDo(button.parentElement.previousElementSibling)

        break;

      case "doing":
        addToDo(button.parentElement.previousElementSibling)
        break;

      case "test":
        addToDo(button.parentElement.previousElementSibling)
        break;

      default:
        addToDo(button.parentElement.previousElementSibling)
        break;
    }
  })
}
// check this for more info about templates
//https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template
function addToDo(parentElement) {
  var template = document.querySelector('#card-template'); //selects a template element card from index
  console.log(template);
  var cardClone = document.importNode(template.content, true); //Clones the element and all its childnodes
  console.log(cardClone);
  var p = cardClone.querySelectorAll('p') // creates an array of all the queried elements
  p[0].textContent = getById('txtCardHeader').content; //set header data
  p[1].textContent = getById('txtCardContent').content; //set content data

  parentElement.appendChild(cardClone);

}

//----------------------------Alexander Funktion--------------------------//
//Get id of addBtn, call function addToDo

// function addToDo(parentElement) {
//   //Saves a new id to a variable
//   var newId = Date.now();
//   parentElement.insertAdjacentHTML('afterbegin', "<div id=\"" + newId + "\" class=\"dragable\" draggable=\"true\" ondragstart=\"drag(event)\"></div>")
//   // parentElement.innerHTML += "<div id=\"" + newId + "\" class=\"dragable\" draggable=\"true\" ondragstart=\"drag(event)\"></div>";

//   var newCol = getById(newId);
//   newCol.innerHTML += "Name: <br><input type=\"text\" id=\"toDoHeader\" style=\"width:100%;\">";
//   newCol.innerHTML += "Description: <br><input type=\"text\" id=\"toDoDesc\" style=\"width:100%;\">";
//   newCol.innerHTML += "<input type=\"submit\" value=\"Spara\" id=\"saveToDo\">";

//   //Adds an eventListener to the new button created, calls another function to save value
// getById("saveToDo").addEventListener("click", saveToDo);

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
//AddToDo
//Removes div with the id of button pressed
//Removes id from localstorage
function removeCard(myId) {
  getById(Number(myId.value)).remove();
  localStorage.removeItem(Number(myId.value));
  alert("Card Removed");
}

//----------------------------Tero Function: save to localStorage--------------------------//

let userInp = document.getElementById('txtUser');
let userPass = document.getElementById('txtPassword');

let verification = false;

function login() {

  fetch("./json/user.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (userToLocal) {

      for (u = 0; u < userToLocal.length; u++) {

        if (userInp.value === userToLocal[u].username) {

          const key = userToLocal[u].id;
          const value = userToLocal[u].username;

          localSet(key, value)
        }// End of if
      }// End of for
    })
    .catch(error => console.log(JSON.stringify(error)));

  //----------------------------Tero Function: verify user & password--------------------------//

  fetch("./json/user.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (verifyUser) {

      for (v = 0; v < verifyUser.length; v++) {

        if (userInp.value === verifyUser[v].username && userPass.value === verifyUser[v].password) {
          let verification = true;
          return verification;
        }// End of if

      }// End of for

      return verification;
    })
    .then(function (verification) {

      if (verification === false) {
        // getById("wrongEnteredInfoModalContainer").style.display = "block";
        $('#wrongEnteredInfoModalContainer').modal('show');
      }
      else if (verification === true) {
        $('#loginModal').modal('hide');
        document.getElementsByClassName('wrapper')[0].style.display = 'block';
        // getById("modalContainer").style.display = "none";
        // getById("headerContainer").style.display = "block";
        // getById("formatContainer").style.display = "block";
      }

    })
    .catch(error => console.log(error));
  //master
}
