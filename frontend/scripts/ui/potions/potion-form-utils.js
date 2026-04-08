import * as elementFactory from '../../utils/element-factory.js';
import * as buttonFactory from '../../utils/button-factory.js';
import * as potionActions from '../../actions/potion-actions.js';
import * as ingredientRenderer from '../ingredients/ingredient-render.js';
import { EventBus } from '../../events/event-bus.js';
import * as ingredientEvents from '../../events/ingredient-events.js';

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

export function createIngredientsInput(container, startingIngredients, selectableIngredients) {
  if (!Array.isArray(startingIngredients) || !Array.isArray(selectableIngredients)) {
    console.error("startingIngredients and selectableIngredients need to be an array!");
    return null;
  }

  // Create the title
  const ingredientsTitleContainer = elementFactory.createAndAppendElement('div', 'add-form-input-container', container);
  ingredientsTitleContainer.id = 'ingredientsTitleContainer';
  const ingredientsTitle = elementFactory.createAndAppendElement('p', ['add-form-input-title', 'font-jersey'], ingredientsTitleContainer);
  ingredientsTitle.textContent = 'Selected Ingredients:';

  // Create the actual ingredients container. This is where all of the ingredients will go as well as add ingredient dropdown
  const ingredientsContainer = elementFactory.createAndAppendElement('div', 'add-potion-form-ingredients-container', container);
  ingredientsContainer.id = 'ingredientsContainer';

  // Add the ingredients
  startingIngredients.forEach(ingredientObject => {
    const ingredientDOMElement = createIngredient(ingredientObject);

    // Only add a remove button if there are 2 or more ingredients. Prevents the user from having no ingredients selected
    if (startingIngredients.length > 1) {
      buttonFactory.createAndAppendButton('Remove', 'add-potion-form-remove-ing-button', ingredientDOMElement.infoContainer, () => {
        // Remove the old ingredients before using recursion to build the updated list
        clearIngredients();
        
        // Remove this ingredient from the starting ingredients
        const newStartingIngredients = startingIngredients.filter(ingredient => ingredient.id !== ingredientObject.id);

        // Put this ingredient back in the ingredient selection dropdown
        const newSelectableIngredients = [...selectableIngredients];
        newSelectableIngredients.push(ingredientObject);
        
        EventBus.dispatchEvent(ingredientEvents.addIngredient(ingredientObject, 3));

        // Recreate the ingredients list with the now-removed ingredient
        createIngredientsInput(container, newStartingIngredients, newSelectableIngredients);
      });
    }

    ingredientsContainer.appendChild(ingredientDOMElement.root);
  });

  // Add and setup the ingredient dropdown
  const addIngredientDropdownContainer = elementFactory.createAndAppendElement('div', 'add-potion-form-select-ing-container', ingredientsContainer);
  const addIngredientDropdown = elementFactory.createAndAppendDropdownShell('custom-select', 'font-jersey', addIngredientDropdownContainer);
  const ingredientsSelection = addIngredientDropdown.selection;
  const starterOption = elementFactory.createAndAppendElement('option', null, ingredientsSelection);
  starterOption.value = '';
  starterOption.textContent = 'Add another ingredient';

  // Sort alphabetically then fill the dropdown with ingredients
  selectableIngredients.sort((a, b) => a.name.localeCompare(b.name));
  selectableIngredients.forEach(ingredient => {
    const option = elementFactory.createAndAppendElement('option', null, ingredientsSelection);
    option.value = ingredient.id;
    option.textContent = ingredient.name;
  });

  ingredientsSelection.addEventListener('change', () => {
    clearIngredients();

    // The id of the ingredient that should be added to the list
    const ingredientIdToAdd = Number(ingredientsSelection.options[ingredientsSelection.selectedIndex].value);

    // Remove the desired ingredient from the selectable dropdown
    const index = selectableIngredients.findIndex(ingredient => ingredient.id === ingredientIdToAdd);
    const [ingredientObjToAdd] = selectableIngredients.splice(index, 1);

    // Add the desired ingredient to the starting ingredients, so when the ingredients list is rebuilt it's included
    const newStartingIngredients = [...startingIngredients];
    newStartingIngredients.push(ingredientObjToAdd);
    
    // Recreate the ingredients list with the now-removed ingredient
    createIngredientsInput(container, newStartingIngredients, selectableIngredients);
  });
}

function clearIngredients() {
  document.getElementById('ingredientsTitleContainer').remove();
  document.getElementById('ingredientsContainer').remove();
}

function createIngredient(ingredientObject) {
  const ingredientDOMElement = ingredientRenderer.renderIngredient(ingredientObject);

  // Create the quantity input field with a 'x' symbol
  const infoContainer = ingredientDOMElement.infoContainer;
  const timesElement = elementFactory.createAndAppendElement('p', ['ingredient-quantity', 'font-jersey'], infoContainer);
  timesElement.textContent = 'x';
  const quantityInput = elementFactory.createAndAppendElement('input', ['add-potion-form-input-ing-quantity', 'font-jersey'], infoContainer);
  
  // Default the quantity to 1 and make sure it doesn't go below 1
  quantityInput.value = 1; 
  quantityInput.onchange = () => {
    const val = Number(quantityInput.value);
    if (Number.isNaN(val) || !Number.isInteger(val) || val < 1) {
      quantityInput.value = 1;
    }
  }

  return {
    root: ingredientDOMElement.root,
    infoContainer: infoContainer,
    quantityInput: quantityInput
  }
}
