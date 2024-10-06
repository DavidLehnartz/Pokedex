'use strict';

/* MAIN SCRIPT */

let allPokemons = [];

let currentPokemonIndex = 0;

let offset = 0;

let limit = 40;

let evoChain = [];


//Init (ONLOAD)
function init() {
    loadPokemon();
    /* fetchPokemonData(); */
    /* fetchPokemonEvoChain(); */
}


// Load More Pokemon (ONCLICK BUTTON)
/* function loadMorePokemon() {
    fetchPokemonData();

} */


// Load Pokemons
function loadPokemon() {

    startLoadingScreen();
    try {
        fetchPokemonData();
    } catch (error) {
        console.log(error);
    } finally {
        /* renderPokemonCard(); */
        /*   endLoadingScreen(); */
    }
}


// (ONLOAD) Fetch Pokemon Infos
async function fetchPokemonData() { // Gibt mir die standart daten, um details zu bekommen (fetchPokemonDetails(url)) 
    let url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
    let response = await fetch(url);
    let responseAsJson = await response.json();

    allPokemons.push(...responseAsJson.results)
    console.log(allPokemons);
    renderPokemonCard(responseAsJson.results);
    offset += limit;
}


// Fetch Pokemon Details
async function fetchPokemonDetails(url) { // Gibt mir die detail daten wieder
    let response = await fetch(url);  // Detail-URL aufrufen
    let pokemonDetails = await response.json();  // detaildaten holen
    console.log(pokemonDetails);
    return pokemonDetails;  // Gibt die Details zurück name, stats, ability und so weiter
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


// (ONCLICK) Öffnet den Dialog und füllt ihn mit den Pokémon-Details
async function openDialog(pokemonId) {
    currentPokemonIndex = allPokemons.findIndex(pokemon => pokemon.id === pokemonId);

    let url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
    let pokemonDetails = await fetchPokemonDetails(url);

    renderPokemonCardDialog(pokemonDetails);
    document.getElementById('hide_scrollbar').classList.add('hide_scrollbar');
}


// Close Dialog (ONCLICK)
function closeDialog() {
    document.getElementById('overlay').classList.add('d_none');
    document.getElementById('hide_scrollbar').classList.remove('hide_scrollbar');
}


// Run -> renderPokemonCardDialog func. ->  (ONCLICK)
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
async function showNextPokemon() {  // ******** Irgendwas stimmt hier nicht ?????
    if (currentPokemonIndex < allPokemons.length - 1) {
        currentPokemonIndex++;  
    } else {
        currentPokemonIndex = 0; 
    }

    let pokemon = allPokemons[currentPokemonIndex]; 
    let pokemonDetails = await fetchPokemonDetails(pokemon.url); 

     renderPokemonCardDialog(pokemonDetails);   
}

// (ONCLICK)
async function showPreviousPokemon() {    // ******** Irgendwas stimmt hier nicht ?????
    if (currentPokemonIndex > 0) {
        currentPokemonIndex--;  // 
    } else {
        currentPokemonIndex = allPokemons.length - 1;  
    }

    let pokemon = allPokemons[currentPokemonIndex]; 
    let pokemonDetails = await fetchPokemonDetails(pokemon.url);  

    renderPokemonCardDialog(pokemonDetails);  
}


// Start Loading Screen
function startLoadingScreen() {
    let startLoadingScreen = document.getElementById('loading_screen');
    startLoadingScreen.classList.remove('d_none');

    let hideScrollBar = document.getElementById('hide_scrollbar');
    hideScrollBar.classList.add('hide_scrollbar');
}


// End Loading Screen
function endLoadingScreen() {
    let endLoadingScreen = document.getElementById('loading_screen');
    endLoadingScreen.classList.add('d_none');

    let hideScrollBar = document.getElementById('hide_scrollbar');
    hideScrollBar.classList.remove('hide_scrollbar');
}















// *************** EVO CHAIN
/* async function fetchPokemonEvoChain() {
    let urlEvoChain = `https://pokeapi.co/api/v2/evolution-chain?limit=10000&offset=0`;
    let response = await fetch(urlEvoChain);
    let responseAsJson = await response.json();

    console.log(responseAsJson);

    evoChain.push(...responseAsJson.results);

    console.table(evoChain);
}


async function renderPokemonEvoInfoDialog() {
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
    let pokemonDetails = await fetchPokemonDetails(url);

    let evoInfoContentRef = document.getElementById('species_info');
    evoInfoContentRef.innerHTML = '';
    evoInfoContentRef.innerHTML = getEvoInfoTemplate(pokemonDetails);
} */





//***************************** */


/* // Funktion zum Abrufen der Evolutionskette für ein bestimmtes Pokémon
async function fetchPokemonEvolutionChain(pokemonId) {
    // 1. Hole die Pokémon-Spezies-Daten, um an die Evolutionskette zu kommen
    let speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`;
    let speciesResponse = await fetch(speciesUrl);
    let speciesData = await speciesResponse.json();
    
    // 2. Hole die Evolution-Chain-Daten von der URL, die in den Species-Daten steht
    let evolutionChainUrl = speciesData.evolution_chain.url;
    let evolutionResponse = await fetch(evolutionChainUrl);
    let evolutionData = await evolutionResponse.json();

    return evolutionData;
}


async function fetchPokemonDetailsByName(pokemonName) {
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    let response = await fetch(url);
    let pokemonDetails = await response.json();

    return pokemonDetails;
}


async function renderPokemonEvoInfoDialog(pokemonId) {
    // Hole die Evolutionskette für das ausgewählte Pokémon
    let evolutionChain = await fetchPokemonEvolutionChain(pokemonId);

    // Erstelle das HTML für die Evolutionskette
    let evoHtml = await getEvoInfoTemplate(evolutionChain);

    // Setze die Evolutionskette ins HTML
    let evoInfoContentRef = document.getElementById('species_info');
    evoInfoContentRef.innerHTML = ''; // Leere den Bereich für neue Inhalte
    evoInfoContentRef.innerHTML = evoHtml; // Setze die Evolution Chain ins HTML
}




async function getEvoInfoTemplate(evolutionChain) {
    let evoHtml = '';

    let currentEvo = evolutionChain.chain;

    // Basis-Pokémon (erste Entwicklungsstufe) mit Bild und Name
    let basePokemon = await fetchPokemonDetailsByName(currentEvo.species.name);
    evoHtml += `
        <div class="evo-stage">
            <img src="${basePokemon.sprites.other['official-artwork'].front_default}" alt="${currentEvo.species.name}">
            <p>${currentEvo.species.name}</p>
        </div>`;

    // Gehe durch die Evolutionsstufen
    while (currentEvo.evolves_to.length > 0) {
        currentEvo = currentEvo.evolves_to[0];  // Nächste Stufe der Evolution
        let nextEvo = await fetchPokemonDetailsByName(currentEvo.species.name);  // Details der nächsten Evolution

        evoHtml += `<div class="evo-arrow">→</div>`;
        evoHtml += `
            <div class="evo-stage">
                <img src="${nextEvo.sprites.other['official-artwork'].front_default}" alt="${currentEvo.species.name}">
                <p>${currentEvo.species.name}</p>
            </div>`;
    }

    return evoHtml;
} */




