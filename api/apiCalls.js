import { API_ENDPOINTS } from './endpoints.js';
import { checkAPIResponse } from '../utils/helpers.js';

export async function fetchPokemon(identifier) {
  const url = `${API_ENDPOINTS.POKEMON}${identifier}`;
  const response = await fetch(url);
  if(!response.ok){
            console.error(`API ERROR ${response.status}: ${response.statusText}`)
            alert("Pokemon not found.")       
        }
  return await response.json();
}

export async function fetchSpecies(id) {
  const response = await fetch(`${API_ENDPOINTS.SPECIES}${id}`);
  checkAPIResponse(response, "SPECIES");
  return await response.json();
}

export async function fetchAbility(abilityName) {
  const response = await fetch(`${API_ENDPOINTS.ABILITY}${abilityName}`);
  checkAPIResponse(response, "ABILITY");
  return await response.json();
}

export async function fetchType(typeName) {
  const response = await fetch(`${API_ENDPOINTS.TYPE}${typeName}`);
  checkAPIResponse(response, "TYPE");
  return await response.json();
}

export async function fetchMove(moveName) {
  const response = await fetch(`${API_ENDPOINTS.MOVE}${moveName}`);
  checkAPIResponse(response, "MOVE");
  return await response.json();
}

// Optional: for future Pokéball/item fetches
/*export async function fetchItem(itemName) {
  const response = await fetch(`${API_ENDPOINTS.ite}${itemName}`);
  checkAPIResponse(response, "ITEM");
  return await response.json();
}*/
