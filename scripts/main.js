// ------------------------------------------------------------------
// Globals
// ------------------------------------------------------------------
let dragSourceEl = null;
var kanbans = document.querySelectorAll('.kanban');
var toDoCard;
var todoCol;
var myCol1; //Fetches new id from button pressed
var creatorUsr;
// ------------------------------------------------------------------
// Eventlisteners
// ------------------------------------------------------------------

$(document).ready(() => {
  reloadToDo();
  if (localStorage.getItem('creator') !== null) {
    $('#loginModal').modal('hide');
    document.querySelectorAll('.list-group-item').forEach(element => {
      styleCards(element);
    })
    getById('txtUserName').textContent = localStorage.getItem('creator');
  } else {
    $('#headerContainer, .wrapper').hide(500);
    $('#loginModal').modal({ backdrop: 'static', keyboard: false });
  }
});

$('.btnAdd').click(() => {
  $('#createNewCard').modal('show');
  $("#txtCardHeader").val('')
  $("#txtCardContent").val('')
  $('txtCardHeader').attr('placeholder', '')
})

$('#btnLogout').click(() => {
  $('#loginModal').modal({ backdrop: 'static', keyboard: false });//if click outside the modal, it wont disapear
  $('#headerContainer, .wrapper').hide(500);

})

$('#btnTryAgain').click(() => {
  $('#wrongEnteredInfoModalContainer, #wrapper').modal('hide');
})

function deleteCard(e) {
  e.path[5].remove()
  localStorage.removeItem(e.path[5].id)
  console.log(localStorage);
}

// ------------------------------------------------------------------
// Drag and Drop
// ------------------------------------------------------------------
$(function () {
  $("#newCardModal").draggable();
});

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

      let newId = itemEl.id; //Fetch id for element being dragged
      let newCol = document.getElementById(newId).parentElement.id; //Gets id of new parent el
      let newColId = itemEl.id; //Remove #
      let myInfo = JSON.parse(localStorage.getItem(newColId));
      myInfo.ColID = newCol;
      localStorage.setItem(newColId, JSON.stringify(myInfo));
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

var myCol1 = ""; //Fetches new id from button pressed
function myCol(colValue) {
  myCol1 = colValue;
}

getById('btnSave').addEventListener('click', () => {
  let newId = 'a' + Date.now(),
    dataTargetId = newId.slice(1),
    template = document.querySelector('#card-template'), //selects a template element card from index
    toDoCard = document.importNode(template.content, true), //Clones the element and all its childnodes
    header = getById('txtCardHeader'),
    content = getById('txtCardContent'),
    p = toDoCard.querySelectorAll('p'),
    iButton = toDoCard.querySelectorAll('i'),
    div = toDoCard.querySelectorAll('div'),
    span = toDoCard.querySelector('span'),
    button = toDoCard.querySelector('button'),
    element = toDoCard.querySelector('.card'); // creates an array of all the queried elements

  div[0].id = newId;
  div[3].id = 'b' + dataTargetId;
  iButton[1].id = newId;
  span.textContent = localStorage.getItem('creator');

  button.setAttribute('data-target', '#b' + dataTargetId);
  button.setAttribute('aria-controls', 'b' + dataTargetId);


  if (!isStringNullOrWhiteSpace(header.value)) {
    p[0].textContent = header.value//set header data
    p[1].textContent = content.value//set content data

    // saves info to localstorage
    let myInfo = {};
    myInfo["creator"] = localStorage.getItem('creator')
    myInfo["Name"] = header.value;
    myInfo["Desc"] = content.value;
    myInfo["ID"] = newId;
    myInfo["ColID"] = myCol1;
    localStorage.setItem(newId, JSON.stringify(myInfo));

    todoCol.appendChild(toDoCard)
    styleCards(element);
    header.value = '';
    content.value = '';

    $('#createNewCard').modal('hide');

  } else {
    header.setAttribute('placeholder', 'Ange rubrik för att spara')
  }

  var pointers = document.getElementsByClassName('expandButton');
  for (var i = 0; i < pointers.length; i++) {
    pointers[i].addEventListener('click', function (e) {
      var itemEl = e.item;
      e.target.getElementsByClassName('fa-angle-double-right')[0].classList.toggle('rotated');
    });
  }
})

