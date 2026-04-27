import * as errorHandler from './api-error-handling.js';

/**
 * Fetches all ingredients from the backend API.
 * 
 * @async
 * @returns {Array} An array of ingredient objects, or undefined if there was an error fetching the ingredients.
 * @throws {Error} Throws an error with the backend message if a problem is encountered.
 */
export async function fetchAllIngredients() {
  const response = await fetch('http://localhost:8080/ingredients', { method: 'GET' });

  if (!response.ok) {
    const message = await errorHandler.parseError(response);
    throw new Error(message);
  }

  const ingredients = await response.json();
  return ingredients;
}

/**
 * Fetches ingredients from the backend using the provided filter parameters.
 * Builds a dynamic query string based on which filters are supplied:
 *
 * - name: optional substring match for ingredient names
 * - rarities: optional array of ingredient rarities (sent as repeated `rarity` params)
 * - inequalitySign + price: optional price filter (e.g., >= 50)
 *
 * Only filters that contain valid values are included in the request.
 *
 * @async
 * @param {string|null} name - The name substring to filter by, or null to omit.
 * @param {string[]|null} rarities - An array of ingredient rarities to include, or null/empty to omit.
 * @returns {Promise<Object[]>} A promise resolving to an array of ingredient objects returned by the backend.
 * @throws {Error} If the backend responds with a non-OK status.
 */
export async function fetchIngredientsWithFilters(name, rarities) {
  const baseUrl = 'http://localhost:8080/ingredients/search';
  const url = new URL(baseUrl);

  if (name) {
    url.searchParams.set('name', name);
  }

  if (rarities && rarities.length > 0) {
    rarities.forEach(rarity => {
      url.searchParams.append('rarity', rarity);
    });
  }

  const response = await fetch(url, { method: 'GET' });

  if (!response.ok) {
    const message = await errorHandler.parseError(response);
    throw new Error(message);
  }

  const potions = await response.json();
  return potions;
}

/**
 * Fetches the rarities ingredients can have (Common, Uncommon, Rare, etc.).
 * 
 * @async
 * @returns {Array} An array of rarities, or undefined if there was an error fetching ingredient rarities.
 * @throws {Error} Throws an error with the backend message if a problem is encountered.
 */
export async function fetchRarities() {
  const response = await fetch('http://localhost:8080/ingredients/rarities', { method: 'GET' });

  if (!response.ok) {
    const message = await errorHandler.parseError(response);
    throw new Error(message);
  }

  const rarities = await response.json();
  return rarities;
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
  const response = await fetch(`http://localhost:8080/ingredients/${ingredientId}`, { method: 'DELETE' });

  if (!response.ok) {
    const message = await errorHandler.parseError(response);
    throw new Error(message);
  }
}