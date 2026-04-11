/**
 * Fetches all potions from the backend API.
 * 
 * @returns {Array} An array of potion objects, or undefined if there was an error fetching the potions
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
 * @param {Integer} potionId - The ID of the potion for which to fetch ingredients
 * @returns {Array} An array of ingredient objects, or undefined if there was an error fetching the ingredients
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

/**
 * Fetches the types potions can be (Buff, Healing, Poison, etc.).
 * 
 * @returns {Array} An array of types, or undefined if there was an error fetching potion types
 */
export async function fetchPotionTypes() {
  try {
    const response = await fetch('http://localhost:8080/potions/types', { method: 'GET' });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const types = await response.json();
    return types;
  } catch (error) {
    console.error('Error fetching potion types:', error);
  }
}

/**
 * Sends a POST request to create a new potion with its associated ingredients. Converts the UI's quantity input dictionary into a
 * backend-ready list of CreatePotionIngredientDTO objects.
 *
 * Backend contract (CreatePotionWithIngDTO):
 * {
 *   name: string,
 *   type: string,
 *   effect: string,
 *   price: number,
 *   ingredients: [
 *     { ingredientId: number, quantity: number }
 *   ]
 * }
 *
 * @param {string} name - The name of the potion
 * @param {string} type - The potion type (must match backend PotionType enum)
 * @param {number|string} price - The potion's price. String or integer is fine since string will be converted to a number
 * @param {string} effect - Description of the potion's effect
 * @param {Object.<string, HTMLInputElement>} quantityInputs A dictionary mapping ingredient IDs to their quantity `<input>` elements
 * @returns {Promise<Object|null>} The created potion DTO from the backend, or null if an error occurs
 */
export async function addPotion(name, type, price, effect, quantityInputs) {
  try {
    // Convert the ingredients list to a list that matches a list of CreatePotionIngredientDTO for the backend
    const ingredients = [];
    for (const [key, value] of Object.entries(quantityInputs)) {
      const ingredient = {
        ingredientId: Number(key),
        quantity: Number(value.value) // .value twice since the first is an <input>, then the 2nd .value gets the input's current value
      }

      ingredients.push(ingredient);
    }

    const response = await fetch(`http://localhost:8080/potions/ingredients`, {
      method: 'POST',
      headers: { 
        "Content-Type": 'application/json'
      },
      // MUST match the backend's CreatePotionWithIngDTO record
      body: JSON.stringify({
        name,
        type,
        effect,
        price: Number(price),
        ingredients
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}. ${response.statusText}`);
    }

    const addedPotion = await response.json();
    return addedPotion;
  } catch (error) {
    console.error('Error creating new potion:', error);
  }
}