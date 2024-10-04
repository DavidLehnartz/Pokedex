'use strict';

/* MAIN SCRIPT */

let allPokemons = [];

let currentPokemonIndex = 0;

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

    allPokemons.push(...pokeArray.results)
    console.log(allPokemons);
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


function renderPokemonCardDialog(pokemonDetails) {
    let dialogContentRef = document.getElementById('dialog_pokemon_card');
    dialogContentRef.innerHTML = getpokemonCardDialogTemplate(pokemonDetails);  // Setze die neuen Details

    renderPokemonMainInfoDialog(pokemonDetails.id);  // Aktualisiere den Main-Info-Bereich

    document.getElementById('overlay').classList.remove('d_none');
}


async function renderPokemonMainInfoDialog(pokemonId) {
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
    let pokemonDetails = await fetchPokemonDetails(url);

    let mainInfoContentRef = document.getElementById('species_info');
    mainInfoContentRef.innerHTML = '';
    mainInfoContentRef.innerHTML = getMainInfoTemplate(pokemonDetails);
}


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


async function renderPokemonEvoInfoDialog(pokemonId) {
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
    let pokemonDetails = await fetchPokemonDetails(url);

    let evoInfoContentRef = document.getElementById('species_info');
    evoInfoContentRef.innerHTML = '';
    evoInfoContentRef.innerHTML = getEvoInfoTemplate(pokemonDetails);
}


// Öffnet den Dialog und füllt ihn mit den Pokémon-Details
async function openDialog(pokemonId) {
    currentPokemonIndex = allPokemons.findIndex(pokemon => pokemon.id === pokemonId);

    let url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
    let pokemonDetails = await fetchPokemonDetails(url);

   renderPokemonCardDialog(pokemonDetails);
}


// Close Dialog (ONCLICK)
function closeDialog() {
    document.getElementById('overlay').classList.add('d_none');
}


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
        if (currentPokemonIndex < allPokemons.length - 1) {
            currentPokemonIndex++;  // Gehe zum nächsten Pokémon
        } else {
            currentPokemonIndex = 0;  // Gehe zum ersten Pokémon, wenn du am Ende bist
        }
    
        let pokemon = allPokemons[currentPokemonIndex];  // Hole das Pokémon aus der Liste
        let pokemonDetails = await fetchPokemonDetails(pokemon.url);  // Hole die Details dieses Pokémons
    
        renderPokemonCardDialog(pokemonDetails);  // Aktualisiere den Dialog
    }
    

async function showPreviousPokemon() {
    if (currentPokemonIndex > 0) {
        currentPokemonIndex--;  // Gehe zum vorherigen Pokémon
    } else {
        currentPokemonIndex = allPokemons.length - 1;  // Gehe zum letzten Pokémon, wenn du am Anfang bist
    }

    let pokemon = allPokemons[currentPokemonIndex];  // Hole das Pokémon aus der Liste
    let pokemonDetails = await fetchPokemonDetails(pokemon.url);  // Hole die Details dieses Pokémons

    renderPokemonCardDialog(pokemonDetails);  // Aktualisiere den Dialog
}