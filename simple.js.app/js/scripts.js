let pokemonRepository = (function() {
    let pokemonList = [];
    let apiUrl ='https://pokeapi.co/api/v2/pokemon/?limit=150';
    
        
    
        function add(pokemon){
            if (typeof pokemon === 'object'){
            pokemonList.push(pokemon);
            }
        }    
        
    
    //adding funtion to list pokemon
        function addListItem(pokemon) {
            let pokemonList = document.querySelector('.list-group');
            let listpokemon = document.createElement('li');
            let button =document.createElement('button');

            listpokemon.classList.add('list-group-item' , 'text-center' , 'border-0');

            button.setAttribute('data-toggle', 'modal');
            button.setAttribute('data-target' , '#exampleModal');
            button.classList.add('btn-success' , 'mt-4' ,'p-3' , 'border-2' , 'fs-6');

            //adding an event listener
            button.addEventListener('click', function(event){
                showDetails(pokemon);
            });

            button.innerText = pokemon.name.toUpperCase();
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
                        detailsUrl: item.url,
                        height: item.height,
                        weight: item.weight
                    };
                    add(pokemon);
                });
            }).catch(function(e) {
                console.error(e);
            })
        }

        //load details function
        function loadDetails(pokemon) {
            let url = pokemon.detailsUrl;
            return fetch(url).then(function (response) {
              return response.json();
            }).then(function (details) {
              pokemon.imageUrl = details.sprites.front_default;
              pokemon.height = details.height*.1;
              pokemon.weight = details.weight*.1;
            }).catch(function (e) {
              console.error(e);
            });
          }
          //show details function
        function showDetails(item){
                pokemonRepository.loadDetails(item).then(function() {
                    showModal(item);
                         });
        }
    
        function getAll() {
            return pokemonList;
        }
        var searchPokemon = () =>{
            let searchInput = document.querySelector('#input').value.toLowerCase();
            let pokeArray = document.querySelector('.list-group-item');
            
            pokeArray.forEach(pokemon => {
                let listButton = pokemon.querySelector('.btn-success').innerText.toLowerCase();
                if (listButton.includes(searchInput)){
                    pokemon.style.display =  'inline-block';
                }else{
                    pokemon.style.display = 'none';
                }
            });
        };
            
        let searchImput = document.querySelector('#input');
            searchImput.addEventListener('input' , () => searchPokemon());


        //adding interactive modal 
        function showModal(pokemon) {
            
            
            let title = document.querySelector('.modal-title');
            let height = document.querySelector('.pokemonHeight');
            let imgDetails = document.querySelector('.pokemonImage');
            let weight = document.querySelector('.pokemonWeight');
            
            
            title.innerText = pokemon.name.toUpperCase();
            weight.innerText = `Weight: ${pokemon.weight.toFixed(2)} Kg`;
            height.innerText = `Height: ${pokemon.height.toFixed(2)} M`;
            imgDetails.src = pokemon.imageUrl;
    }
        
        
            window.addEventListener('keydown', (e) => {
                let modalContainer = document.querySelector('#exampleModal');
                if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
                hideModal();  
            }
            });
            let modalContainer = document.querySelector('#exampleModal');
            modalContainer.addEventListener('click', (e) => {
                let target = e.target;
                if (target === modalContainer) {
                    hideModal();
            }
            });
            function hideModal() {
                let modalContainer = document.querySelector('#exampleModal');
                modalContainer.classList.remove('is-visible');
            }
        
        return {
            add: add,
            getAll: getAll,
            addListItem: addListItem,
            loadList: loadList,
            loadDetails: loadDetails,
            showDetails: showDetails,
            showModal: showModal,
            hideModal: hideModal,
            searchPokemon: searchPokemon
        
        };
    })();
    
    
    pokemonRepository.loadList().then(function() {
    
    // adding for and if statements to print out names on my site
    pokemonRepository.getAll().forEach(function(pokemon){
        pokemonRepository.addListItem(pokemon);
    
    });
        })
    