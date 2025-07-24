import { Pokemon } from './pokemon.js';
import { Template } from './templates.js'

/**
 * Represents the Pokedex.
 */
export class Pokedex {
    pokemons = [];
    currentLoads = 0;

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
                    this.pokemons.push(new Pokemon(pokedata.name, pokedata.types.map(t => t.type.name), pokedata.sprites['front_default'], pokedata.id, pokedata.height, pokedata.weight));
                    this.createPkmnCard(this.pokemons[i-1].types[0]);
                    this.pokemons[i-1].renderCard(i-1);
                }
            } catch (err) {
                console.error(err);
            }
        }
        this.currentLoads += 19;
        this.toggleLoadScreen();
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
    createPkmnCard(type) {
        document.querySelector('.pkmn-area').innerHTML += Template.pkmnCart(type);
    }
    // #endregion

    // #region Event
    clickLoadMore() {
        document.querySelector('#load-more').addEventListener('click', () => {
            this.load20Pkmn();
        });
    }
}

