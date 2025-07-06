// utils/processPokemonData.js
import { getSpeciesDescription } from '../utils/helpers.js'
import { getAbilityDescription } from './getAbilitiesInfo.js'
import { getTypeInfo } from './getTypeInfo.js'
import { getPokemonMovesByLevel } from '../utils/moveListHelpers.js'
import { API_ENDPOINTS } from '../api/endpoints.js'

const { MOVE } = API_ENDPOINTS

export async function processPokemonData(data, speciesData) {
  const ability1 = data.abilities[0].ability.name
  const ability2 = data.abilities[1]?.ability.name || "none"
  const { front_default } = data.sprites
  const type1 = data.types[0].type.name
  const type2 = data.types[1]?.type.name || "none"
  const weight = data.weight
  const height = data.height
  const stats = data.stats
  const name = data.name

  const entry1 = getSpeciesDescription(speciesData)
  const pokemonCaptureRate = speciesData.capture_rate
  const pokemonHp = stats[0].base_stat

  const resistantAgainstTypeInfo = await getTypeInfo("half_damage_from", type1, type2)
  const weakAgainstTypeInfo = await getTypeInfo("double_damage_from", type1, type2)
  const immuneAgainstTypeInfo = await getTypeInfo("no_damage_from", type1, type2)
  const superEffectiveAgainst = await getTypeInfo("double_damage_to", type1)

  const ability1ShortDescription = await getAbilityDescription(ability1)
  const ability2ShortDescription = ability2 !== "none" ? await getAbilityDescription(ability2) : "None"

  //refactor the function in the future, we dont want to use API_ENDPOINTS its redundant, 
  // because we have a functions that fetches a pokemon's Move-list
  const moves = await getPokemonMovesByLevel(data, MOVE)

  return {
    name,
    front_default,
    type1,
    type2,
    weight,
    height,
    stats,
    entry1,
    pokemonCaptureRate,
    pokemonHp,
    ability1,
    ability1ShortDescription,
    ability2,
    ability2ShortDescription,
    resistantAgainstTypeInfo,
    weakAgainstTypeInfo,
    immuneAgainstTypeInfo,
    superEffectiveAgainst,
    moves,
    data
  }
}
