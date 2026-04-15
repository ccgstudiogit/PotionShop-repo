import * as elementFactory from '../../utils/element-factory.js';

/**
 * Renders an ingredient element in the DOM.
 * 
 * @param {Object} ingredient - The ingredient object to render (as JSON)
 * @returns {{
 *   root: HTMLDivElement,
 *   infoContainer: HTMLDivElement,
 *   nameElement: HTMLParagraphElement,
 *   rarityElement: HTMLParagraphElement
 * }}
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