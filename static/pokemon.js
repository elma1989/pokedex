import { Template } from "./templates.js";

/** Class representing a Pokemon. */
export class Pokemon {
    cmHeight;
    kgWeight;
    textAbilities = '';

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
    constructor (name, types, img, id, height, weight, hp, attack, defense, spec, speed, abilities, moves) {
        this.name = name.charAt(0).toUpperCase() + name.slice(1);
        this.types = types;
        this.img = img;
        this.id = id;
        this.height = height * 10;
        this.weight = weight / 10;
        this.hp = this.relativeValue(hp);
        this.attack = this.relativeValue(attack);
        this.defense = this.relativeValue(defense);
        this.spec = this.relativeValue(spec);
        this.speed = this.relativeValue(speed);
        this.abilities = abilities;
        this.moves = moves.filter(move => move.level > 0).sort((a,b) => a.level - b.level);
        this.euroUnits();
        this.stringAbilities();
    }

    // #region Methods
    /** Converts given Values in Default-Units */
    euroUnits() {
        this.cmHeight = new Intl.NumberFormat('de-DE', {style:'unit', unit:'centimeter'}).format(this.height);
        this.kgWeight = new Intl.NumberFormat('de-DE', {style:'unit', unit:'kilogram'}).format(this.weight);
    }

    /** Converts the Abilities to a String */
    stringAbilities() {
        for (let i = 0; i < this.abilities.length; i++) {
            this.textAbilities += this.abilities[i].name;
            if (i < this.abilities.length - 1) {
                this.textAbilities += ', '
            }
        }
    }

    /** Converts Stats-Values in relative Values */
    relativeValue(absoluteValue) {
        const relValue = absoluteValue / 150 * 100;
        return (relValue < 100) ? relValue : 100;
    }

    // #region Render
    /**
     * Renders a Card of the Pokemon.
     * @param {number} index - Index of the preparated Pokemon-Card.
     */
    renderCard(index) {
        return new Promise(resolve => {
            const refTypes = document.querySelectorAll('.pkmn-card .pkmn-types')[index];
            document.querySelectorAll('.pkmn-card h2')[index].textContent = this.name;
            document.querySelectorAll('.pkmn-card img')[index].src = this.img;
            document.querySelectorAll('.pkmn-card .pkmn-no')[index].textContent = `# ${this.id}`;
            this.types.forEach(type => {
                refTypes.innerHTML += Template.typeBtn(type);
            });
            requestAnimationFrame(() => {
                resolve();
            })
        });
    }

    /**Renders a big card of that Poekemon */
    renderBigCard() {
        const refTypes = document.querySelector('.big-card .pkmn-types')
        document.querySelector('.big-card-overlay').classList.remove('d-none');
        document.querySelector('.big-card').classList.add(this.types[0]);
        document.querySelector('.big-card h2').textContent = this.name;
        document.querySelector('.big-card .pkmn-no').textContent = `# ${this.id}`;
        document.querySelector('.big-card .pkmn-img').src = this.img;
        refTypes.innerHTML = '';
        this.types.forEach (type => {
            refTypes.innerHTML += Template.typeBtn(type);
        });
    }

    /** Renders the Data-Selection-Buttons. */
    renderDataBtns() {
        const refDataBtns = document.querySelector('.data-btns');
        
        refDataBtns.innerHTML = '';
        refDataBtns.innerHTML += Template.dataBtn(this.types[0], 'About');
        refDataBtns.innerHTML += Template.dataBtn(this.types[0], 'Stats');
        refDataBtns.innerHTML += Template.dataBtn(this.types[0], 'Moves');
    }

    /**Renders the About-Site. */
    renderAbout() {
        document.querySelector('.raw-data').innerHTML = Template.tableAbount(this);
    }

    /** Renders the Stats-Site. */
    renderStats() {
        document.querySelector('.raw-data').innerHTML = Template.statsProgress(this);
    }

    /** Reders the Moves-Site. */
    renderMoves() {
        document.querySelector('.raw-data').innerHTML = Template.moveTable();

        const tr = document.createElement('tr');
        tr.innerHTML = Template.moveTableHead();
        document.querySelector('#moves').appendChild(tr);

        this.moves.forEach(move => {
            this.renderSingleMove(move);
        })
    }


    /**
     * Renders one sinle move.
     * @param {Move} move - Move to render.
     */
    renderSingleMove(move) {
        const tr = document.createElement('tr');
        tr.innerHTML = Template.singleMove(move);
        document.querySelector('#moves').appendChild(tr);
    }
    // #endregion

    // #region Event
    /** Manages Click on a Data-Button. */
    clickDataBtns() {
        const refDataBtns = document.querySelectorAll('.data-btn');
        
        refDataBtns[0].addEventListener('click', () => {
            this.renderAbout();
        });

        refDataBtns[1].addEventListener('click', () => {
            this.renderStats();
        });

        refDataBtns[2].addEventListener('click', () => {
            this.renderMoves();
        });
    }
}

/** Represents a move of a Pokemon. */
export class Move {
    /**
     * Creates a move.
     * @param {string} name - Name of move.
     * @param {string} type - Method, on which the Pokemon gets this move.
     * @param {number} level - Level of a Pokemone, who learns that move, if move has type level-up.
     */
    constructor (name, type='Level-Up', level=1) {
        this.name = this.convertUpperCase(name);
        this.type = type;
        this.level = level
    }

    /**
     * Converts as Lower-Case-Dash-String to an Upper-Case-Dash-String.
     * @param {string} string - String to convert.
     * @returns Upper-Case-String
     */
    convertUpperCase(string) {
        const words = string.split('-');
        if(words.length == 1) return string.charAt(0).toUpperCase() + string.slice(1);
        const result = words.map (word => word.charAt(0).toUpperCase() + word.slice(1));
        return result.join('-');
    }
}