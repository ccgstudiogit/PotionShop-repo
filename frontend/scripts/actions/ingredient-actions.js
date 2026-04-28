import * as ingredientApi from '../api/ingredient-api.js';
import * as normalizeDTO from './normalize-dto.js';

/**
 * Fetches all ingredients from the backend via the API layer and returns them.
 * 
 * @async
 * @returns {Array} An array of ingredient objects, or undefined if there was an error fetching the ingredients.
 * @throws {Error} Throws an error with the backend message if a problem is encountered.
 */
export async function getAllIngredients() {
  const ingredients = await ingredientApi.fetchAllIngredients();
  ingredients.forEach((ingredient) => {
    normalizeDTO.normalizeIngredient(ingredient);
  });

  return ingredients;
}

/**
 * Fetches ingredients from the backend using the provided filter parameters and normalizes each ingredient's DTO.
 * This function acts as the bridge between the API layer and the UI layer by ensuring all ingredient data is in a
 * consistent format before being rendered.
 *
 * @async
 * @param {string|null} name - Optional substring to filter ingredient names.
 * @param {string[]|null} rarities - Optional array of ingredient rarities to filter by.
 * @returns {Promise<Object[]>} A promise resolving to an array of normalized ingredient objects.
 */
export async function getIngredientsWithFilters(name, rarities) {
  const ingredients = await ingredientApi.fetchIngredientsWithFilters(name, rarities);
  ingredients.forEach((ingredient) => {
    normalizeDTO.normalizeIngredient(ingredient);
  });
  
  return ingredients;
}

/**
 * Creates a new ingredient by delegating to the ingredient API layer. This function acts as the service-level wrapper between
 * the UI and the backend-facing API module.
 *
 * @async
 * @param {string} name - The name of the ingredient to create.
 * @param {string} rarity - The rarity (must match backend Rarity enum).
 * @returns {Promise<Object|null>} The created ingredient DTO returned by the backend, or null if an error occurs.
 * @throws {Error} Throws an error with the backend message if a problem is encountered.
 */
export async function addIngredient(name, rarity) {
  const added = await ingredientApi.addIngredient(name, rarity);
  return added;
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