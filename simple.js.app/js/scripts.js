let pokemonRepository = (function() {
let pokemonList = [
    { name: "Bulbasaur",
        height: 70,
        weight: 6.9,
        types:['Grass','Poison'],
        eggGroups:['Monster', 'Grass'],
        catchRate: 0,
        number: 1 
        },

    { name: "Ivysaur",
        height: 100,
        weight: 13,
        types:['Grass','Poison'],
        eggGroups:['Monster', 'Grass'],
        catchRate: 0 , 
        number: 2
         },
    { name: "Venusaur",
        height: 200,
        weight: 100,
        types:['Grass','Poison'],
        eggGroups:['Monster', 'Grass'],
        catchRate: 0,
        number: 3 
        },
    { name: "Charmander",
        height: 60,
        weight: 8.5,
        types:['Fire'],
        eggGroups:['Monster','Dragon'],
        catchRate: 0, 
        number: 4 
        },
    { name: "Charmeleon",  
        height: 110, 
        weight: 19, 
        types:['Fire'], 
        eggGroups:['Monster','Dragon'], 
        catchRate: 0, 
        number: 5 
        },
    { name: "Charzard", 
        height: 170, 
        weight: 90.5, 
        types:['Fire','Flying'], 
        eggGroups:['Monster','Dragon'], 
        catchRate: 0, 
        number:6 
        },
    { name: "Squirtle", 
        height: 50, 
        weight: 9, 
        types:['Water'], 
        eggGroups:['Monster','Water'], 
        catchRate: 0, 
        number: 7 
        },
    { name: "Wartortle", 
        height: 100, 
        weight: 22.5,
        types:['Water'], 
        eggGroups:['Monster','Water'], 
        catchRate: 0, 
        number: 8 
        },
    { name: "Blastoise", 
        height: 160, 
        weight: 85.5, 
        types:['Water'], 
        eggGroups:['Monster','Water'], 
        catchRate: 0, 
        number: 9 
        }]

    function add(pokemon){
        pokemonList.push(pokemon);
    }

    function addListItem(pokemon) {
        let pokemonList = document.querySelector('.pokemon-list');
        let listpokemon = document.createElement('li');
        let button =document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add("button-class");
        listpokemon.appendChild(button);
        pokemonList.appendChild(listpokemon);
    }

    function getAll() {
        return pokemonList
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
    };
})();

// adding for and if statements to print out names on my si
pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);

});
    
    

