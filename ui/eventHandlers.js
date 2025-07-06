// ui/eventHandlers.js
export function setupNavigationButtons(fetchData, currentPokemonId, searchInput) {
  document.querySelector(".nextBtn").addEventListener("click", () => {
    fetchData(currentPokemonId + 1)
    searchInput.value = ""
  })

  document.querySelector(".prevBtn").addEventListener("click", () => {
    fetchData(currentPokemonId - 1)
    searchInput.value = ""
  })
}

export function setupTabButtons({
  data,
  type1,
  weak,
  resist,
  immune,
  superEffective,
  moves,
  entryInfo,
  type2,
  weight,
  height,
  ability1,
  ability1Description,
  ability2,
  ability2Description,
  captureRate,
  hp,
  getStatsSection,
  getChartData,
  getAboutSection,
  getMoveSection,
  displayPokemonMovesByLevel,
  container,
  chartRef
}) {
  document.getElementById("pokemonStatsBtn").addEventListener("click", () => {
    container.innerHTML = getStatsSection(data, type1, weak, resist, immune, superEffective)
    getChartData(data, chartRef)
  })

  document.getElementById("pokemonAboutBtn").addEventListener("click", () => {
    container.innerHTML = getAboutSection(type1, entryInfo, type2, weight, height, ability1, ability1Description, ability2, ability2Description, captureRate, hp)
  })

  document.getElementById("pokemonMovesBtn").addEventListener("click", () => {
    container.innerHTML = getMoveSection()
    displayPokemonMovesByLevel(moves)
  })
}
