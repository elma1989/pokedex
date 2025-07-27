import { Pokemon } from './pokemon.js';
import { Template } from './templates.js'

/**
 * Represents the Pokedex.
 */
export class Pokedex {
    pokemons = [];
    filteredPokemons = [];
    currentLoads = 0;
    currentType = '';
    currentPkmnIndex = 0;
    scrollY = 0;

    // #regin Mathods
    // #region Primary
    /**
     * loads next 20 Pokemons.
     */
    async load20Pkmn() {
        this.toggleLoadScreen();
        this.currentLoads++;
        for (let i = this.currentLoads; i < (this.currentLoads + 20); i++) {
            try {
                const response = await fetch (`https://pokeapi.co/api/v2/pokemon/${i}`);
                if (response.ok) {
                    const pokedata = await response.json();
                    this.pokemons.push(new Pokemon(
                        pokedata.name,
                        pokedata.types.map(t => t.type.name),
                        pokedata.sprites['front_default'],
                        pokedata.id, pokedata.height,
                        pokedata.weight,
                        pokedata.stats[0]['base_stat'],
                        pokedata.stats[1]['base_stat'],
                        pokedata.stats[2]['base_stat'],
                        pokedata.stats[3]['base_stat'],
                        pokedata.stats[5]['base_stat'],
                        pokedata.abilities.map(abi => abi.ability.name)
                    ));
                    this.createPkmnCard(this.pokemons[i-1].types[0]);
                    this.pokemons[i-1].renderCard(i-1);
                }
            } catch (err) {
                console.error(err);
            }
        }
        this.toggleLoadScreen();
        this.currentLoads += 19;
        this.clickCards();
    }

    /** Turns Load-Screen on and off. */
    toggleLoadScreen() {
        document.querySelector('.load-screen').classList.toggle('d-none');
    }


    /** Switches the Pokemon-Theme for change of Pokemon */
    switchCurrentType() {
        const refBigCard = document.querySelector('.big-card');
        refBigCard.classList.remove(this.currentType);
        this.currentType = this.pokemons[this.currentPkmnIndex].types[0];
        refBigCard.classList.add(this.currentType);
    }

    /** Diaables scrollbar for overlay. */
    disableScroll() {
        this.scrollY = window.scrollY;
        document.querySelector('main').classList.add('stop-scroll');
    }

    /** Enables scrollbar after leave overlay again */
    enableScroll() {
        document.querySelector('main').classList.remove('stop-scroll');
        window.scrollTo(0, this.scrollY);
    }

    /**
     * Checks the length of search input value
     * @param {string} input - Input of search value
     * @returns 0 = empty, 1 = to short, 2 = correct
     */
    checkInput(input) {
        if (input.length == 0) return 0;
        if (input.length < 3) return 1;
        return 2;
    }

    /**
     * Checks, if Seach Input includes Pokemon-Name.
     * @param {Pokemon} pokemon Object of one Pokemon.
     * @returns true - if has matched.
     */
    checkName(pokemon) {
        return pokemon.name.toLowerCase().includes(document.querySelector('#search-input').value.toLowerCase());
    }

    /** Felters the Pokeones to User-Input. */
    search() {
        this.filteredPokemons = this.pokemons.filter(this.checkName);
        document.querySelector('#search-input').value = '';
    }
    // #endregion

    // #region Render
    /**
     * Creates a Pokemon-Card.
     * @param {string} type - Type of Pokemon
     */
    createPkmnCard(type) {
        document.querySelector('.pkmn-area').innerHTML += Template.pkmnCart(type);
    }

    /** Sequency for rendering a big card. */
    createBigCard() {
        document.querySelector('.big-card').innerHTML = Template.bigCard();
        this.renderCardArrows();
        this.clickArrows();
        this.pokemons[this.currentPkmnIndex].renderBigCard();
        this.pokemons[this.currentPkmnIndex].renderDataBtns();
        this.pokemons[this.currentPkmnIndex].clickDataBtns();
        this.pokemons[this.currentPkmnIndex].renderAbout();
    }

