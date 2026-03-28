/**
 * Fetches all potions from the backend API.
 * 
 * @returns {Array} An array of potion objects, or undefined if there was an error fetching the potions.
 */
export async function fetchAllPotions() {
  try {
    const response = await fetch('http://localhost:8080/potions', { method: 'GET' });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const potions = await response.json();
    return potions;
  } catch (error) {
    console.error('Error fetching potions:', error);
  }
}

/**
 * Fetches ingredients for a specific potion from the backend API.
 * 
 * @param {Integer} potionId - The ID of the potion for which to fetch ingredients.
 * @returns {Array} An array of ingredient objects, or undefined if there was an error fetching the ingredients.
 */
export async function fetchIngredientsByPotionId(potionId) {
  try {
    const response = await fetch(`http://localhost:8080/potions/${potionId}/ingredients`, { method: 'GET' });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const ingredients = await response.json();
    return ingredients;
  } catch (error) {
    console.error(`Error fetching ingredients by potion ID ${potionId}:`, error);
  }
}