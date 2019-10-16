// ------------------------------------------------------------------
// Globals
// ------------------------------------------------------------------
let dragSourceEl = null;
var kanbans = document.querySelectorAll('.kanban');
var toDoCard;
var todoCol;

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
      styleCards(itemEl);
    },
  })
}

function styleCards(element) {
  switch (element.parentNode.id) {
    case "icebox":
      element.childNodes[1].style.background = 'rgb(152, 199, 228)'
      break;

    case "todo":
      element.childNodes[1].style.background = 'rgb(187, 152, 228)'
      break;

    case "doing":
      element.childNodes[1].style.background = 'rgb(228, 189, 152)'
      break;

    case "test":
      element.childNodes[1].style.background = 'rgb(228, 152, 171)'
      break;

    default:
      element.childNodes[1].style.background = 'rgb(163, 228, 152)'
      break;
  }
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


// function tryAgain() {
//   getById('wrongEnteredInfoModalContainer').style.display = 'none'; //Placeholder
//   getById('wrapper').style.display = 'none'; //Placeholder
// }

// function login() {


//   document.getElementsByClassName('wrapper')[0].style.display = 'block'; //placeholder
// }

$('.btnAdd').click(() => {
  $('#createNewCard').modal('show');
  header = getById('txtCardHeader')
  header.setAttribute('placeholder', '')
})

$('#btnLogout').click(() => {
  $('#loginModal').modal('show');
  $("#wrapper").removeAttr("style").hide();
})

$('#btnTryAgain').click(() => {
  $('#wrongEnteredInfoModalContainer').modal('hide');
  $('#wrapper').modal('hide');
})



$(window).on('load', function () {
  document.querySelectorAll('.list-group-item').forEach(element => {
    styleCards(element);
  });
})


var toDoButtons = document.getElementsByClassName('btnAdd')
for (let button of toDoButtons) {
  button.addEventListener('click', () => {
    switch (button.parentElement.previousElementSibling.id) {
      case "icebox":
        todoCol = button.parentElement.previousElementSibling;
        break;
      case "todo":
        todoCol = button.parentElement.previousElementSibling;
        break;
      case "doing":
        todoCol = button.parentElement.previousElementSibling;
        break;
      case "test":
        todoCol = button.parentElement.previousElementSibling;
        break;
      default:
        todoCol = button.parentElement.previousElementSibling;
        break;
    }
  })
}

// check this for more info about templates
//https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template
getById('btnSave').addEventListener('click', () => {
  let newId = 'a' + Date.now(),
    template = document.querySelector('#card-template'), //selects a template element card from index
    toDoCard = document.importNode(template.content, true), //Clones the element and all its childnodes
    header = getById('txtCardHeader'),
    content = getById('txtCardContent'),
    p = toDoCard.querySelectorAll('p'),
    div = toDoCard.querySelectorAll('div'),
    button = toDoCard.querySelector('button'),
    element = toDoCard.querySelector('.card'); // creates an array of all the queried elements

  div[0].id = '#' + newId;
  div[3].id = newId;

  button.setAttribute('data-target', '#' + newId);
  button.setAttribute('aria-controls', newId);

  if (!isStringNullOrWhiteSpace(header.value)) {
    p[0].textContent = header.value//set header data
    p[1].textContent = content.value//set content data
  
    todoCol.appendChild(toDoCard)
    styleCards(element);
    header.value = '';
    content.value = '';
  
    $('.btnEdit').click(() => {
      console.log('tryck');
      $('#createNewCard').modal('show');
      header.setAttribute('placeholder', '')
    })
  }else{
    console.log('?????');
      header.setAttribute('placeholder', 'Du måste minst ange rubrik för att spara')
  } 
})

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




// ------------------------------------------------------------------
// Helper functions
// ------------------------------------------------------------------

function isStringNullOrWhiteSpace(str) {
  return str === undefined || str === null
    || typeof str !== 'string'
    || str.match(/^ *$/) !== null;
}


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
