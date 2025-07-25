import { Pokemon } from './pokemon.js';
import { Template } from './templates.js'

/**
 * Represents the Pokedex.
 */
export class Pokedex {
    pokemons = [];
    currentLoads = 0;
    currentType = '';

    // #regin Mathods
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
                        pokedata.stats[5]['base_stat']
                    ));
                    this.createPkmnCard(this.pokemons[i-1].types[0], i-1);
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

    // #region Render
    /**
     * Creates a Pokemon-Card.
     * @param {string} type - Type of Pokemon
     */
    createPkmnCard(type, index) {
        document.querySelector('.pkmn-area').innerHTML += Template.pkmnCart(type, index);
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
                this.currentType = this.pokemons[index].types[0];
                this.pokemons[index].renderBigCard();
                this.pokemons[index].renderDataBtns();
            })
        })
    }

    /** Stops porpagation form big card. */
    clickBigCard() {
        document.querySelector('.big-card').addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    /**Manages a click out of big card. */
    clickBigCardOverlay() {
        const refOverlay = document.querySelector('.big-card-overlay');
        refOverlay.addEventListener('click', () => {
            document.querySelector('.big-card').classList.remove(this.currentType);
            refOverlay.classList.add('d-none');
        });
    }
}

