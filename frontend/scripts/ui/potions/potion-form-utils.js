import * as elementFactory from '../../utils/element-factory.js';
import * as buttonFactory from '../../utils/button-factory.js';
import * as potionActions from '../../actions/potion-actions.js';
import * as ingredientActions from '../../actions/ingredient-actions.js';
import * as ingredientRenderer from '../ingredients/ingredient-render.js';

/**
 * Creates a labeled text input for entering a potion's name.
 *
 * @param {HTMLElement} container - The parent element to append the input block into.
 * @returns {{root: HTMLElement, title: HTMLElement, input: HTMLInputElement}}
 *   An object containing references to the root container, title label, and input element.
 */
export function createNameInput(container) {
  const rootElement = elementFactory.createAndAppendElement('div', 'add-form-input-container', container);

  const title = elementFactory.createAndAppendElement('p', ['add-form-input-title', 'font-jersey'], rootElement);
  title.textContent = 'Name:';

  const input = elementFactory.createAndAppendElement('input', ['add-form-input-string', 'font-jersey'], rootElement);
  input.placeholder = 'New potion name...';

  return {
    root: rootElement,
    title: title,
    input: input
  };
}

/**
 * Creates a labeled dropdown input for selecting a potion type. Fetches available potion types from the backend to ensure accuracy.
 *
 * @param {HTMLElement} container - The parent element to append the dropdown block into
 * @returns {{root: HTMLElement, title: HTMLElement, dropdown: HTMLElement, select: HTMLSelectElement}}
 *   An object containing references to the root container, title label, the dropdown shell, and the underlying <select> element
 */
export async function createTypeInput(container) {
  const rootElement = elementFactory.createAndAppendElement('div', 'add-form-input-container', container);

  const title = elementFactory.createAndAppendElement('p', ['add-form-input-title', 'font-jersey'], rootElement);
  title.textContent = 'Type:';

  const dropdown = elementFactory.createAndAppendDropdownShell('custom-select', 'font-jersey', rootElement);
  const selection = dropdown.selection;

  // Fetch the types from the backend so they are always accurate and up-to-date
  const types = await potionActions.getPotionTypes(); 
  types.forEach(type => {
    const option = elementFactory.createAndAppendElement('option', null, selection);
    option.value = type;
    option.textContent = type;
  });

  return {
    root: rootElement,
    title: title,
    dropdown: dropdown,
    select: selection
  };
}

/**
 * Creates a labeled numeric input for entering a potion's price.
 *
 * @param {HTMLElement} container - The parent element to append the input block into
 * @returns {{root: HTMLElement, title: HTMLElement, input: HTMLInputElement}}
 *   An object containing references to the root container, title label, and input element
 */
export function createPriceInput(container) {
  const rootElement = elementFactory.createAndAppendElement('div', 'add-form-input-container', container);

  const title = elementFactory.createAndAppendElement('p', ['add-form-input-title', 'font-jersey'], rootElement);
  title.textContent = 'Price:';

  const input = elementFactory.createAndAppendElement('input', ['add-form-input-int', 'font-jersey'], rootElement);
  input.placeholder = 'New price...';

  return {
    root: rootElement,
    title: title,
    input: input
  };
}

/**
 * Creates a labeled text input for entering a potion's effect description.
 *
 * @param {HTMLElement} container - The parent element to append the input block into
 * @returns {{root: HTMLElement, title: HTMLElement, input: HTMLInputElement}}
 *   An object containing references to the root container, title label, and input element
 */
export function createEffectInput(container) {
  const rootElement = elementFactory.createAndAppendElement('div', 'add-form-input-container', container);

  const title = elementFactory.createAndAppendElement('p', ['add-form-input-title', 'font-jersey'], rootElement);
  title.textContent = 'Effect:';

  const input = elementFactory.createAndAppendElement('input', ['add-form-input-string', 'font-jersey'], rootElement);
  input.placeholder = 'New effect...'

  return {
    root: rootElement,
    title: title,
    input: input
  };
}

export async function createIngredientsInput(container) {
  const ingredientsTitleContainer = elementFactory.createAndAppendElement('div', 'add-form-input-container', container);
  const ingredientsTitle = elementFactory.createAndAppendElement('p', ['add-form-input-title', 'font-jersey'], ingredientsTitleContainer);
  ingredientsTitle.textContent = 'Selected Ingredients:';
  const ingredientsContainer = elementFactory.createAndAppendElement('div', 'add-potion-form-ingredients-container', container);

  /* FOR TESTING PURPOSES AND MAKING SURE EVERYTHING LOOKS GOOD */
  const ingredient1Obj = {
    "name": "Applesauce",
    "rarity": "Common"
  }
  const ingredient1 = ingredientRenderer.renderIngredient(ingredient1Obj);
  const i1Info = ingredient1.infoContainer;
  const times = elementFactory.createAndAppendElement('p', ['ingredient-quantity', 'font-jersey'], i1Info);
  times.textContent = 'x';
  const i1QuantityInput = elementFactory.createAndAppendElement('input', ['add-potion-form-input-ing-quantity', 'font-jersey'], i1Info);
  i1QuantityInput.value = 1;
  ingredientsContainer.appendChild(ingredient1.root);
  
  const removeButton = buttonFactory.createAndAppendButton('Remove', 'add-potion-form-remove-ing-button', i1Info, () => {console.log('clicked');});

  const addIngredientDropdownContainer = elementFactory.createAndAppendElement('div', 'add-potion-form-select-ing-container', ingredientsContainer);
  const addIngredientDropdown = elementFactory.createAndAppendDropdownShell('custom-select', 'font-jersey', addIngredientDropdownContainer);
  const ingredientsSelection = addIngredientDropdown.selection;
  const starterOption = elementFactory.createAndAppendElement('option', null, ingredientsSelection);
  starterOption.value = '';
  starterOption.textContent = 'Add another ingredient';
  const ingredients = await ingredientActions.getAllIngredients();
  ingredients.forEach(ingredient => {
    const option = elementFactory.createAndAppendElement('option', null, ingredientsSelection);
    option.value = ingredient.id;
    option.textContent = ingredient.name;
  });
}
