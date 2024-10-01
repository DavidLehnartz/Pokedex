'use strict';

/* HTML TEMPLATES */


// Pokemon Card Template
function getpokemonCardTemplate(pokemon) {
    return `
            <div onclick="openDialog(${pokemon.id})"  class="card-container type-${pokemon.types[0].type.name}">  
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


// Pokemon Card Dialog Template
function getpokemonCardDialogTemplate(pokemon) {
    return `
            <div class="dialog type-${pokemon.types[0].type.name}">
                <div class="dialog-card-header">
                    <h2>${pokemon.name}</h2>
                    <p># ${pokemon.id}</p>
                </div>
                <div class="dialog-pokemon-image-wrapper">
                    <img class="pokemon-image" src="${pokemon.sprites.other.dream_world.front_default}"
                        alt="${pokemon.name} image">
                </div>
                <div class="dialog-card-type">
                    ${pokemon.types[0].type.name}
                    ${pokemon.types[0].type.name}
                </div>
                <div class="dialog-pokemon-info-wrapper">
                    <div class="dialog-pokemon-info-btns-container">
                      <button class="dialog-pokemon-info-btns">Main</button>
                      <button class="dialog-pokemon-info-btns">Stats</button>
                      <button class="dialog-pokemon-info-btns">Evo</button>
                    </div>
                </div>
                <div id="species_info">
                    <table class="species-wrapper">
                        <tbody >
                            <tr>
                                <td>Height:</td>
                                <td>$a</td>
                            </tr>
                            <tr>
                                <td>Weight:</td>
                                <td>$b</td>
                            </tr>
                            <tr>
                                <td>Base Experience:</td>
                                <td>$c</td>
                            </tr>
                            <tr>
                                <td>$Moves:</td>
                                <td>$d</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <button onclick="closeDialog()" class="dialog-btn">
                    Close
                </button>
           </div>
    `;
}