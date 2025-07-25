import { Pokedex } from './pokedex.js';

const pokedex = new Pokedex();
pokedex.load20Pkmn();
pokedex.clickLoadMore();
pokedex.clickBigCard();
pokedex.clickBigCardOverlay();

function createBigCard(index) {
    pokedex.pokemons[index].renderBigCard();
}