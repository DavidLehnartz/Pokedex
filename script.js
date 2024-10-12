'use strict';

/* MAIN SCRIPT */


let allPokemons = [];
let offset = 0;
let limit = 40;


//Init (ONLOAD)
function init() {
    loadPokemon();
}


// Load Pokemons
function loadPokemon() {
    try {
        fetchPokemonData();
    } catch (error) {
        showErrorMessageNetwork();
        console.log(error);
    }
}


async function fetchPokemonData() {
    startLoadingScreen();
    try {
        let url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
        let response = await fetch(url);
        let responseAsJson = await response.json();
        allPokemons.push(...responseAsJson.results);
        renderPokemonCard(responseAsJson.results);
        offset += limit;
        console.log(allPokemons);
        
    } catch (error) {
        showErrorMessageNetwork();
        console.error(error);
    }
}


// Fetch Pokemon Details Test ******************
async function fetchPokemonDetails(url) { // Gibt mir die detail daten wieder
    try {
        let response = await fetch(url);  // Detail-URL aufrufen
        if (!response.ok) throw new Error("Failed to fetch Pokemon details");
        let pokemonDetails = await response.json();  // detaildaten holen
        console.log(pokemonDetails);
        
        return await pokemonDetails;
    } catch (error) {
        console.error(error);
        showErrorMessageNetwork();
    }
    

}


// Run -> fetchPokeData func.
async function renderPokemonCard(allPokemons) {
    let pokemonCardRef = document.getElementById('pokemon_card');
    /* pokemonCardRef.innerHTML = ''; */

    for (let indexPokeCard = 0; indexPokeCard < allPokemons.length; indexPokeCard++) {
        let pokemonDetails = await fetchPokemonDetails(allPokemons[indexPokeCard].url);  // holt die details für jedes pokemon
        pokemonCardRef.innerHTML += getpokemonCardTemplate(pokemonDetails);
    }
    endLoadingScreen();
}


// Run -> openDialog func.
function renderPokemonCardDialog(pokemonDetails) {
    let dialogContentRef = document.getElementById('dialog_pokemon_card');
    dialogContentRef.innerHTML = getpokemonCardDialogTemplate(pokemonDetails);

    renderPokemonMainInfoDialog(pokemonDetails.id);

    document.getElementById('overlay').classList.remove('d_none');
}


async function openDialog(pokemonIndex) {
    // Lade die Pokémon-Daten anhand des Index aus allPokemons
    let pokemonDetails = await fetchPokemonDetails(allPokemons[pokemonIndex].url);

    // Zeige die Details des Pokémon an
    renderPokemonCardDialog(pokemonDetails);

    // Speichere den aktuellen Index im Dialog-Element, damit wir wissen, wo wir sind
    document.getElementById('dialog_pokemon_card').dataset.currentIndex = pokemonIndex;

    hideScrollBar();
}


// Close Dialog (ONCLICK)
function closeDialog() {
    document.getElementById('overlay').classList.add('d_none');

    showScrollBar();
}


// Run -> renderPokemonCardDialog func. ->  (ONCLICK/STANDARD)
async function renderPokemonMainInfoDialog(pokemonId) {
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
    let pokemonDetails = await fetchPokemonDetails(url);

    let mainInfoContentRef = document.getElementById('species_info');
    mainInfoContentRef.innerHTML = '';
    mainInfoContentRef.innerHTML = getMainInfoTemplate(pokemonDetails);
}


// (ONCLICK)
async function renderPokemonStatsInfoDialog(pokemonId) {
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
    let pokemonDetails = await fetchPokemonDetails(url);

    let StatsInfoContentRef = document.getElementById('species_info');
    StatsInfoContentRef.innerHTML = '';
    StatsInfoContentRef.innerHTML = getStatsInfoTemplate(pokemonDetails);

    setTimeout(() => {
        renderSkillBars(pokemonDetails);
    }, 100);  // Timeout von 100ms
}