// ////////////////////////
// End of one big function
// ////////////////////////

//----------------------------Alexander Funktion--------------------------//
//Get id of addBtn, call function addToDo
function editToDo(myId) {
  //Saves object from JSON to myCard
  temp1 = myId.toString();
  temp = temp1.slice(1);

  var myCard = JSON.parse(localStorage.getItem(myId));
  document.getElementById("cardBtn").innerHTML += "<button id=\"editSave\" type=\button\" class=\"btn btn-primary\">Spara</button>";

  let header = getById('txtCardHeader'),
    content = getById('txtCardContent');
    
    document.getElementById("btnSave").style.display = "none";

  header.value = myCard.Name;
  content.value = myCard.Desc;

  $('#createNewCard').modal('show');

  getById("editSave").addEventListener("click", saveEdit);
  function saveEdit() {
    localStorage.removeItem(myId.Name);
    localStorage.removeItem(myId.Desc);
    getById("editSave").remove();
    let myInfo = {};
    myInfo["Name"] = header.value;
    myInfo["Desc"] = content.value;
    myInfo["ID"] = myId;
    myInfo["ColID"] = myCard.ColID;

    let targetDiv = "";
    targetDiv += myId;
    console.log(targetDiv);
    let myNewHeader = document.getElementById(targetDiv).querySelectorAll("p");

    myNewHeader[0].innerHTML = header.value;
    myNewHeader[1].innerHTML = content.value;
    localStorage.setItem(myId, JSON.stringify(myInfo));
    $('#createNewCard').modal('hide');
  }
}

function reloadToDo() {
  //Saves object from JSON to myCard 
  // var usrCard = JSON.parse(localStorage.getItem);
  var mySaved = (Object.keys(localStorage));
  for (var i = 0; i < mySaved.length; i++) {
    if (localStorage.key(i) !== "creator") {
      var myCards = JSON.parse(localStorage.getItem(mySaved[i]));
      var myNewCol = document.getElementById(myCards.ColID);

      let template = document.querySelector('#card-template'), //selects a template element card from index
        toDoCard = document.importNode(template.content, true), //Clones the element and all its childnodes
        p = toDoCard.querySelectorAll('p'),
        iButton = toDoCard.querySelectorAll('i'),
        div = toDoCard.querySelectorAll('div'),
        span = toDoCard.querySelector('span'),
        button = toDoCard.querySelector('button'),
        element = toDoCard.querySelector('.card'), // creates an array of all the queried elements
        temp = myCards.ID.slice(1);

      button.setAttribute('data-target', '#b' + temp);
      button.setAttribute('aria-controls', 'b' + temp);

      p[0].textContent = myCards.Name; //set header data
      p[1].textContent = myCards.Desc; //set content data
      div[0].id = myCards.ID;
      div[3].id = 'b' + temp;
      iButton[1].id = myCards.ID;
      span.textContent = myCards.creator;
      myNewCol.appendChild(toDoCard)
      styleCards(element);
    }
  }
}

//AddToDo
//Removes div with the id of button pressed
//Removes id from localstorage
//----------------------------Tero Function: save to localStorage--------------------------//

let userInp = document.getElementById('txtUser'),
  userPass = document.getElementById('txtPassword'),
  userName = getById('txtUserName').textContent,
  verification = false;

function login() {

  fetch("./json/user.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (userToLocal) {

      for (u = 0; u < userToLocal.length; u++) {

        if (userInp.value === userToLocal[u].username) {

          const key = 'creator';
          const value = userToLocal[u].username;


          localStorage.removeItem('creator');

          localSet(key, value);
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
        $('#headerContainer, .wrapper').show(3000);
        $("#txtUserName").text(userInp.value);
        $("#txtUser").val('')
        $("#txtPassword").val('')
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

