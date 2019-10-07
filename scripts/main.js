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