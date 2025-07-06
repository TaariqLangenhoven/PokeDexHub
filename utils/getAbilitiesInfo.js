// utils/abilityInfo.js
import { fetchAbility } from '../api/apiCalls.js';

/**
 * Fetches and formats the English description of a Pokémon ability.
 * @param {string} abilityName - The name of the ability to fetch.
 * @returns {Promise<string>} - The English flavor text description.
 */
export async function getAbilityDescription(abilityName) {
  try {
    const data = await fetchAbility(abilityName);

    const englishEntries = data.flavor_text_entries?.filter(
      (entry) => entry.language.name === "en"
    );

    const descriptionText = englishEntries?.[0]?.flavor_text;

    if (!descriptionText) {
      throw new Error("Ability description not available.");
    }

    const description = descriptionText.replace(/\n/g, " ").replace(/\f/g, " ");
    return description;
  } catch (error) {
    console.error("Error fetching ability description:", error.message);
    throw new Error("Failed to get ability description.");
  }
}
