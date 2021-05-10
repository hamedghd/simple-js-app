// Array contains Pokemon data
var pokemonList = [];
// Objects added to the defined array by different methods.
pokemonList = [
  {
    name: 'Bulbasaur',
    height: 0.7,
    weight: 6.9,
    types: ['grass', 'poison']
  },

  {
    name: 'Ivysaur',
    height: 1.0,
    weight: 13.0,
    types: ['grass', 'poison']
  },

  {
    name: 'Venusaur',
    height: 2.0,
    weight: 100.0,
    types: ['grass', 'poison']
  }
];

pokemonList[3] = {
  name: 'Charmander',
  height: 0.7,
  weight: 8.5,
  types: ['fire']
};

pokemonList.push({ name: 'Charmeleon', height: 1.1, weight: 19.0, types: ['fire'] });
pokemonList.push({ name: 'Charizard', height: 1.7, weight: 90.5, types: ['fire', 'flying'] });
pokemonList.push({ name: 'Squirtle', height: 0.5, weight: 9.0, types: ['water'] });
pokemonList.push({ name: 'Wartortle', height: 1.0, weight: 22.5, types: ['water'] });
pokemonList.push({ name: 'Blastoise', height: 1.6, weight: 85.5, types: ['water'] });
pokemonList.push({ name: 'Caterpie', height: 0.3, weight: 2.9, types: ['bug'] });
pokemonList.push({ name: 'Metapod', height: 0.7, weight: 9.9, types: ['bug'] });
pokemonList.push({ name: 'Butterfree', height: 1.1, weight: 32, types: ['bug', 'flying'] });
pokemonList.push({ name: 'Weedle', height: 0.3, weight: 3.2, types: ['bug', 'poison'] });
pokemonList.push({ name: 'Kakuna', height: 0.6, weight: 10.0, types: ['bug', 'poison'] });
pokemonList.push({ name: 'Beedrill', height: 1.0, weight: 29.5, types: ['bug', 'poison'] });
pokemonList.push({ name: 'Pidgey', height: 0.3, weight: 1.8, types: ['flying', 'normal'] });
pokemonList.push({ name: 'Pidgeotto', height: 1.1, weight: 30, types: ['flying', 'normal'] });
pokemonList.push({ name: 'Pidgeot', height: 1.5, weight: 39.5, types: ['flying', 'normal'] });
pokemonList.push({ name: 'Rattata', height: 0.3, weight: 3.5, types: ['normal'] });
pokemonList.push({ name: 'Raticate', height: 0.7, weight: 18.5, types: ['normal'] });
pokemonList.push({ name: 'Spearow', height: 0.3, weight: 2.0, types: ['flying', 'normal'] });
pokemonList.push({ name: 'Fearow', height: 1.2, weight: 38.0, types: ['flying', 'normal'] });
pokemonList.push({ name: 'Ekans', height: 2.0, weight: 6.9, types: ['poison'] });
pokemonList.push({ name: 'Arbok', height: 3.5, weight: 65.0, types: ['poison'] });
pokemonList.push({ name: 'Pikachu', height: 0.4, weight: 6.0, types: ['electric'] });
pokemonList.push({ name: 'Raichu', height: 0.8, weight: 30.0, types: ['electric'] });
pokemonList.push({ name: 'Sandshrew', height: 0.6, weight: 12.0, types: ['ground'] });
pokemonList.push({ name: 'Sandslash', height: 1.0, weight: 29.5, types: ['ground'] });
pokemonList.push({ name: 'Nidoran', height: 0.4, weight: 7.0, types: ['poison'] });
pokemonList.push({ name: 'Nidorina', height: 0.8, weight: 20.0, types: ['poison'] });

// Creates a list of Pokemon names and properties
for (let i = 0; i < pokemonList.length; i++) {
  // opens an unordered list tags
  if (i === 0) { document.write("<ul class='list'>"); }
  document.write('<li class="list_items">');
  document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ')');
  // checks if the height is above 1.0, adds the note "Wow, that's big!" to the output.
  if (pokemonList[i].height > 1.0) { document.write(" - Wow, that's big!"); }
  // closes the unordered list tags
  document.write('</li>');
  if (i === pokemonList.length - 1) { document.write('</ul>'); }
}
