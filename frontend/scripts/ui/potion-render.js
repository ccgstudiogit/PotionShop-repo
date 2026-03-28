import * as elementFactory from '../utils/element-factory.js';
import * as potionActions from '../actions/potion-actions.js';
import * as ingredientRenderer from './ingredient-render.js';

/**
 * Renders a potion element in the DOM.
 * 
 * @param {Object} potion - The potion object to render (as JSON).
 * @returns {HTMLElement} The rendered potion element.
 */
export async function renderPotion(potion) {
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
  ingredientsButton.addEventListener('click', () => {
    ingredientsButton.textContent = ingredientsButton.textContent.includes('Show') ? 'Hide Ingredients (-)' : 'Show Ingredients (+)';
  });

  // Get the ingredients for this potion and add them to the DOM, initially hidden until the button is clicked to show them
  const ingredients = await potionActions.getIngredientsByPotionId(potion.id);
  ingredients.forEach((ingredient) => {
    const renderedIngredient = ingredientRenderer.renderIngredient(ingredient);
    ingredientsContainer.appendChild(renderedIngredient);
    renderedIngredient.style.display = 'none';
    ingredientsButton.addEventListener('click', () => {
      renderedIngredient.style.display = renderedIngredient.style.display !== 'none' ? 'none' : 'flex';
    });
  });

  return potionElement;
}