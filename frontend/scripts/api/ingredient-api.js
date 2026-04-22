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
 * Send a DELETE request to delete an ingredient by its id to the backend.
 * 
 * @async
 * @param {Integer} ingredientId The ingredient's id that should be deleted.
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