    /**
     * Renders the Arrows for next and previows Pokemone.
     */
    renderCardArrows() {
        const refArrows = document.querySelectorAll('.arrow');

        if (this.currentPkmnIndex > 0) {
            refArrows[0].classList.remove('d-none');
        } else {
            refArrows[0].classList.add('d-none');
        }

        if (this.currentPkmnIndex < this.pokemons.length - 1) {
            refArrows[1].classList.remove('d-none');
        } else {
            refArrows[1].classList.add('d-none');
        }
    }

    renderFilteredCards() {
        const refPkmnArea = document.querySelector('.pkmn-area');
        refPkmnArea.textContent = ''
        if (this.filteredPokemons.length > 0) {
            this.filteredPokemons.forEach((pokemon, index) => {
                this.createPkmnCard(pokemon.types[0]);
                pokemon.renderCard(index);
            });
        } else {
            refPkmnArea.textContent = 'No Pokemons found!';
        }
    }
    // #endregion

    // #region Event
    /** Adds a Click-Event for Load-More-Button */
    clickLoadMore() {
        document.querySelector('#load-more').addEventListener('click', () => {
            this.load20Pkmn();
        });
    }

    /**
     * Manges click on Pokemon-Card.
     * @param {number} index - Index of Pokemon-Card.
     */
    clickCards() {
        const refCards = document.querySelectorAll('.pkmn-card');
        refCards.forEach((card, index) => {
            card.addEventListener('click', () => {
                this.currentPkmnIndex = index;
                this.currentType = this.pokemons[index].types[0];
                this.disableScroll();
                this.createBigCard();
            })
        })
    }

    /** Stops porpagation form big card. */
    clickBigCard() {
        document.querySelector('.big-card').addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    /** Manages a click out of big card. */
    clickBigCardOverlay() {
        const refOverlay = document.querySelector('.big-card-overlay');
        refOverlay.addEventListener('click', () => {
            document.querySelector('.big-card').classList.remove(this.currentType);
            refOverlay.classList.add('d-none');
            this.enableScroll();
        });
    }

    /**Manges clicks on previous and nex Pokemon */
    clickArrows() {
        const refArrows = document.querySelectorAll('.arrow');

        if (this.currentPkmnIndex > 0) {
            refArrows[0].addEventListener('click', () => {
                this.currentPkmnIndex--;
                this.switchCurrentType();
                this.createBigCard();
            });
        }

        if (this.currentPkmnIndex < this.pokemons.length - 1) {
            refArrows[1].addEventListener('click', () => {
                this.currentPkmnIndex++;
                this.switchCurrentType();
                this.createBigCard();
            });
        }
    }

    /** Gives an Errormessage, if the length input of  search-field is not correct. */
    changeSearch() {
        const refSearchInput = document.querySelector('#search-input');
        const refErrMsg = document.querySelector('.errmsg');

        refSearchInput.addEventListener('keyup', () => {
            switch(this.checkInput(refSearchInput.value)) {
                case 0:
                    refErrMsg.textContent = '';
                    break;
                case 1:
                    refErrMsg.textContent = 'Type 3 Letters!';
                    break;
                case 2:
                    refErrMsg.textContent = '';
                    break;
            }
        });
    }

    submitSearch() {
        const refErrMsg = document.querySelector('.errmsg')
        document.forms[0].addEventListener('submit', (e) => {
            e.preventDefault();

            if (document.querySelector('.load-screen').classList.contains('d-none')) {
                switch(this.checkInput(document.querySelector('#search-input').value)) {
                    case 2:
                        refErrMsg.textContent = ''
                        this.search();
                        this.renderFilteredCards();
                }

            } else {
                refErrMsg.textContent = "Don't search during loading."
            }
        });
    }
}

