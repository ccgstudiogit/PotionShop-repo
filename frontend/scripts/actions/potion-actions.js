import * as potionApi from '../api/potion-api.js';

/**
 * Fetches all potions from the backend via the API layer and returns them.
 *  
 * @returns {Array} An array of potion objects, or undefined if there was an error fetching the potions.
 */
export async function getAllPotions() {
  const potions = await potionApi.fetchAllPotions();
  return potions;
}