import * as elementFactory from '../../utils/element-factory.js';

/**
 * Renders an ingredient element in the DOM.
 * 
 * @param {Object} ingredient - The ingredient object to render (as JSON)
 * @returns {Object} An object containing:
 * - {HTMLElement} root: The root HTML element for the ingredient
 * - {HTMLElement} infoContainer: The container holding name/rarity/quantity
 * - {HTMLElement} nameElement: The HTML element for the ingredient's name
 * - {HTMLElement} rarityElement: The HTML element for the ingredient's rarity
 */
export function renderIngredient(ingredient) {
  const ingredientElement = elementFactory.createElement('div', 'ingredient-item');
  const displayContainer = elementFactory.createAndAppendElement('div', 'ingredient-display', ingredientElement);

  // Ingredient image
  const image = elementFactory.createAndAppendElement('img', 'ingredient-icon', displayContainer);
  image.src = '../icons/ingredient-icon.png';

  // Ingredient name and rarity
  const infoContainer = elementFactory.createAndAppendElement('div', 'ingredient-info', displayContainer);
  const ingredientName = elementFactory.createAndAppendElement('p', ['ingredient-name', 'font-jersey'], infoContainer);
  ingredientName.textContent = ingredient.name;
  const ingredientRarity = elementFactory.createAndAppendElement('p', ['ingredient-rarity', 'font-jersey'], infoContainer);
  ingredientRarity.textContent = ingredient.rarity;

  return {
    root: ingredientElement,
    infoContainer: infoContainer,
    nameElement: ingredientName,
    rarityElement: ingredientRarity
  };
}