import * as elementFactory from '../../utils/element-factory.js';
import * as buttonFactory from '../../utils/button-factory.js';

/**
 * Renders an ingredient element in the DOM.
 * 
 * @param {Object} ingredient - The ingredient object to render (as JSON)
 * @returns {{
 *   root: HTMLDivElement,
 *   infoContainer: HTMLDivElement,
 *   nameElement: HTMLParagraphElement,
 *   rarityElement: HTMLParagraphElement,
 *   removeButton: HTMLButtonElement
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

  // Ingredient remove button. The button's onClick event should be handled by the caller function
  const removeButton = buttonFactory.createAndAppendButton('Remove', 'ingredient-remove-button', infoContainer, null);

  return {
    root: ingredientElement,
    infoContainer,
    nameElement: ingredientName,
    rarityElement: ingredientRarity,
    removeButton
  };
}