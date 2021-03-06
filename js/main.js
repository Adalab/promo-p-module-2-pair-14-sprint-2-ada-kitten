'use strict';


/* Elementos que usamos en el HTML */
const newFormElement = document.querySelector('.js-new-form');
const listElement = document.querySelector('.js-list');
const searchButton = document.querySelector('.js-button-search');
const buttonAdd = document.querySelector('.js-btn-add');
const buttonCancelForm = document.querySelector('.js-btn-cancel');
const inputDesc = document.querySelector('.js-input-desc');
const inputPhoto = document.querySelector('.js-input-photo');
const inputName = document.querySelector('.js-input-name');
const inputRace = document.querySelector('.js-input-race');
const linkNewFormElememt = document.querySelector('.js-button-new-form');
const labelMesageError = document.querySelector('.js-label-error');
const input_search_desc = document.querySelector('.js_in_search_desc');
const input_search_race = document.querySelector('.js_in_search_race');

//Objetos con cada gatito

let kittenDataList = [];

//Funciones
function renderKitten(kittenData) {
    const kitten = `<li class="card">
    <article>
      <img
        class="card_img"
        src=${kittenData.url}
        alt="gatito"
      />
      <h3 class="card_title">${kittenData.name}</h3>
      <h3 class="card_race">${kittenData.race}</h3>
      <p class="card_description">
      ${kittenData.desc}
      </p>
    </article>
    </li>`;
    return kitten;
}

function renderKittenList(kittenDataList) {
    listElement.innerHTML = "";
    for (const kittenItem of kittenDataList) {
        listElement.innerHTML += renderKitten(kittenItem);
    }
}

//Mostrar/ocultar el formulario
function showNewCatForm() {
    newFormElement.classList.remove('collapsed');
}
function hideNewCatForm() {
    newFormElement.classList.add('collapsed');
}

function handleClickNewCatForm(event) {
    event.preventDefault();
    if (newFormElement.classList.contains('collapsed')) {
        showNewCatForm();
    } else {
        hideNewCatForm();
    }
}

//Adicionar nuevo gatito
function addNewKitten(event) {
    event.preventDefault();
    const valueDesc = inputDesc.value;
    const valuePhoto = inputPhoto.value;
    const valueName = inputName.value;
    const valueRace = inputRace.value;
    const newKittenDataObject = {
        name: valueName,
        desc: valueDesc,
        photo: valuePhoto,
        race: valueRace,
    };

    let kittenDataList = [];
    
    if (valueDesc === "" && valuePhoto === "" && valueName === "") {
        labelMesageError.innerHTML = "Debe rellenar todos los valores";
    } else {
        if (valueDesc !== "" && valuePhoto !== "" && valueName !== "") {
            labelMesageError.innerHTML = "Mola! Un nuevo gatito en Adalab!";
            inputName.value = "";
            inputPhoto.value = "";
            inputDesc.value = "";
        }
    }

    kittenDataList.push(newKittenDataObject);
    console.log(kittenDataList);
}

//Cancelar la b??squeda de un gatito
function cancelNewKitten(event) {
    event.preventDefault();
    newFormElement.classList.add("collapsed");
    inputDesc.value = "";
    inputPhoto.value = "";
    inputName.value = "";
}

//Filtrar por descripci??n
function filterKitten(event) {
    event.preventDefault();
    const descrSearchText = input_search_desc.value;
    listElement.innerHTML = "";

    // const kittenListFiltered = kittenDataList.filter((cat) => cat.kittenItem.desc === descrSearchText);

    for (const kittenItem of kittenDataList) {
        if (kittenItem.desc.includes(descrSearchText)) {
            listElement.innerHTML += renderKitten(kittenItem);
        }
    }
}

//Mostrar el listado de gatitos en el HTML
renderKittenList(kittenDataList);

//Eventos
linkNewFormElememt.addEventListener("click", handleClickNewCatForm);
searchButton.addEventListener("click", filterKitten);
buttonAdd.addEventListener("click", addNewKitten);
buttonCancelForm.addEventListener("click", cancelNewKitten);


// Agregar un nuevo gatito al listado (lecci??n 9 - m??todos arrays)

// Filtrar listado de gatitos (lecci??n 10.2 - Filter)
function filterKitten(ev) {

    // const descrSearchText = input_search_desc.value;
    // const raceSearchText = input_search_race.value;
    // listElement.innerHTML = "";

    // const kittenListFiltered = kittenDataList.filter((cat) => cat.descrSearchText === );

    //Modifica el c??digo:
    //Haz un filter sobre el listado de gatitos
    //Vuelve a pintar el listado de gatitos filtrados en el HTML.
}

// Obtener listado de gatitos desde el servidor
// Guardar en local storage
const GITHUB_USER = 'AnaliaRio';
const SERVER_URL = `https://adalab-api.herokuapp.com/api/kittens/${GITHUB_USER}`;

const kittenListStored = JSON.parse(localStorage.getItem('kittensList'));

if (kittenListStored) {
    kittenDataList = kittenListStored;
    renderKittenList(kittenDataList);
}
else {

fetch(SERVER_URL, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
})
    .then((response) => response.json())
    .then((data) => {
        kittenDataList = data.results;
        renderKittenList(kittenDataList);
    });
    .catch(error => {
        console.error(error);
    });

    console.log(kittenDataList);
}