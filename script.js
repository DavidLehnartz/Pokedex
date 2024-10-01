'use strict';

/* MAIN SCRIPT */

let offset = 0;
let limit = 20;


//Init (ONLOAD)
function init() {
    fetchPokeData();
}


// Load More Pokemon
function loadMorePokemon() {
    fetchPokeData();
}


// Fetch Pokemon Infos
async function fetchPokeData() { // Gibt mir die standart daten, um details zu bekommen (fetchPokemonDetails(url)) 
    let url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
    let response = await fetch(url);
    let pokeArray = await response.json();

    console.log(pokeArray.results);
    renderPokemonCard(pokeArray.results);
    offset += limit;
}


async function fetchPokemonDetails(url) { // Gibt mir die detail daten wieder
    let response = await fetch(url);  // Detail-URL aufrufen
    let pokemonDetails = await response.json();  // detaildaten holen
    console.log(pokemonDetails);
    return pokemonDetails;  // Gib die Details zurück  
}


async function renderPokemonCard(pokeArray) {
    let pokemonCardRef = document.getElementById('pokemon_card');
    /* pokemonCardRef.innerHTML = ''; */

    for (let indexPokeCard = 0; indexPokeCard < pokeArray.length; indexPokeCard++) {
        let pokemonDetails = await fetchPokemonDetails(pokeArray[indexPokeCard].url);  // holt die details für jedes pokemon
        pokemonCardRef.innerHTML += getpokemonCardTemplate(pokemonDetails);
    }
}


async function renderPokemonMainInfoDialog() {
    let mainInfoContentRef = document.getElementById('species_info');
    mainInfoContentRef.innerHTML = getMainInfoTemplate();
}


// Öffnet den Dialog und füllt ihn mit den Pokémon-Details
async function openDialog(pokemonId) {
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
    let pokemonDetails = await fetchPokemonDetails(url);

    let dialogContentRef = document.getElementById('dialog_pokemon_card');
    dialogContentRef.innerHTML = getpokemonCardDialogTemplate(pokemonDetails); // Füllt den Dialog mit dem ausgewählten Pokemon

    document.getElementById('overlay').classList.remove('d_none');
}


// Close Dialog (ONCLICK)
function closeDialog() {
    document.getElementById('overlay').classList.add('d_none');
}









