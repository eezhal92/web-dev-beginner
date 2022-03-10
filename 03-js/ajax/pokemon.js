const getBtn = document.getElementById('get-btn');
const container = document.getElementById('container');

getBtn.addEventListener('click', () => {
  fetchAndShowPokemonList();
});

function fetchAndShowPokemonList () {
  fetch('https://pokeapi.co/api/v2/pokemon')
    .then(response => response.json())
    .then(function (data) {
      console.log(data.results);

      data.results.forEach((pokemon) => {
        const card = createPokemonCard(pokemon.name);
        container.appendChild(card);
      })
    });
}

function createPokemonCard (pokemonName) {
  const div = document.createElement('div');

  div.setAttribute('class', 'pokemon-card');

  div.innerText = pokemonName;

  return div;
}
