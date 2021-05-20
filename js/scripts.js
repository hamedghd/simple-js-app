let pokemonRepository = (function () {
  // Creates an array for pokemon objects.
  // Array contains Pokemon data
  let pokemonList = [];
  // Adds API link.
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

  // This method gives access to print the pokemonList from outside.
  function getAll () {
    return pokemonList;
  }
  // Adds each pokemon from results to the pokemonList
  // This method makes it possible to add new objects to the pokemonList from outside.
  function add (pokemon) {
    if (addv(pokemon)) { pokemonList.push(pokemon); }
  }

  // This function checks wheather if the entered object has all the required keys.
  function addv (pokemon) {
    // Contains all the required keys.
    const pokemonKeys = ['name', 'detailsUrl'];

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

  // addList function - pokemon is an object
  function addListItem (pokemon) {
    // selects the created ul list
    let pokemonList = document.querySelector('.pokemon-list');

    // Creates a list item.
    let listItem = document.createElement('li');

    // Adds an id for each pokemon.
    listItem.setAttribute('id', pokemon.name);

    // Adds a class to the list items.
    listItem.classList.add('pokemon-listItems');

    // Creates a button element.
    let button = document.createElement('button');

    // Sets its innerText to be the Pokémon's name.
    button.innerText = pokemon.name;

    // Adds a class to the button item.
    button.classList.add('button');

    // Appends the button item to the list item.
    listItem.appendChild(button);

    // Appends the list items to its parent.
    pokemonList.appendChild(listItem);

    // Adds event listener to the button.
    button.addEventListener('click', function () {
      showDetails(pokemon);
    });
  }

  function showDetails (pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
  }

  // Loads data from an external API
  function loadList () {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }
  // Loads details.
  function loadDetails (item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }
  // Searchbar:
  // Only displays the desired name
  function search () {
    let searchInput = document.querySelector('.search-text');

    searchInput.addEventListener('input', function () {
      let pokemonList = document.querySelectorAll('.pokemon-listItems');
      let searchText = searchInput.value.toLowerCase();

      pokemonList.forEach(function (pokemon) {
        if (pokemon.innerText.toLowerCase().indexOf(searchText) > -1) {
          pokemon.style.display = '';
        } else {
          pokemon.style.display = 'none';
        }
      });
    });
  }
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    search: search,
    loadList: loadList,
    loadDetails: loadDetails
  };
})();

// Loop over the database
pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
// Calls the function related to the search bar.
pokemonRepository.search();
