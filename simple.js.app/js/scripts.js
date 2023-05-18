let pokemonRepository = (function() {
let pokemonList = [];
let apiUrl ='https://pokeapi.co/api/v2/pokemon/?limit=150';

    

    function add(pokemon){
        pokemonList.push(pokemon);
    }    
    
    //adding a function to log the name in the console
    

//adding funtion to list pokemon
    function addListItem(pokemon) {
        let pokemonList = document.querySelector('.pokemon-list');
        let listpokemon = document.createElement('li');
        let button =document.createElement('button');
        //adding an event listener
        button.addEventListener('click', function(event){
            showDetails(pokemon)
        });
        button.innerText = pokemon.name;
        button.classList.add("button-class");
        listpokemon.appendChild(button);
        pokemonList.appendChild(listpokemon);
    }
    //load list function
    function loadList() {
        return fetch(apiUrl).then(function(response){
            return response.json();
        }).then(function (json){
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function(e) {
            console.error(e);
        })
    }
    //load details function
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
          return response.json();
        }).then(function (details) {
          item.imageUrl = details.sprites.front_default;
          item.height = details.height;
          item.types = details.types;
          item.weight = details.weight;
          item.abilities = details.abilities;
        }).catch(function (e) {
          console.error(e);
        });
      }
      //show details function
    function showDetails(item){
            pokemonRepository.loadDetails(item).then(function() {
        console.log(item);
        });
    }

    function getAll() {
        return pokemonList
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
    };
})();

pokemonRepository.loadList().then(function() {

// adding for and if statements to print out names on my si
pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);

});
    });
    

