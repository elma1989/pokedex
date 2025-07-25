import { Template } from "./templates.js";

/** Class representing a Pokemon. */
export class Pokemon {
    cmHeight;
    kgWeight;

    /**
     *  Creates a Pokemon.
     * @param {string} name - The name of Pokemon.
     * @param {Array.string} types - Types, that the Pokemon has.
     * @param {string} img - Link to the Pokemon-Image in the API.
     * @param {number} id - Number of the Pokemone.
     * @param {number} height - Weight (10 kg) of the Pokemon.
     * @param {number} weight - Heigh (dm) of the Pokemon.
     * @param {number} hp - Basic Health-Points of that Pokemon
     * @param {number} attack - Basic Attack-Points of that Pokemon
     * @param {number} defense - Basic Defense-Poins of that Pokemon
     * @param {number} spec - Basic value of special-attacks for that Pokemon (Attack-Value only)
     * @param {number} speed - Basic-Speed value of that Pokemon
     */
    constructor (name, types, img, id, height, weight, hp, attack, defense, spec, speed) {
        this.name = name.charAt(0).toUpperCase() + name.slice(1);
        this.types = types;
        this.img = img;
        this.id = id;
        this.height = height * 10;
        this.weight = weight / 10;
        this.hp = hp;
        this.attack = attack;
        this.defense = defense;
        this.spec = spec;
        this.speed = speed;
        this.euroUnits();
    }

    // #region Methods
    /** Converts given Values in Default-Units */
    euroUnits() {
        this.cmHeight = new Intl.NumberFormat('de-DE', {style:'unit', unit:'centimeter'}).format(this.height);
        this.kgWeight = new Intl.NumberFormat('de-DE', {style:'unit', unit:'kilogram'}).format(this.weight);
    }

    // #region Render

    /**
     * Renders a Card of the Pokemon.
     * @param {number} index - Index of the preparated Pokemon-Card.
     */
    renderCard(index) {
        const refTypes = document.querySelectorAll('.pkmn-card .pkmn-types')[index];
        document.querySelectorAll('.pkmn-card h2')[index].textContent = this.name;
        document.querySelectorAll('.pkmn-card img')[index].src = this.img;
        document.querySelectorAll('.pkmn-card .pkmn-no')[index].textContent = `# ${this.id}`;
        this.types.forEach(type => {
            refTypes.innerHTML += Template.typeBtn(type);
        });
    }

    /**Renders a big card of that Poekemon */
    renderBigCard() {
        const refTypes = document.querySelector('.big-card .pkmn-types')
        document.querySelector('.big-card-overlay').classList.remove('d-none');
        document.querySelector('.big-card').classList.add(this.types[0]);
        document.querySelector('.big-card h2').textContent = this.name;
        document.querySelector('.big-card .pkmn-no').textContent = `# ${this.id}`;
        document.querySelector('.big-card img').src = this.img;
        refTypes.innerHTML = '';
        this.types.forEach (type => {
            refTypes.innerHTML += Template.typeBtn(type);
        });
    }

    /** Renders the Data-Selection-Buttons */
    renderDataBtns() {
        const refDataBtns = document.querySelector('.data-btns');
        
        refDataBtns.innerHTML = '';
        refDataBtns.innerHTML += Template.dataBtn(this.types[0], 'Stats');
    }
}