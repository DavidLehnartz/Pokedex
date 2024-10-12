'use strict';

/* FILTER */


// Shows All Pokemon If Matched
function getMatchingPokemon() {
    let input = document.getElementById('search_pokemon').value.toUpperCase();

    if (input.length < 3) {
        showAllPokemon();
    } else {
        filterPokemonByName(input);
    }
}


// Shows All Pokemon
function showAllPokemon() {
    let pokemonCards = document.querySelectorAll('.card-container');
    pokemonCards.forEach(card => {
        card.style.display = '';

        checkIfNoPokemonFound(true);
    });
}


// Filter Pokemon
function filterPokemonByName(input) {
    let pokemonCards = document.querySelectorAll('.card-container');
    let foundAny = false;

    pokemonCards.forEach(card => {
        let pokemonName = card.querySelector('h2').textContent.toUpperCase();
        if (pokemonName.includes(input)) {
            card.style.display = '';
            foundAny = true;
        } else {
            card.style.display = 'none';
        }
    });

    checkIfNoPokemonFound(foundAny);
}


// Clear Input
function clearInput() {
    document.getElementById('search_pokemon').value = '';

    showAllPokemon();
}


// Show Text If No Pokemons Found
function checkIfNoPokemonFound(foundAny) {
    let noPokemonMessage = document.getElementById('no_pokemon_found');

    if (!foundAny) {
        noPokemonMessage.style.display = 'block';
    } else {
        noPokemonMessage.style.display = 'none';
    }
}