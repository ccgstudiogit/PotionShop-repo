import * as ingredientApi from '../api/ingredient-api.js';

/**
 * Fetches all ingredients from the backend via the API layer and returns them.
 *  
 * @returns {Array} An array of ingredient objects, or undefined if there was an error fetching the ingredients
 */
export async function getAllIngredients() {
  const ingredients = await ingredientApi.fetchAllIngredients();
  return ingredients;
}