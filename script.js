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


// Fetch Standard Data
async function fetchPokemonData() {
    startLoadingScreen();
    try {
        let url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
        let response = await fetch(url);
        let responseAsJson = await response.json();

        allPokemons.push(...responseAsJson.results);

        renderPokemonCard(responseAsJson.results);

        offset += limit;

    } catch (error) {
        showErrorMessageNetwork();
        console.error(error);
    }
}


// Fetch Pokemon Details
async function fetchPokemonDetails(url) {
    try {
        let response = await fetch(url);

        if (!response.ok) throw new Error("Failed to fetch Pokemon details");
        let pokemonDetails = await response.json();

        return await pokemonDetails;
    } catch (error) {
        console.error(error);
        showErrorMessageNetwork();
    }
}


// Run -> fetchPokeData func.
async function renderPokemonCard(allPokemons) {
    let pokemonCardRef = document.getElementById('pokemon_card');

    for (let indexPokeCard = 0; indexPokeCard < allPokemons.length; indexPokeCard++) {
        let pokemonDetails = await fetchPokemonDetails(allPokemons[indexPokeCard].url);
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

// Open Dialog (ONCLICK)
async function openDialog(pokemonIndex) {
    let pokemonDetails = await fetchPokemonDetails(allPokemons[pokemonIndex].url);

    renderPokemonCardDialog(pokemonDetails);

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
    }, 100);
}


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

// (ONCLICK)
async function showNextPokemon() {
    let currentIndex = parseInt(document.getElementById('dialog_pokemon_card').dataset.currentIndex);
    let nextIndex = currentIndex + 1;

    if (nextIndex >= allPokemons.length) {
        nextIndex = 0;
    }

    openDialog(nextIndex);
}

// (ONCLICK)
async function showPreviousPokemon() {
    let currentIndex = parseInt(document.getElementById('dialog_pokemon_card').dataset.currentIndex);
    let previousIndex = currentIndex - 1;

    if (previousIndex < 0) {
        previousIndex = allPokemons.length - 1; 
    }

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


// Show Error Message Network
function showErrorMessageNetwork() {
    let errorMessage = document.getElementById('error_message');
    errorMessage.classList.remove('d_none');

    let hideScrollBar = document.getElementById('hide_scrollbar');
    hideScrollBar.classList.add('hide_scrollbar');

    renderErrorMessage();
}


// (ONCLICK)
function closeErrorMessageNetwork() {
    let errorMessage = document.getElementById('error_message');
    errorMessage.classList.add('d_none');

    let hideScrollBar = document.getElementById('hide_scrollbar');
    hideScrollBar.classList.add('hide_scrollbar');
}