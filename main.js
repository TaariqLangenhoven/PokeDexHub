import { fetchPokemon, fetchSpecies } from './api/apiCalls.js'
import { getPokemonHeadInfo } from './ui/renderHeadSection.js'
import { getAboutSection } from './ui/renderAboutSection.js'
import { getMoveSection } from './ui/renderMovesSection.js'
import { getStatsSection } from './ui/renderStatsSection.js'
import { getChartData } from './chart/chartData.js'
import { displayPokemonMovesByLevel } from './utils/moveListHelpers.js'
import { processPokemonData } from './utils/processPokemonData.js'
import { setupNavigationButtons, setupTabButtons } from './ui/eventHandlers.js'

const searchTxt = document.getElementById("searchTxt")
const searchBtn = document.getElementById("searchBtn")
const pokeDex = document.getElementById("pokeDex")
const pokedexContent = document.getElementById("pokedex-content")
const aboutNavbar = document.querySelector(".about-navbar")

let currentChart;
let currentPokemonData = null;

const fetchData = async (identifier = 1) => {
  try {
    const data = await fetchPokemon(
      typeof identifier === "string" ? identifier.toLowerCase().trim() : identifier
    )
    const speciesData = await fetchSpecies(data.id)
    currentPokemonData = { id: data.id, name: data.name }

    const processed = await processPokemonData(data, speciesData)

    pokeDex.innerHTML = getPokemonHeadInfo(
      processed.data,
      processed.name,
      processed.type1,
      processed.type2,
      processed.front_default
    )

    pokedexContent.innerHTML = getAboutSection(
      processed.type1,
      processed.entry1,
      processed.type2,
      processed.weight,
      processed.height,
      processed.ability1,
      processed.ability1ShortDescription,
      processed.ability2,
      processed.ability2ShortDescription,
      processed.pokemonCaptureRate,
      processed.pokemonHp
    )

    setupNavigationButtons(fetchData, currentPokemonData.id, searchTxt)

    setupTabButtons({
      data: processed.data,
      type1: processed.type1,
      type2: processed.type2,
      weak: processed.weakAgainstTypeInfo,
      resist: processed.resistantAgainstTypeInfo,
      immune: processed.immuneAgainstTypeInfo,
      superEffective: processed.superEffectiveAgainst,
      entryInfo: processed.entry1,
      moves: processed.moves,
      ability1: processed.ability1,
      ability1Description: processed.ability1ShortDescription,
      ability2: processed.ability2,
      ability2Description: processed.ability2ShortDescription,
      weight: processed.weight,
      height: processed.height,
      captureRate: processed.pokemonCaptureRate,
      hp: processed.pokemonHp,
      getStatsSection,
      getChartData,
      getAboutSection,
      getMoveSection,
      displayPokemonMovesByLevel,
      container: pokedexContent,
      chartRef: currentChart
    })

    aboutNavbar.classList.remove("hidden")

  } catch (error) {
    console.error("Could not find Pokémon: ", error.message)
  }
}

searchBtn.addEventListener("click", () => {
  isValidPokemonIdentifier(searchTxt.value)
    ? fetchData(searchTxt.value)
    : alert("Please enter a valid Pokémon name or ID.")
})

searchTxt.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    isValidPokemonIdentifier(searchTxt.value)
      ? fetchData(searchTxt.value)
      : alert("Please enter a valid Pokémon name or ID.")
  }
})

function isValidPokemonIdentifier(input) {
  const namePattern = /^[a-zA-Z\-]+$/
  const idPattern = /^[0-9]+$/
  return namePattern.test(input) || idPattern.test(input)
}
