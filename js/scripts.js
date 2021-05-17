const pokemonRepository = (function () {
  // Array contains Pokemon data
  let pokemonList = [];
  // Objects added to the defined array manually.
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
  // This method gives access to print the pokemonList from outside.
  function getAll () {
    return pokemonList;
  }

  // This method makes it possible to add new objects to the pokemonList from outside.
  function add (pokemon) {
    if (addv(pokemon)) { pokemonList.push(pokemon); }
  }

  // This function checks wheather if the entered object has all the required keys.
  function addv (pokemon) {
    // Contains all the required keys.
    const pokemonKeys = ['name', 'height', 'weight', 'types'];

    // Checks wheather if the input is an object.
    if (typeof (pokemon) === 'object') {
      // Checks wheather if the input object has all the required keys.
      // It is considered that the pokemon(input) keys are not necessarily in the same order of the pokemonKeys(database).
      if (Object.keys(pokemon).filter(e => pokemonKeys.indexOf(e) !== -1).length === pokemonKeys.length) {
        return true;
      } else {
        console.error('All the required keys are not provided!');
        return false;
      }
    } else {
      console.error('Input is not an object!');
      return false;
    }
  }

  // This function makes it possible to look for a specific pokomon by name.
  function findPokemon (pokemonName) {
    return pokemonList.filter(e => e.name === pokemonName);
  }

  // New functions
  function addListItem (pokemon) {
    // selects the created ul list
    let pokemonList = document.querySelector('.pokemon-list');

    // Creates a list item.
    let listItem = document.createElement('li');

    // Adds a class to the list items.
    listItem.classList.add('pokemon-listItems');

    // Creates a button element.
    let button = document.createElement('button');

    // Sets its innerText to be the Pokémon's name.
    button.innerText = pokemon;

    // Adds a class to the button item.
    button.classList.add('button');

    // Appends the button item to the list item.
    listItem.appendChild(button);

    // Appends the list items to its parent.
    unorderedList.appendChild(listItem);
  }

  return {
    add: add,
    getAll: getAll,
    findPokemon: findPokemon,
    addListItem: addListItem
  };
})();

// Adds new database.
pokemonRepository.add({ name: 'Charmeleon', height: 1.1, weight: 19.0, types: ['fire'] });
pokemonRepository.add({ name: 'Charizard', height: 1.7, weight: 90.5, types: ['fire', 'flying'] });
pokemonRepository.add({ name: 'Squirtle', height: 0.5, weight: 9.0, types: ['water'] });
pokemonRepository.add({ name: 'Wartortle', height: 1.0, weight: 22.5, types: ['water'] });
pokemonRepository.add({ name: 'Blastoise', height: 1.6, weight: 85.5, types: ['water'] });
pokemonRepository.add({ name: 'Caterpie', height: 0.3, weight: 2.9, types: ['bug'] });
pokemonRepository.add({ name: 'Metapod', height: 0.7, weight: 9.9, types: ['bug'] });
pokemonRepository.add({ name: 'Butterfree', height: 1.1, weight: 32, types: ['bug', 'flying'] });
pokemonRepository.add({ name: 'Weedle', height: 0.3, weight: 3.2, types: ['bug', 'poison'] });
pokemonRepository.add({ name: 'Kakuna', height: 0.6, weight: 10.0, types: ['bug', 'poison'] });
pokemonRepository.add({ name: 'Beedrill', height: 1.0, weight: 29.5, types: ['bug', 'poison'] });
pokemonRepository.add({ name: 'Pidgey', height: 0.3, weight: 1.8, types: ['flying', 'normal'] });
pokemonRepository.add({ name: 'Pidgeotto', height: 1.1, weight: 30, types: ['flying', 'normal'] });
pokemonRepository.add({ name: 'Pidgeot', height: 1.5, weight: 39.5, types: ['flying', 'normal'] });
pokemonRepository.add({ name: 'Rattata', height: 0.3, weight: 3.5, types: ['normal'] });
pokemonRepository.add({ name: 'Raticate', height: 0.7, weight: 18.5, types: ['normal'] });
pokemonRepository.add({ name: 'Spearow', height: 0.3, weight: 2.0, types: ['flying', 'normal'] });
pokemonRepository.add({ name: 'Fearow', height: 1.2, weight: 38.0, types: ['flying', 'normal'] });
pokemonRepository.add({ name: 'Ekans', height: 2.0, weight: 6.9, types: ['poison'] });
pokemonRepository.add({ name: 'Arbok', height: 3.5, weight: 65.0, types: ['poison'] });
pokemonRepository.add({ name: 'Pikachu', height: 0.4, weight: 6.0, types: ['electric'] });
pokemonRepository.add({ name: 'Raichu', height: 0.8, weight: 30.0, types: ['electric'] });
pokemonRepository.add({ name: 'Sandshrew', height: 0.6, weight: 12.0, types: ['ground'] });
pokemonRepository.add({ name: 'Sandslash', height: 1.0, weight: 29.5, types: ['ground'] });
pokemonRepository.add({ name: 'Nidoran', height: 0.4, weight: 7.0, types: ['poison'] });
pokemonRepository.add({ name: 'Nidorina', height: 0.8, weight: 20.0, types: ['poison'] });

// Refactoring the code using createElement(), appendChild() and classList functions.
let main = document.querySelector('main');
main.classList.add('page-body');
let pageBody = document.querySelector('.page-body');

// Adds an empty unordered list.
pageBody.innerHTML = "<ul></ul>";

// Selects the list.
let unorderedList = document.querySelector('ul');

// Adds a class to it.
unorderedList.classList.add('pokemon-list');

// Loop over the database
pokemonRepository.getAll().forEach(function (item, index, array) {
  pokemonRepository.addListItem(item.name);
});
