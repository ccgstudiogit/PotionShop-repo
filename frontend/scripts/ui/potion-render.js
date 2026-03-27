import * as elementFactory from '../utils/element-factory.js';
import * as ingredientRenderer from './ingredient-render.js';

export function renderPotion(potion) {
  const potionElement = elementFactory.createElement('div', 'item');
  const displayContainer = elementFactory.createAndAppendElement('div', 'potion-display', potionElement);

  // Potion image
  const image = elementFactory.createAndAppendElement('img', 'potion-icon', displayContainer);
  image.src = '../icons/potion-icon.png';

  // Potion info, including name, type, effect, etc.
  const infoContainer = elementFactory.createAndAppendElement('div', 'potion-info', displayContainer);

  // Potion name, type, and cost
  const infoHeader = elementFactory.createAndAppendElement('div', 'potion-info-header', infoContainer);
  const potionName = elementFactory.createAndAppendElement('p', ['potion-name', 'font-jersey'], infoHeader);
  potionName.textContent = potion.name;
  const potionType = elementFactory.createAndAppendElement('p', ['potion-type', 'font-jersey'], infoHeader);
  potionType.textContent = potion.type;
  const infoPriceContainer = elementFactory.createAndAppendElement('div', 'potion-price-container', infoHeader);
  const infoPriceIcon = elementFactory.createAndAppendElement('img', 'potion-price-icon', infoPriceContainer);
  infoPriceIcon.src = '../icons/coin-icon.png';
  const potionPrice = elementFactory.createAndAppendElement('p', ['potion-price', 'font-jersey'], infoPriceContainer);
  potionPrice.textContent = potion.price;

  // Potion effect
  const infoBody = elementFactory.createAndAppendElement('div', 'potion-info-body', infoContainer);
  const potionEffect = elementFactory.createAndAppendElement('p', ['potion-effect', 'font-jersey'], infoBody);
  potionEffect.textContent = potion.effect;

  // For displaying a potion's ingredients
  const ingredientsContainer = elementFactory.createAndAppendElement('div', 'potion-ingredients-container', potionElement);

  const ingredientsButtonContainer = elementFactory.createAndAppendElement('div', 'potion-ingredients-button-container', ingredientsContainer);
  const ingredientsButton = elementFactory.createAndAppendElement('button', 'potion-ingredients-button', ingredientsButtonContainer);
  ingredientsButton.textContent = 'Show Ingredients (+)';

  const ingredient1 = {
    id: 1,
    name: 'Appleseed',
    rarity: 'Common'
  }

  const ingredient2 = {
    id: 2,
    name: 'Dragon Scale',
    rarity: 'Rare'
  }

  const ingredient1Rendered = ingredientRenderer.renderIngredient(ingredient1);
  const ingredient2Rendered = ingredientRenderer.renderIngredient(ingredient2);

  ingredientsContainer.appendChild(ingredient1Rendered);
  ingredientsContainer.appendChild(ingredient2Rendered);

  return potionElement;
}