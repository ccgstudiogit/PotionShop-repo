import * as elementFactory from '../utils/element-factory.js';

export function renderIngredient(ingredient) {
  const ingredientElement = elementFactory.createElement('div', 'item');
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
  console.log(ingredient);

  return ingredientElement;
}