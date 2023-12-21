const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" id="pokemon-${pokemon.number}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('');
        pokemonList.innerHTML += newHtml;

        pokemons.forEach((pokemon) => {
            const pokemonElement = document.getElementById(`pokemon-${pokemon.number}`);
            pokemonElement.addEventListener('click', () => {
                openPokemonDetailsPage(pokemon);
            });
        });
    });
}

function openPokemonDetailsPage(pokemon) {
    const newPage = window.open('', '_blank');
    newPage.document.write(`
        <html>
        <head>
            <title>${pokemon.name} Details</title>
            <link rel="stylesheet" href="/assets/css/details.css">
        </head>
        <body>
            <h1>${pokemon.name} details:</h1>
            <p class="detail">Number: #${pokemon.number}</p>
            <p class="detail">Type: ${pokemon.type}</p>
            <p class="detail">Types: ${pokemon.types.join(', ')}</p>
            <img class="imgDetail" src="${pokemon.photo}" alt="${pokemon.name}">
        </body>
        </html>
    `);
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})