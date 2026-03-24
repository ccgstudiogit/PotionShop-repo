export async function fetchAllPotions() {
  try {
    const response = await fetch('http://localhost:8080/potions');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const potions = await response.json();
    return potions;
  } catch (error) {
    console.error('Error fetching potions:', error);
  }
}