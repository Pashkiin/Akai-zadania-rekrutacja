
const pokemonsContainer = document.querySelector(".pokemons");
const form = document.querySelector("form");

function summonPokemon(i,t) {
    let cell = document.createElement("div");
    let img = document.createElement("img");
    cell.setAttribute("class", "pokemon");
    cell.classList.add(pokemons[i].types[0]);  
    cell.innerText = t[i].name;
    img.setAttribute("src", t[i].image);
    img.setAttribute("class", "image");
    cell.appendChild(img);
    pokemonsContainer.appendChild(cell);
}

function renderPokemons(t) {
    pokemonsContainer.innerHTML = '';
    const pLen = t.length;
    for (let i = 0; i < pLen; i++) {
        summonPokemon(i,t);
    }
}

function filterByInput(i) {
    let search = document.getElementById("pokemon-name");
    let name = pokemons[i].name;
    if (name.toLowerCase().includes(search.value.toLowerCase())) {
        return true;
    } else if (search.value === '') {
        return true;
    }
    return false;
}

function filterByType(i) {
    let pokeTypesLen = pokemons[i].types.length;
    for (let j = 0; j < pokeTypesLen; j++) {
        if (document.getElementById(pokemons[i].types[j]).checked) {
            return true;
        }
    }
    return false;
}

function filterPokemons(pokemons) {
    let filteredPokemons = [];
    const pLen = pokemons.length;
    for (let i = 0; i < pLen; i++) {
        if (filterByInput(i) && filterByType(i)) {
            filteredPokemons.push(pokemons[i]);
        }
    }
    return filteredPokemons;
}

function resetCheckboxes() {
    var allCheckboxes = document.getElementsByClassName("checkbox");
    for (var i = 0; i < allCheckboxes.length; i++) {
        allCheckboxes[i].checked = false;
    }
}

function resetInput(){
    document.getElementById("pokemon-name").value = '';
}

function submitForm(event) {
    event.preventDefault();

    renderPokemons(filterPokemons(pokemons));
}

function resetFilters(event) {
    event.preventDefault();
    resetCheckboxes();
    resetInput();
    renderPokemons(filterPokemons(pokemons));
}

function setFilters(event) {
    event.preventDefault();
    var allCheckboxes = document.getElementsByClassName("checkbox");
    for (var i = 0; i < allCheckboxes.length; i++) {
        allCheckboxes[i].checked = true;
    }
    renderPokemons(filterPokemons(pokemons));
}

renderPokemons(pokemons);
form.addEventListener("input", submitForm);
form.addEventListener("checkbox", submitForm);
document.getElementById("checkmark-reset").addEventListener("click", resetFilters);
document.getElementById("checkmark-set").addEventListener("click", setFilters);
