import * as potionApi from '../api/potion-api.js';

/**
 * Fetches all potions from the backend via the API layer and returns them.
 *  
 * @returns {Array} An array of potion objects, or undefined if there was an error fetching the potions
 */
export async function getAllPotions() {
  const potions = await potionApi.fetchAllPotions();
  return potions;
}

/**
 * Fetches ingredients for a specific potion from the backend via the API layer and returns them.
 * 
 * @param {Integer} potionId - The ID of the potion for which to fetch ingredients
 * @returns {Array} An array of ingredient objects, or undefined if there was an error fetching the ingredients
 */
export async function getIngredientsByPotionId(potionId) {
  const ingredients = await potionApi.fetchIngredientsByPotionId(potionId);
  return ingredients;
}