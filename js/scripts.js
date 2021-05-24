let pokemonRepository = (function () {
  // Creates an array for pokemon objects.
  // Array contains Pokemon data
  let pokemonList = [];
  // Adds API link.
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
  // Declares modal's container
  let modalContainer = document.querySelector('#modal-container');

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
      showModal(pokemon);
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
      // Extracts the types of a pokemon.
      // Creates an array to hold the types of a pokemon.
      let pokemonTypes = details.types.map(myFunction);
      function myFunction (arrayMember) {
        return arrayMember.type.name;
      }
      item.types = pokemonTypes;
      // item.types = details.types;
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
  function showModal (pokemon) {
    modalContainer.classList.add('is-visible');

    // Clear all existing modal content
    modalContainer.innerHTML = '';
    let modal = document.createElement('div');
    modal.classList.add('modal');

    // Add the new modal content
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);
    // Add modal's title.
    let titleElement = document.createElement('h1');
    titleElement.innerText = pokemon.name;
    // Add pokemon image.
    let imageElement = document.createElement('img');
    imageElement.setAttribute('src', pokemon.imageUrl);
    imageElement.setAttribute('alt', 'pokemon-image');
    imageElement.setAttribute('class', 'modal-image');
    // Add some properties.
    let contentElement = document.createElement('p');
    contentElement.innerText = 'Height: ' + pokemon.height;
    let contentElement2 = document.createElement('p');
    contentElement2.innerText = 'Types: ' + pokemon.types;

    // Appends the elements to the parent.
    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(imageElement);
    modal.appendChild(contentElement);
    modal.appendChild(contentElement2);
    modalContainer.appendChild(modal);
    modalContainer.classList.add('is-visible');
  }
  // Hide the modoal window.
  function hideModal () {
    modalContainer.classList.remove('is-visible');
  }

  // Close the modal by clicking outside of the modal.
  modalContainer.addEventListener('click', (e) => {
    // Since this is also triggered when clicking INSIDE the modal
    // We only want to close if the user clicks directly on the overlay
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });
  // Closes the modal by pressing the Escape key.

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

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
pokemonRepository.loadList().then(function () {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
// Calls the function related to the search bar.
pokemonRepository.search();
