// ------------------------------------------------------------------
// Globals
// ------------------------------------------------------------------
let dragSourceEl = null;
var kanbans = document.querySelectorAll('.kanban');

// ------------------------------------------------------------------
// Drag and Drop
// ------------------------------------------------------------------

// Complete SortableJS (with all plugins)


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

function login() {
  getById('modalContainer').style.display = 'none'; //Placeholder
  getById('columns').style.display = 'flex'; //Placeholder
}

function logout() {
  getById('modalContainer').style.display = 'block'; //Placeholder
  getById('columns').style.display = 'none'; //Placeholder
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
