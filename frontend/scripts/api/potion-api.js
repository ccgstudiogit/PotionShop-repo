import * as errorHandler from './api-error-handling.js';

/**
 * Fetches all potions from the backend API.
 * 
 * @async
 * @returns {Array} An array of potion objects, or undefined if there was an error fetching the potions.
 * @throws {Error} Throws an error with the backend message if a problem is encountered.
 */
export async function fetchAllPotions() {
  const response = await fetch('http://localhost:8080/potions', { method: 'GET' });

  if (!response.ok) {
    const message = await errorHandler.parseError(response);
    throw new Error(message);
  }

  const potions = await response.json();
  return potions;
}

/**
 * Fetches all potions with their ingredients from the backend API.
 * 
 * @async 
 * @returns {Array} An array of potion objects, or undefined if there was an error fetching the potions.
 * @throws {Error} Throws an error with the backend message if a problem is encountered.
 */
export async function fetchAllPotionsWithIngredients() {
  const response = await fetch('http://localhost:8080/potions/ingredients', { method: 'GET' });

  if (!response.ok) {
    const message = await errorHandler.parseError(response);
    throw new Error(message);
  }

  const potions = await response.json();
  return potions;
}

/**
 * Fetches ingredients for a specific potion from the backend API.
 * 
 * @async
 * @param {Integer} potionId - The ID of the potion for which to fetch ingredients.
 * @returns {Array} An array of ingredient objects, or undefined if there was an error fetching the ingredients.
 * @throws {Error} Throws an error with the backend message if a problem is encountered.
 */
export async function fetchIngredientsByPotionId(potionId) {
  const response = await fetch(`http://localhost:8080/potions/${potionId}/ingredients`, { method: 'GET' });

  if (!response.ok) {
    const message = await errorHandler.parseError(response);
    throw new Error(message);
  }

  const ingredients = await response.json();
  return ingredients;
}

/**
 * Fetches the types potions can be (Buff, Healing, Poison, etc.).
 * 
 * @async
 * @returns {Array} An array of types, or undefined if there was an error fetching potion types.
 * @throws {Error} Throws an error with the backend message if a problem is encountered.
 */
export async function fetchPotionTypes() {
  const response = await fetch('http://localhost:8080/potions/types', { method: 'GET' });

  if (!response.ok) {
    const message = await errorHandler.parseError(response);
    throw new Error(message);
  }

  const types = await response.json();
  return types;
}

export async function fetchPotionsWithFilters(name, types, inequalitySign, price) {
  const baseUrl = 'http://localhost:8080/potions/search';
  const url = new URL(baseUrl);

  if (name) {
    url.searchParams.set('name', name);
  }

  if (types && types.length > 0) {
    types.forEach(type => {
      url.searchParams.append('type', type);
    });
  }

  if (inequalitySign !== null && price !== null) {
    url.searchParams.set('inequalitySign', inequalitySign);
    url.searchParams.set('price', price);
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
 * @async
 * @param {string} name - The name of the potion.
 * @param {string} type - The potion type (must match backend PotionType enum).
 * @param {number|string} price - The potion's price. String or integer is fine since string will be converted to a number.
 * @param {string} effect - Description of the potion's effect.
 * @param {Object.<string, HTMLInputElement>} quantityInputs - A dictionary mapping ingredient IDs to their quantity `<input>` elements.
 * @returns {Promise<Object|null>} The created potion DTO from the backend, or null if an error occurs.
 * @throws {Error} Throws an error with the backend message if a problem is encountered.
 */
export async function addPotion(name, type, price, effect, quantityInputs) {
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
    const message = await errorHandler.parseError(response);
    throw new Error(message);
  }

  const addedPotion = await response.json();
  return addedPotion;
}

/**
 * Sends a PUT request to update an existing potion and its ingredient quantities.
 *
 * @async
 * @param {number} potionId - The ID of the potion being updated.
 * @param {string} name - Updated potion name.
 * @param {string} type - Updated potion type (must match backend PotionType enum).
 * @param {number|string} price - Updated potion price.
 * @param {string} effect - Updated potion effect.
 * @param {Object<string, HTMLInputElement>} quantityInputs - Map of ingredientId → quantity input element.
 * @returns {Promise<Object>} The updated potion (PotionWithIngredientsDTO) returned by the backend.
 * @throws {Error} If the backend responds with a non-OK status.
 */
export async function putPotion(potionId, name, type, price, effect, quantityInputs) {
  // Convert the ingredients list to a list that matches a list of CreatePotionIngredientDTO for the backend
  const ingredients = [];
  for (const [key, value] of Object.entries(quantityInputs)) {
    const ingredient = {
      ingredientId: Number(key),
      quantity: Number(value.value) // .value twice since the first is an <input>, then the 2nd .value gets the input's current value
    }

    ingredients.push(ingredient);
  }

  const response = await fetch(`http://localhost:8080/potions/${potionId}/ingredients`, {
    method: 'PUT',
    headers: {
      "Content-Type": 'application/json'
    },
    // MUST match the backend's UpdatePotionWithIngDTO record
    body: JSON.stringify({
      name,
      type,
      effect,
      price: Number(price),
      ingredients
    })
  });

  if (!response.ok) {
    const message = await errorHandler.parseError(response);
    throw new Error(message);
  }

  const addedPotion = await response.json();
  return addedPotion;
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
  const response = await fetch(`http://localhost:8080/potions/${potionId}`, { method: 'DELETE' });

  if (!response.ok) {
    const message = await errorHandler.parseError(response);
    throw new Error(message);
  }
}
