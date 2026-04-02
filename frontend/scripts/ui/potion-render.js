import * as elementFactory from '../utils/element-factory.js';
import * as potionActions from '../actions/potion-actions.js';
import * as ingredientRenderer from './ingredient-render.js';
import * as mathHelper from '../utils/math-helper.js';

const potionIcons = [
  'potion-icon-0.png',
  'potion-icon-1.png',
  'potion-icon-2.png',
  'potion-icon-3.png',
  'potion-icon-4.png'
];

/**
 * Renders a potion element in the DOM.
 * 
 * @param {Object} potion - The potion object to render (as JSON)
 * @returns {Object} An object containing:
 * - {HTMLElement} root: The root HTML element for the potion
 * - {HTMLElement} infoHeader: The container holding the potion's name/type/cost
 * - {HTMLElement} potionName: The HTML element for the potion's name
 * - {HTMLElement} potionType: The HTML element for the potion's type
 * - {HTMLElement} potionPrice: The HTML element for the potion's price
 * - {HTMLElement} infoBody: The container holding the potion's effect
 * - {HTMLElement} potionEffect: The HTML element for the potion's effect
 * - {HTMLElement} ingredientsContainer: The container for the potion's ingredients
 * - {HTMLElement} ingredientsButton: The button to show/hide the potion's ingredients
 */
export async function renderPotion(potion) {
  const potionElement = elementFactory.createElement('div', 'potion-item');
  const displayContainer = elementFactory.createAndAppendElement('div', 'potion-display', potionElement);

  // Potion icon (choose a random one from potionIcons)
  const icon = elementFactory.createAndAppendElement('img', 'potion-icon', displayContainer);
  const index = potion.id % potionIcons.length;
  icon.src = `../icons/potion-icon-${index}.png`;

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
    const ingredientObject = ingredientRenderer.renderIngredient(ingredient);
    ingredientsContainer.appendChild(ingredientObject.root);

    // Add the ingredient quantity to the ingredient display
    const ingredientInfo = ingredientObject.infoContainer;
    const ingredientQuantity = elementFactory.createAndAppendElement('p', ['ingredient-quantity', 'font-jersey'], ingredientInfo);
    ingredientQuantity.textContent = `x${ingredient.quantity}`;

    // Handle showing/hiding the ingredients when the button is clicked
    ingredientObject.root.style.display = 'none';
    ingredientsButton.addEventListener('click', () => {
      ingredientObject.root.style.display = ingredientObject.root.style.display !== 'none' ? 'none' : 'flex';
    });
  });

  return {
    root: potionElement,
    infoHeader: infoHeader,
    potionName: potionName,
    potionType: potionType,
    potionPrice: potionPrice,
    infoBody: infoBody,
    potionEffect: potionEffect,
    ingredientsContainer: ingredientsContainer,
    ingredientsButton: ingredientsButton
  }
}