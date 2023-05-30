let pokemonRepository = (function() {
let pokemonList = [];
let apiUrl ='https://pokeapi.co/api/v2/pokemon/?limit=150';

    

    function add(pokemon){
        pokemonList.push(pokemon);
    }    
    

//adding funtion to list pokemon
    function addListItem(pokemon) {
        let pokemonList = document.querySelector('.pokemon-list');
        let listpokemon = document.createElement('li');
        let button =document.createElement('button');
        //adding an event listener
        button.addEventListener('click', function(event){
            showDetails(pokemon);
            showModal(pokemon);
        });
        button.innerText = pokemon.name.toUpperCase();
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
        let name = item.name;
        let capitalLetter = name.charAt(0).toUpperCase();
        capitalName  = capitalLetter + name.slice(1);
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
                showModal(item);
                console.log(item);
        });
    }

    function getAll() {
        return pokemonList;
    }
    //adding interactive modal 
    function showModal(item) {
        let modalContainer = document.querySelector('#modal-container');
         modalContainer.innerHTML = '';
       
        let modal = document.createElement('div');
        modal.classList.add('modal');
    
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);
    
        let titleElement = document.createElement('h1');
        titleElement.innerText =(capitalName) ;
        
        let contentElement = document.createElement('p');
        contentElement.innerText = 'Height: ' + (item.height) +'\n'  + ' Weight: ' + (item.weight) ;
        
        let imagePokemon = document.createElement('img');
        imagePokemon.setAttribute('src', item.imageUrl);
        imagePokemon.setAttribute('height', '200');
        imagePokemon.setAttribute('width', '270');
        imagePokemon.setAttribute('alt', "Pokemon Image");


        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        modal.appendChild(imagePokemon);
        modalContainer.appendChild(modal);
        
        modalContainer.classList.add('is-visible');
        
        
    
    
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();  
        }
        });
    
        modalContainer.addEventListener('click', (e) => {
            let target = e.target;
            if (target === modalContainer) {
                hideModal();
        }
        });
        function hideModal() {
            
            modalContainer.classList.remove('is-visible');
        }
    }
    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
        showModal: showModal
    
    };
})();


pokemonRepository.loadList().then(function() {

// adding for and if statements to print out names on my site
pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);

});
    })
