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