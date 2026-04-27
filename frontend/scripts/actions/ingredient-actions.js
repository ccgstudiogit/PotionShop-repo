import * as ingredientApi from '../api/ingredient-api.js';

/**
 * Fetches all ingredients from the backend via the API layer and returns them.
 * 
 * @async
 * @returns {Array} An array of ingredient objects, or undefined if there was an error fetching the ingredients.
 * @throws {Error} Throws an error with the backend message if a problem is encountered.
 */
export async function getAllIngredients() {
  const ingredients = await ingredientApi.fetchAllIngredients();
  return ingredients;
}

/**
 * Send a DELETE request to delete an ingredient by its id to the backend.
 * 
 * @async
 * @param {Integer} ingredientId - The ingredient's id that should be deleted.
 * @returns {void}
 * @throws {Error} Throws an error with the backend message if a problem is encountered.
 */
export async function deleteIngredient(ingredientId) {
  await ingredientApi.deleteIngredient(ingredientId);
}

/**
 * Fetches valid ingredient rarities (Common, Uncommon, Rare, etc.) from the backend via the API layer and returns them.
 * 
 * @async
 * @returns {Array} An array of rarities, or undefined if there was an error fetching ingredient rarities.
 * @throws {Error} Throws an error with the backend message if a problem is encountered.
 */
export async function getRarities() {
  const rarities = await ingredientApi.fetchRarities();
  return rarities;
}