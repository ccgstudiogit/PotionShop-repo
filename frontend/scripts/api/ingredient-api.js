/**
 * Fetches all ingredients from the backend API.
 * 
 * @returns {Array} An array of ingredient objects, or undefined if there was an error fetching the ingredients.
 */
export async function fetchAllIngredients() {
  try {
    const response = await fetch('http://localhost:8080/ingredients', { method: 'GET' });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const ingredients = await response.json();
    return ingredients;
  } catch (error) {
    console.error('Error fetching ingredients:', error);
  }
}