// (ONCLICK)
/* async function renderPokemonEvoChainDialog() {
    
} */


// Run -> renderPokemonStatsInfoDialog func.
function renderSkillBars(pokemonDetails) {
    let maxStatValue = 255;

    let hpPercent = (pokemonDetails.stats[0].base_stat / maxStatValue) * 100;
    document.getElementById('hp_bar').style.width = `${hpPercent}%`;

    let attackPercent = (pokemonDetails.stats[1].base_stat / maxStatValue) * 100;
    document.getElementById('attack_bar').style.width = `${attackPercent}%`;

    let defensePercent = (pokemonDetails.stats[2].base_stat / maxStatValue) * 100;
    document.getElementById('defense_bar').style.width = `${defensePercent}%`;

    let speedPercent = (pokemonDetails.stats[5].base_stat / maxStatValue) * 100;
    document.getElementById('speed_bar').style.width = `${speedPercent}%`;
}


async function showNextPokemon() {
    // Hole den aktuellen Index aus dem Dialog-Element
    let currentIndex = parseInt(document.getElementById('dialog_pokemon_card').dataset.currentIndex);

    // Berechne den Index des nächsten Pokémon
    let nextIndex = currentIndex + 1;

    // Wenn wir das letzte Pokémon erreicht haben, wieder zum ersten Pokémon springen
    if (nextIndex >= allPokemons.length) {
        nextIndex = 0;
    }

    // Zeige das nächste Pokémon an
    openDialog(nextIndex);
}


async function showPreviousPokemon() {
    // Hole den aktuellen Index aus dem Dialog-Element
    let currentIndex = parseInt(document.getElementById('dialog_pokemon_card').dataset.currentIndex);

    // Berechne den Index des vorherigen Pokémon
    let previousIndex = currentIndex - 1;

    // Wenn wir beim ersten Pokémon sind, zum letzten Pokémon springen
    if (previousIndex < 0) {
        previousIndex = allPokemons.length - 1;      // Das letzte Pokémon hat den Index allPokemons.length - 1
    }

    console.log(currentIndex);

    // Zeige das vorherige Pokémon an
    openDialog(previousIndex);
}


// Start Loading Screen
function startLoadingScreen() {
    let startLoadingScreen = document.getElementById('loading_screen');
    startLoadingScreen.classList.remove('d_none');

    hideScrollBar();
}


// End Loading Screen
function endLoadingScreen() {
    let endLoadingScreen = document.getElementById('loading_screen');
    endLoadingScreen.classList.add('d_none');

    showScrollBar();
}


// Show Scroll Bar
function showScrollBar() {
    let showScrollBar = document.getElementById('hide_scrollbar');
    showScrollBar.classList.remove('hide_scrollbar');
}


// Hide Scroll Bar
function hideScrollBar() {
    let hideScrollBar = document.getElementById('hide_scrollbar');
    hideScrollBar.classList.add('hide_scrollbar');
}


// Render Error Message Network
function renderErrorMessage() {
    let errorMessage = document.getElementById('dialog_error_message');
    errorMessage.innerHTML = getErrorMessageTemplate();
}


// Try To Get Pokemon After Problem Occured
function tryToGetPokemonAfterFail() {
    let errorMessage = document.getElementById('error_message');
    errorMessage.classList.add('d_none');

    showScrollBar();
    loadPokemon();
}


//Show Error Message Network
function showErrorMessageNetwork() {
    let errorMessage = document.getElementById('error_message');
    errorMessage.classList.remove('d_none');

    let hideScrollBar = document.getElementById('hide_scrollbar');
    hideScrollBar.classList.add('hide_scrollbar');

    renderErrorMessage();
}


// Close Error Message Network
function closeErrorMessageNetwork() {
    let errorMessage = document.getElementById('error_message');
    errorMessage.classList.add('d_none');

    let hideScrollBar = document.getElementById('hide_scrollbar');
    hideScrollBar.classList.add('hide_scrollbar');
}