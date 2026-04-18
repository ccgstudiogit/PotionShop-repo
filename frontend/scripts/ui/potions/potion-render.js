import * as elementFactory from '../../utils/element-factory.js';
import * as buttonFactory from '../../utils/button-factory.js';
import * as potionActions from '../../actions/potion-actions.js';
import * as ingredientRenderer from '../ingredients/ingredient-render.js';

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
 * Builds a visual representation of a potion, including:
 * - icon
 * - name, type, and price
 * - effect description
 * - expandable ingredient list with quantities
 * 
 * @param {Object} potion - The potion object to render (as JSON)
 * @returns {{
 *   root: HTMLDivElement,
 *   infoHeader: HTMLDivElement,
 *   potionName: HTMLParagraphElement,
 *   potionType: HTMLParagraphElement,
 *   potionPrice: HTMLParagraphElement,
 *   editButton: HTMLButtonElement
 *   infoBody: HTMLDivElement,
 *   potionEffect: HTMLParagraphElement,
 *   ingredientsContainer: HTMLDivElement,
 *   ingredientsButton: HTMLButtonElement
 * }} DOM references for the rendered potion element
 */
export function renderPotion(potion) {
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

  // Potion edit button. The button's onClick event should be handled by the caller function
  const editButton = buttonFactory.createAndAppendButton('Edit', 'potion-edit-button', infoHeader, null);

  // Potion effect
  const infoBody = elementFactory.createAndAppendElement('div', 'potion-info-body', infoContainer);
  const potionEffect = elementFactory.createAndAppendElement('p', ['potion-effect', 'font-jersey'], infoBody);
  potionEffect.textContent = potion.effect;

  // Potion remove button
  const removeButton = buttonFactory.createAndAppendButton('Remove', 'potion-remove-button', infoBody, () => {
    console.log('Removing!');
  });

  // For displaying a potion's ingredients
  const ingredientsContainer = elementFactory.createAndAppendElement('div', 'potion-ingredients-container', potionElement);

  const ingredientsButtonContainer = elementFactory.createAndAppendElement('div', 'potion-ingredients-button-container', ingredientsContainer);
  const ingredientsButton = elementFactory.createAndAppendElement('button', 'potion-ingredients-button', ingredientsButtonContainer);
  ingredientsButton.textContent = 'Show Ingredients (+)';
  ingredientsButton.addEventListener('click', () => {
    ingredientsButton.textContent = ingredientsButton.textContent.includes('Show') ? 'Hide Ingredients (-)' : 'Show Ingredients (+)';
  });

  potion.ingredients.forEach((ingredient) => {
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
    infoHeader,
    potionName,
    potionType,
    potionPrice,
    editButton,
    infoBody,
    potionEffect,
    ingredientsContainer,
    ingredientsButton
  }
}