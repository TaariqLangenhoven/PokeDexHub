// utils/typeInfo.js
import { fetchType } from '../api/apiCalls.js';

/**
 * Fetches type effectiveness info (weaknesses, resistances, immunities, etc.).
 * @param {string} category - e.g. "double_damage_from", "half_damage_from", etc.
 * @param {string} type1 - Primary Pokémon type.
 * @param {string} type2 - Secondary Pokémon type (optional).
 * @returns {Promise<string[]>} - Array of relevant type names.
 */
export async function getTypeInfo(category, type1, type2 = "") {
  const multipliers = {};
  const typeArray = [];

  try {
    const type1Data = await fetchType(type1);
    let type2Data = type2 && type2 !== "none" ? await fetchType(type2) : null;

    const applyMultipliers = (damage_relations) => {
      damage_relations.double_damage_from.forEach(type => {
        multipliers[type.name] = (multipliers[type.name] || 1) * 2;
      });
      damage_relations.half_damage_from.forEach(type => {
        multipliers[type.name] = (multipliers[type.name] || 1) * 0.5;
      });
      damage_relations.no_damage_from.forEach(type => {
        multipliers[type.name] = 0;
      });
    };

    const collectTypes = (damage_relations, key) => {
      if (damage_relations[key]) {
        damage_relations[key].forEach(item => typeArray.push(item.name));
      }
    };

    applyMultipliers(type1Data.damage_relations);
    collectTypes(type1Data.damage_relations, category);

    if (type2Data) {
      applyMultipliers(type2Data.damage_relations);
      collectTypes(type2Data.damage_relations, category);
    }

    const unique = (arr) => [...new Set(arr)];

    const calculatedImmunities = Object.entries(multipliers)
      .filter(([_, mult]) => mult === 0)
      .map(([type]) => type);

    const calculatedResistants = Object.entries(multipliers)
      .filter(([_, mult]) => mult > 0 && mult < 1)
      .map(([type]) => type);

    const calculatedWeaknesses = Object.entries(multipliers)
      .filter(([_, mult]) => mult > 1)
      .map(([type]) => type);

    switch (category) {
      case "no_damage_from":
        return unique(calculatedImmunities);
      case "half_damage_from":
        return unique(calculatedResistants);
      case "double_damage_from":
        return unique(calculatedWeaknesses);
      case "double_damage_to":
        return unique(type1Data.damage_relations.double_damage_to.map(t => t.name));
      default:
        return unique(typeArray);
    }
  } catch (error) {
    console.error("Error in getTypeInfo:", error.message);
    return [];
  }
}
