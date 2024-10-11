'use strict';

/* FILTER */


// Überwacht die Eingabe im Suchfeld und entscheidet, ob alle Pokémon angezeigt oder gefiltert werden sollen
function getMatchingPokemon() {
    let input = document.getElementById('search_pokemon').value.toUpperCase();

    // Zeige alle Pokémon, wenn weniger als 3 Buchstaben eingegeben sind
    if (input.length < 3) {
        showAllPokemon();  // Funktion, die alle Pokémon anzeigt
    } else {
        filterPokemonByName(input);  // Funktion, die Pokémon nach Namen filtert
    }
}


// Zeigt alle Pokémon-Karten an
function showAllPokemon() {
    let pokemonCards = document.querySelectorAll('.card-container');
    pokemonCards.forEach(card => {
        card.style.display = '';  // Alle Karten anzeigen

        checkIfNoPokemonFound(true);
    });
}


// Filtert die Pokémon-Karten nach dem eingegebenen Namen
function filterPokemonByName(input) {
    let pokemonCards = document.querySelectorAll('.card-container');
    let foundAny = false;

    pokemonCards.forEach(card => {
        let pokemonName = card.querySelector('h2').textContent.toUpperCase();  // Pokémon-Name im Header
        if (pokemonName.includes(input)) {
            card.style.display = '';  // Zeige die Karte an, wenn sie passt
            foundAny = true;
        } else {
            card.style.display = 'none';  // Blende die Karte aus, wenn sie nicht passt
        }
    });

    checkIfNoPokemonFound(foundAny);
}


// Clear Input
function clearInput() {
    document.getElementById('search_pokemon').value = '';

    showAllPokemon();
}


function checkIfNoPokemonFound(foundAny) {
    let noPokemonMessage = document.getElementById('no_pokemon_found');

    // Wenn keine Pokémon gefunden wurden, zeige die Nachricht an, ansonsten verstecke sie
    if (!foundAny) {
        noPokemonMessage.style.display = 'block';
    } else {
        noPokemonMessage.style.display = 'none';
    }
}





