export class Template {
    static pkmnCart(type, index) {
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

    static typeBtn(type) {
        return /*html*/`
            <div class="type-icon ${type}">${type}</div>
        `
    }
}