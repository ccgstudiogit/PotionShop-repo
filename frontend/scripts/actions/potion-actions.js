import * as potionApi from '../api/potion-api.js';
import * as normalizeDTO from './normalize-dto.js';

/**
 * Fetches all potions from the backend via the API layer and returns them (does not get potion ingredients).
 * 
 * @async
 * @returns {Array} An array of potion objects, or undefined if there was an error fetching the potions.
 * @throws {Error} Throws an error with the backend message if a problem is encountered.
 */
export async function getAllPotions() {
  const potions = await potionApi.fetchAllPotions();
  return potions;
}

/**
 * Fetches all potions with their ingredients from the backend via the API layer and returns them.
 * 
 * @async
 * @returns {Array} An array of potion objects, or undefined if there was an error fetching the potions.
 * @throws {Error} Throws an error with the backend message if a problem is encountered.
 */
export async function getAllPotionsWithIngredients() {
  const potions = await potionApi.fetchAllPotionsWithIngredients();
  potions.forEach((potion) => {
    potion.ingredients = potion.ingredients.map(ingredient =>
      normalizeDTO.normalizeIngredient(ingredient)
    );
  });

  return potions;
}

/**
 * Fetches ingredients for a specific potion from the backend via the API layer and returns them.
 * 
 * @async
 * @param {Integer} potionId - The ID of the potion for which to fetch ingredients.
 * @returns {Array} An array of ingredient objects, or undefined if there was an error fetching the ingredients.
 * @throws {Error} Throws an error with the backend message if a problem is encountered.
 */
export async function getIngredientsByPotionId(potionId) {
  const ingredients = await potionApi.fetchIngredientsByPotionId(potionId);
  ingredients = ingredients.map(ingredient =>
    normalizeDTO.normalizeIngredient(ingredient)
  );

  return ingredients;
}

/**
 * Fetches valid potion types (Buff, Healing, Poison, etc.) from the backend via the API layer and returns them.
 * 
 * @async
 * @returns {Array} An array of types, or undefined if there was an error fetching potion types.
 * @throws {Error} Throws an error with the backend message if a problem is encountered.
 */
export async function getPotionTypes() {
  const types = await potionApi.fetchPotionTypes();
  return types;
}

/**
 * Fetches potions from the backend using the provided filter parameters and normalizes each potion's ingredient DTOs.
 * This function acts as the bridge between the API layer and the UI layer by ensuring all potion data is in a
 * consistent format before being rendered.
 *
 * @async
 * @param {string|null} name - Optional substring to filter potion names.
 * @param {string[]|null} types - Optional array of potion types to filter by.
 * @param {string|null} inequalitySign - Optional price comparison operator ("<", ">", "<=", ">=").
 * @param {string|number|null} price - Optional price value to compare against.
 * @returns {Promise<Object[]>} A promise resolving to an array of normalized potion objects.
 */
export async function getPotionsWithFilters(name, types, inequalitySign, price) {
  const potions = await potionApi.fetchPotionsWithFilters(name, types, inequalitySign, price);
  potions.forEach((potion) => {
    potion.ingredients = potion.ingredients.map(ingredient =>
      normalizeDTO.normalizeIngredient(ingredient)
    );
  });
  
  return potions;
}

/**
 * Creates a new potion by delegating to the potion API layer. This function acts as the service-level wrapper between
 * the UI and the backend-facing API module.
 *
 * @async
 * @param {string} name - The name of the potion to create.
 * @param {string} type - The potion type (must match backend PotionType enum).
 * @param {number|string} price - The potion's price. String or integer is fine since string will be converted to a number.
 * @param {string} effect - Description of the potion's effect.
 * @param {Object.<string, HTMLInputElement>} quantityInputs A dictionary where keys are ingredient IDs and values are
 *        the corresponding quantity `<input>` elements.
 * @returns {Promise<Object|null>} The created potion DTO returned by the backend, or null if an error occurs.
 * @throws {Error} Throws an error with the backend message if a problem is encountered.
 */
export async function addPotion(name, type, price, effect, quantityInputs) {
  const added = await potionApi.addPotion(name, type, price, effect, quantityInputs);
  return added;
}

/**
 * Sends an update request for an existing potion to the backend. Wraps the lower-level API call and returns the updated
 * potion object.
 *
 * @async
 * @param {number} potionId - The ID of the potion being updated.
 * @param {string} name - The updated potion name.
 * @param {string} type - The updated potion type (must match backend PotionType enum).
 * @param {number|string} price - The updated potion price.
 * @param {string} effect - The updated potion effect/description.
 * @param {Object<string, HTMLInputElement>} quantityInputs - Map of ingredientId → quantity input element.
 * @returns {Promise<Object>} The updated potion returned by the backend.
 */
export async function putPotion(potionId, name, type, price, effect, quantityInputs) {
  const updated = await potionApi.putPotion(potionId, name, type, price, effect, quantityInputs);
  return updated;
}

/**
 * Send a DELETE request to delete a potion by its id to the backend.
 * 
 * @async
 * @param {Integer} potionId - The potion's id that should be deleted.
 * @returns {void}
 * @throws {Error} Throws an error with the backend message if a problem is encountered.
 */
export async function deletePotion(potionId) {
  await potionApi.deletePotion(potionId);
}
