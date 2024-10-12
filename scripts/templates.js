'use strict';

/* HTML TEMPLATES */


// Pokemon Card Template
function getpokemonCardTemplate(pokemon) {
    return `
            <div onclick="openDialog(${pokemon.id})" class="card-container type-${pokemon.types[0].type.name}">  
                <div class="card-header">
                    <h2>${pokemon.name}</h2>
                    <p># ${pokemon.id} </p> 
                </div>
                <div class="pokemon-image-wrapper"> 
                   <img class="pokemon-image" src="${pokemon.sprites.other.dream_world.front_default}" 
                       alt="${pokemon.name} image">  
                </div>
                
                <div class="type-icon-wrapper"> 
                      <img class="type-icons" src="./assets/icons/${pokemon.types[0].type.name}.svg" 
                      alt="${pokemon.types[0].type.name} icon">
                   
                      ${pokemon.types[1] ? `<img class="type-icons" src="./assets/icons/${pokemon.types[1].type.name}.svg" 
                      alt="${pokemon.types[1].type.name} icon"> ` : ''}
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
                    <img onclick="showPreviousPokemon()" class="back-next-img" src="./assets/icons/backward.png" 
                        alt="backward">
                    <img class="pokemon-image-dialog" src="${pokemon.sprites.other.dream_world.front_default}"
                        alt="${pokemon.name} image">
                    <img onclick="showNextPokemon()" class="back-next-img" src="./assets/icons/forward.png" 
                        alt="forward">
                </div>
                <div class="dialog-card-type">
                
                     <img class="type-icons-dialog" src="./assets/icons/${pokemon.types[0].type.name}.svg" 
                      alt="${pokemon.types[0].type.name} icon">

                    ${pokemon.types[1] ? `<img class="type-icons-dialog" src="./assets/icons/${pokemon.types[1].type.name}.svg" 
                      alt="${pokemon.types[1].type.name} icon"> ` : ''}
                </div>
                <div class="dialog-pokemon-info-wrapper">
                    <div class="dialog-pokemon-info-btns-container">
                      <button 
                        onclick="renderPokemonMainInfoDialog(${pokemon.id})" class="dialog-pokemon-info-btns">
                        Main
                      </button>
                      <button 
                        onclick="renderPokemonStatsInfoDialog(${pokemon.id})" class="dialog-pokemon-info-btns">
                        Stats
                      </button>
                    </div>
                </div>

                <div id="species_info"></div>

                <div class="close-btn-wrapper">
                    <button onclick="closeDialog()" class="dialog-btn">
                       Close
                    </button>
                </div>
            </div>
    `;
}


// Render Main Info In Dialog
function getMainInfoTemplate(pokemon) {
    return `
            <table class="species-main-wrapper">
                <tbody>
                    <tr class="tr-main-info">
                        <td>Height:</td>
                        <td>${(pokemon.height*10)/100} m</td>
                    </tr>
                    <tr class="tr-main-info">
                        <td>Weight:</td>
                        <td>${(pokemon.weight*10)/100} kg</td>
                    </tr>
                    <tr class="tr-main-info">
                        <td>Base Experience:</td>
                        <td>${pokemon.base_experience}</td>
                    </tr>
                    <tr class="tr-main-info">
                        <td>Main Move:</td>
                        <td>${pokemon.moves[0].move.name}</td>
                    </tr>
                </tbody>
            </table>
    `;
}


// Render Stats Info In Dialog
function getStatsInfoTemplate(pokemon) {
    return `
            <table class="species-stats-wrapper">
                <tbody>
                    <tr class="tr-stats-info">
                        <td class="td-stats-info-left">${pokemon.stats[0].stat.name}:</td>
                        <td class="td-stats-info-right">
                         <div id="hp_bar" class="skill-bar-fill type-${pokemon.types[0].type.name}"></div>
                        </td>
                    </tr>
                    <tr class="tr-stats-info">
                        <td class="td-stats-info-left">${pokemon.stats[1].stat.name}:</td>
                        <td class="td-stats-info-right">
                         <div id="attack_bar" class="skill-bar-fill type-${pokemon.types[0].type.name}"></div>
                        </td>
                    </tr>
                    <tr class="tr-stats-info">
                        <td class="td-stats-info-left">${pokemon.stats[2].stat.name}:</td>
                        <td class="td-stats-info-right">
                         <div id="defense_bar"  class="skill-bar-fill type-${pokemon.types[0].type.name}"></div>
                        </td>
                    </tr>    
                    <tr class="tr-stats-info">
                        <td class="td-stats-info-left">${pokemon.stats[5].stat.name}:</td>
                        <td class="td-stats-info-right">
                         <div id="speed_bar" class="skill-bar-fill type-${pokemon.types[0].type.name}"></div>
                        </td>
                    </tr>
                </tbody>
            </table>            
    `;
}


// Error Message Template
function getErrorMessageTemplate() {
    return `
           <div class="dialog-error-message-wrapper">
                <img class="error-icon" src="./assets/icons/warning.png" alt="error"/>
                <div class="error-text">
                  <img onclick="closeErrorMessageNetwork()" class="close-img" src="./assets/icons/close-white.png" alt="close"/>
                  <h1 class="main-text">Ooops !</h1>
                  <p>Something went wrong. A network error occured.</p>
                  <div class="try-again-btn-wrapper">
                    <button onclick=" tryToGetPokemonAfterFail()" class="try-again-btn">
                      Try Again
                    </button>
                  </div>
                </div>
           </div>
    `;
}