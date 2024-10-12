'use strict';

/* EVOLUTION CHAIN */


// Funktion zum Abrufen der Evolutionskette für ein bestimmtes Pokémon
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
            <img src="${basePokemon.sprites.other.dream_world.front_default}" alt="${currentEvo.species.name}">
            <p>${currentEvo.species.name}</p>
        </div>`;

    // Gehe durch die Evolutionsstufen
    while (currentEvo.evolves_to.length > 0) {
        currentEvo = currentEvo.evolves_to[0];  // Nächste Stufe der Evolution
        let nextEvo = await fetchPokemonDetailsByName(currentEvo.species.name);  // Details der nächsten Evolution

        evoHtml += `<div class="evo-arrow">→</div>`;
        evoHtml += `
            <div class="evo-stage">
                <img src="${nextEvo.sprites.other.dream_world.front_default}" alt="${currentEvo.species.name}">
                <p>${currentEvo.species.name}</p>
            </div>`;
    }

    return evoHtml;
} 

//******************************** */


async function renderPokemonEvoInfoDialog(pokemonId) {
    // Abrufen der Pokémon-Details und Evolutionskette
    let pokemonDetails = await fetchPokemonDetails(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    
    let speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`;
    let speciesResponse = await fetch(speciesUrl);
    let speciesData = await speciesResponse.json();
    
    let evolutionChainUrl = speciesData.evolution_chain.url;
    let evolutionResponse = await fetch(evolutionChainUrl);
    let evolutionData = await evolutionResponse.json();

    // HTML-Container leeren
    let evoInfoContentRef = document.getElementById('species_info');
    evoInfoContentRef.innerHTML = '';

    // Verarbeiten der Evolutionskette
    let currentEvo = evolutionData.chain;
    let evoStage1 = {
        name: currentEvo.species.name,
        image: pokemonDetails.sprites.other.dream_world.front_default
    };

    let evoStage2 = null;
    let evoStage3 = null;

    // Erste Evolutionsstufe prüfen und zuweisen
    getSecondEvoStage();

    // Zweite Evolutionsstufe prüfen und zuweisen
    getThirdEvoStage();

    // Übergibt die Evolutionsstufen ans Template
    evoInfoContentRef.innerHTML = getEvoInfoTemplate(evoStage1, evoStage2, evoStage3);
} 



// Get Second Evo Stage
async function getSecondEvoStage() {
    if (currentEvo.evolves_to.length > 0) {
        currentEvo = currentEvo.evolves_to[0];
        let nextEvoDetails = await fetchPokemonDetailsByName(currentEvo.species.name);
        evoStage2 = {
            name: currentEvo.species.name,
            image: nextEvoDetails.sprites.other.dream_world.front_default
        };
    }
}

// Get Third Evo Stage
async function getThirdEvoStage() {
    if (currentEvo.evolves_to.length > 0) {
        currentEvo = currentEvo.evolves_to[0];
        let finalEvoDetails = await fetchPokemonDetailsByName(currentEvo.species.name);
        evoStage3 = {
            name: currentEvo.species.name,
            image: finalEvoDetails.sprites.other.dream_world.front_default
        };
    }
}



function getEvoInfoTemplate(evoStage1, evoStage2, evoStage3) {
    return `
        <div class="evolution-chain-wrapper">
            <div class="evo-stage">
                <img src="${evoStage1.image}" alt="${evoStage1.name}">
                <p>${evoStage1.name}</p>
            </div>
            
            ${evoStage2 ? `
                <div class="evo-arrow">→</div>
                <div class="evo-stage">
                    <img src="${evoStage2.image}" alt="${evoStage2.name}">
                    <p>${evoStage2.name}</p>
                </div>
            ` : ''}

            ${evoStage3 ? `
                <div class="evo-arrow">→</div>
                <div class="evo-stage">
                    <img src="${evoStage3.image}" alt="${evoStage3.name}">
                    <p>${evoStage3.name}</p>
                </div>
            ` : ''}
        </div>
    `;
}


// kommt zur getpokemonCardDialogTemplate(pokemon)
<button 
onclick="renderPokemonEvoInfoDialog(${pokemon.id})" class="dialog-pokemon-info-btns">
Evo
</button>
