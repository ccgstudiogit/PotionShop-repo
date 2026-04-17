import * as ingredientApi from '../api/ingredient-api.js';

/**
 * Fetches all ingredients from the backend via the API layer and returns them.
 * 
 * @async
 * @returns {Array} An array of ingredient objects, or undefined if there was an error fetching the ingredients
 * @throws {Error} Throws an error with the backend message if a problem is encountered
 */
export async function getAllIngredients() {
  const ingredients = await ingredientApi.fetchAllIngredients();
  return ingredients;
}
