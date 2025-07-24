import { Template } from "./templates.js";

export class Pokemon {
    cmHeight;
    kgWeight;
    constructor (name, types, img, id, height, weight) {
        this.name = name.charAt(0).toUpperCase() + name.slice(1);
        this.types = types;
        this.img = img;
        this.id = id;
        this.height = height * 10;
        this.weight = weight / 10;
        this.euroUnits();
    }

    // #region Methods
    euroUnits() {
        this.cmHeight = new Intl.NumberFormat('de-DE', {style:'unit', unit:'centimeter'}).format(this.height);
        this.kgWeight = new Intl.NumberFormat('de-DE', {style:'unit', unit:'kilogram'}).format(this.weight);
    }

    // #region Render

    renderCard(index) {
        const refTypes = document.querySelectorAll('.pkmn-card .pkmn-types')[index];
        document.querySelectorAll('.pkmn-card h2')[index].textContent = this.name;
        document.querySelectorAll('.pkmn-card img')[index].src = this.img;
        document.querySelectorAll('.pkmn-card .pkmn-no')[index].textContent = `# ${this.id}`;
        this.types.forEach(type => {
            refTypes.innerHTML += Template.typeBtn(type)
        });
    }

}