export class Template {
    static pkmnCart(type) {
        return /*html*/`
            <div class="pkmn-card ${type}">
                <div class="pkmn-content">
                <h2></h2>
                <div class="pkmn-types"></div>
                <span class="pkmn-no"></span>    
                </div>
                <img>
            </div>
        `
    }

    static bigCard() {
        return /*html*/`
            <header>
                <h2></h2>
                <span class="pkmn-no"></span>
                <button id="close-btn">x</button>
                <div class="pkmn-types"></div>
                <img src="static/assets/icons/left.svg" class="arrow arrow-left">
                <img src="static/assets/icons/right.svg" class="arrow arrow-right">
            </header>
            <div class="big-card-data">
                <div class="data-btns"></div>
                <div class="raw-data"></div>
            </div>
            <img class="pkmn-img">
        `
    }

    static typeBtn(type) {
        return /*html*/`
            <div class="type-icon ${type}">${type}</div>
        `
    }

    static dataBtn(type, name) {
        return /*html*/`
            <button class="data-btn ${type}">${name}</button>
        `
    }

    static tableAbount(pokemon) {
        return /*html*/`
            <table>
                <tr>
                    <td class="key">Weight:</td>
                    <td class="value ta-right">${pokemon.kgWeight}</td>
                </tr>
                <tr>
                    <td class="key">Height:</td>
                    <td class="value ta-right">${pokemon.cmHeight}</td>
                </tr>
                <tr>
                    <td class="key">Abilities:</td>
                    <td class="value">${pokemon.textAbilities}</td>
                </tr>
            </table>
        `
    }

    static statsProgress(pokemon) {
        return /*html*/`
            <div class="pkmn-stats">
                <div class="stat">
                    <div class="progress-label">Health:</div>
                    <div class="progress-bar ${pokemon.types[0]}-stat">
                        <div class="progress-thumb ${pokemon.types[0]}" style="width:${pokemon.hp}%;"></div>
                    </div>
                </div>
                <div class="stat">
                    <div class="progress-label">Attack:</div>
                    <div class="progress-bar ${pokemon.types[0]}-stat">
                        <div class="progress-thumb ${pokemon.types[0]}" style="width:${pokemon.attack}%;"></div>
                    </div>
                </div>
                <div class="stat">
                    <div class="progress-label">Defense:</div>
                    <div class="progress-bar ${pokemon.types[0]}-stat">
                        <div class="progress-thumb ${pokemon.types[0]}" style="width:${pokemon.defense}%;"></div>
                    </div>
                </div>
                <div class="stat">
                    <div class="progress-label">Spec:</div>
                    <div class="progress-bar ${pokemon.types[0]}-stat">
                        <div class="progress-thumb ${pokemon.types[0]}" style="width:${pokemon.spec}%;"></div>
                    </div>
                </div>
                <div class="stat">
                    <div class="progress-label">Speed:</div>
                    <div class="progress-bar ${pokemon.types[0]}-stat">
                        <div class="progress-thumb ${pokemon.types[0]}" style="width:${pokemon.speed}%;"></div>
                    </div>
                </div>
            </div>
        `
    }

    static moveTable() {
        return /*html*/`
            <table id="moves"></table>
        `
    }

    static moveTableHead() {
        return /*html*/`
            <th>Level</th>
            <th>Move</th>
        `
    }

    static singleMove(move) {
        return /*html*/`
            <td class="level ta-right">${move.level}</td>
            <td class="move-name">${move.name}</td>
        `
    }
}