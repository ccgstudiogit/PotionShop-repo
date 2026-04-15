import * as potionApi from '../api/potion-api.js';

/**
 * Fetches all potions from the backend via the API layer and returns them.
 *  
 * @returns {Array} An array of potion objects, or undefined if there was an error fetching the potions
 * @throws {Error} Throws an error with the backend message if a problem is encountered
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
 * @throws {Error} Throws an error with the backend message if a problem is encountered
 */
export async function getIngredientsByPotionId(potionId) {
  const ingredients = await potionApi.fetchIngredientsByPotionId(potionId);
  return ingredients;
}

/**
 * Fetches valid potion types (Buff, Healing, Poison, etc.) from the backend via the API layer and returns them.
 * 
 * @returns {Array} An array of types, or undefined if there was an error fetching potion types
 * @throws {Error} Throws an error with the backend message if a problem is encountered
 */
export async function getPotionTypes() {
  const types = await potionApi.fetchPotionTypes();
  return types;
}

/**
 * Creates a new potion by delegating to the potion API layer. This function acts as the service-level wrapper between
 * the UI and the backend-facing API module.
 *
 * @param {string} name - The name of the potion to create
 * @param {string} type - The potion type (must match backend PotionType enum)
 * @param {number|string} price - The potion's price. String or integer is fine since string will be converted to a number
 * @param {string} effect - Description of the potion's effect
 * @param {Object.<string, HTMLInputElement>} quantityInputs A dictionary where keys are ingredient IDs and values are
 *        the corresponding quantity `<input>` elements
 * @returns {Promise<Object|null>} The created potion DTO returned by the backend, or null if an error occurs
 * @throws {Error} Throws an error with the backend message if a problem is encountered
 */
export async function addPotion(name, type, price, effect, quantityInputs) {
  const added = await potionApi.addPotion(name, type, price, effect, quantityInputs);
  return added;
}