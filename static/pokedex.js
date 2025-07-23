import { Pokemon } from './pokemon.js';

export class Pokedex {
    pokemons = [];
    currentLoads = 0;
    // #regin Mathods
    async load20Pkmn() {
        this.currentLoads++
        for (let i = this.currentLoads; i < (this.currentLoads + 20); i++) {
            try {
                const response = await fetch (`https://pokeapi.co/api/v2/pokemon/${i}`);
                if (response.ok) {
                    const pokedata = await response.json();
                    this.pokemons.push(new Pokemon(pokedata.name, pokedata.types.map(t => t.type.name), pokedata.sprites['front_default'], pokedata.id, pokedata.height, pokedata.weight));
                }
            } catch (err) {
                console.error(err);
            }
        }
        this.currentLoads += 19;
    }
}

