export class Template {
    static pkmnCart(type) {
        return /*html*/`
            <div class="pkmn-card ${type}">
                <h2></h2>
                <div class="pkmn-types"></div>
                <img>
                <span class="pkmn-no"></span>
            </div>
        `
    }

    static typeBtn(type) {
        return /*html*/`
            <div class="type-icon ${type}">${type}</div>
        `
    }
}