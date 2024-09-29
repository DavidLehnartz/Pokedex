'use strict';

/* MAIN SCRIPT */


//Init (ONLOAD)
function init() {
    fetchPokeData();
}


// Fetch Pokemon Infos
async function fetchPokeData() { // Gibt mir die standart daten, um details zu bekommen (fetchPokemonDetails(url)) 
    let url = 'https://pokeapi.co/api/v2/pokemon?limit=100&offset=0';
    let response = await fetch(url);
    let pokeArray = await response.json();

    console.log(pokeArray.results);
    renderPokemonCard(pokeArray.results);
}


async function fetchPokemonDetails(url) { // Gibt mir die detail daten wieder
    let response = await fetch(url);  // Detail-URL aufrufen
    let pokemonDetails = await response.json();  // detaildaten holen
    console.log(pokemonDetails);
    return pokemonDetails;  // Gib die Details zurück  
}


async function renderPokemonCard(pokeArray) {
    let pokemonCardRef = document.getElementById('pokemon_card');
    pokemonCardRef.innerHTML = '';

    for (let indexPokeCard = 0; indexPokeCard < pokeArray.length; indexPokeCard++) {
        let pokemonDetails = await fetchPokemonDetails(pokeArray[indexPokeCard].url);  // holt die details für jedes pokemon
        pokemonCardRef.innerHTML += getpokemonCardTemplate(pokemonDetails);
    }
}


// Pokemon Card Template
function getpokemonCardTemplate(pokemon) {
    return `
            <div class="card-container type-${pokemon.types[0].type.name}">  
                <div class="card-header">
                    <h2>${pokemon.name}</h2>
                    <p># ${pokemon.id} </p> 
                </div>
                <div class="pokemon-image-wrapper"> 
                   <img class="pokemon-image" src="${pokemon.sprites.other.dream_world.front_default}" alt="${pokemon.name} image">
                </div>
                <div class="card-footer">  
                ${pokemon.types[0].type.name}
                ${pokemon.types[0].type.name}
                </div>
            </div>
    `;
}