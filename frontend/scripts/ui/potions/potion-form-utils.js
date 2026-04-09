import * as elementFactory from '../../utils/element-factory.js';
import * as buttonFactory from '../../utils/button-factory.js';
import * as potionActions from '../../actions/potion-actions.js';
import * as ingredientRenderer from '../ingredients/ingredient-render.js';
//import { EventBus } from '../../events/event-bus.js';
//import * as ingredientEvents from '../../events/ingredient-events.js';

/**
 * Creates a labeled text input for entering a potion's name.
 *
 * @param {HTMLElement} parent - The parent element to append the input block into.
 * @returns {{root: HTMLElement, title: HTMLElement, input: HTMLInputElement}}
 *   An object containing references to the root container, title label, and input element.
 */
export function createNameInput(parent) {
  const rootElement = elementFactory.createAndAppendElement('div', 'add-form-input-container', parent);

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
 * @param {HTMLElement} parent - The parent element to append the dropdown block into
 * @returns {{root: HTMLElement, title: HTMLElement, dropdown: HTMLElement, select: HTMLSelectElement}}
 *   An object containing references to the root container, title label, the dropdown shell, and the underlying <select> element
 */
export async function createTypeInput(parent) {
  const rootElement = elementFactory.createAndAppendElement('div', 'add-form-input-container', parent);

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
 * @param {HTMLElement} parent - The parent element to append the input block into
 * @returns {{root: HTMLElement, title: HTMLElement, input: HTMLInputElement}}
 *   An object containing references to the root container, title label, and input element
 */
export function createPriceInput(parent) {
  const rootElement = elementFactory.createAndAppendElement('div', 'add-form-input-container', parent);

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
 * @param {HTMLElement} parent - The parent element to append the input block into
 * @returns {{root: HTMLElement, title: HTMLElement, input: HTMLInputElement}}
 *   An object containing references to the root container, title label, and input element
 */
export function createEffectInput(parent) {
  const rootElement = elementFactory.createAndAppendElement('div', 'add-form-input-container', parent);

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

export function createIngredientsInputList(parent, activeIngredients, remainingIngredientOptions) {
  if (!Array.isArray(activeIngredients) || !Array.isArray(remainingIngredientOptions)) {
    console.error("startingIngredients and selectableIngredients need to be an array!");
    return;
  }

  // Create the title
  const ingredientsTitleContainer = elementFactory.createAndAppendElement('div', 'add-form-input-container', parent);
  ingredientsTitleContainer.id = 'ingredientsTitleContainer';
  const ingredientsTitle = elementFactory.createAndAppendElement('p', ['add-form-input-title', 'font-jersey'], ingredientsTitleContainer);
  ingredientsTitle.textContent = 'Selected Ingredients:';

  // Create the container that holds the ingredient list and dropdown. This is here so that when the ingredients list is cleared and remade, the
  // ingredient dropdown stays below this div
  const ingredientsListContainer = elementFactory.createAndAppendElement('div', 'add-potion-form-ingredients-container', parent);

  // Create the container for the ingredient list (this holds the actual ingredient elements)
  const ingredientsContainer = elementFactory.createAndAppendElement('div', null, ingredientsListContainer);

  // Create the ingredient dropdown container. The actual dropdown element is created in refreshAddIngredientDropdown()
  const addIngredientDropdownContainer = elementFactory.createAndAppendElement('div', 'add-potion-form-ingredient-dropdown-container', ingredientsListContainer);
  
  // Render the list. The list is continually updated via recursion as the user adds/removes ingredients
  updateIngredientList(ingredientsContainer, activeIngredients, remainingIngredientOptions, addIngredientDropdownContainer);
}

function updateIngredientList(ingredientsContainer, activeIngredients, remainingIngredientOptions, dropdownContainer) {
  ingredientsContainer.innerHTML = '';

  activeIngredients.forEach(ingredientObject => {
    const ingredientDOMElement = createIngredient(ingredientObject);

    // Only add a remove button if there are 2 or more ingredients. Prevents the user from having no ingredients selected
    if (activeIngredients.length > 1) {
      buttonFactory.createAndAppendButton('Remove', 'add-potion-form-remove-ingredient-button', ingredientDOMElement.infoContainer, () => {
        // Get updated active/remaining options lists with the removed active potion and then update the DOM
        const updated = removeFromActiveIngredients(ingredientObject, activeIngredients, remainingIngredientOptions);
        updateIngredientList(ingredientsContainer, updated.active, updated.options, dropdownContainer);
      });
    }

    ingredientsContainer.appendChild(ingredientDOMElement.root);
  });

  refreshAddIngredientDropdown(ingredientsContainer, activeIngredients, remainingIngredientOptions, dropdownContainer);
}

// These functions could handle adding/removing an ingredient to the list and returning both an updated active ingredient list and a dropdown ingredient list
function addToActiveIngredients(ingredientToAddId, activeIngredients, remainingIngredientOptions) {
  // Remove the desired ingredient from the remaining ingredient options that are currently in the dropdown
  const index = remainingIngredientOptions.findIndex(ingredient => ingredient.id === ingredientToAddId);
  const [ingredientObjToAdd] = remainingIngredientOptions.splice(index, 1);

  // Add the desired ingredient to the active ingredients, so when the ingredients list is rebuilt it's included
  activeIngredients.push(ingredientObjToAdd);

  return {
    active: activeIngredients,
    options: remainingIngredientOptions
  }
}

function removeFromActiveIngredients(ingredientToRemove, activeIngredients, remainingIngredientOptions) {
  const ingredientToRemoveId = ingredientToRemove.id;

  // Remove this ingredient from the active ingredients
  activeIngredients = activeIngredients.filter(ingredient => ingredient.id !== ingredientToRemoveId);

  // Put this ingredient back in the ingredient selection dropdown
  remainingIngredientOptions.push(ingredientToRemove);

  return {
    active: activeIngredients,
    options: remainingIngredientOptions
  }
}

function refreshAddIngredientDropdown(ingredientsContainer, activeIngredients, remainingIngredientOptions, dropdownContainer) {
  // Clear the current dropdown and create a new one. This is done so that a clean event can be added to the dropdown's selection
  dropdownContainer.innerHTML = '';
  const addIngredientDropdownRoot = elementFactory.createAndAppendDropdownShell('custom-select', 'font-jersey', dropdownContainer);
  const dropdownSelection = addIngredientDropdownRoot.selection;

  // If the user selects an ingredient from the dropdown, add that ingredient to the list
  dropdownSelection.addEventListener('change', () => {
    const ingredientIdToAdd = Number(dropdownSelection.options[dropdownSelection.selectedIndex].value);
    const updated = addToActiveIngredients(ingredientIdToAdd, activeIngredients, remainingIngredientOptions);
    
    // Recreate the ingredients list with the now-removed ingredient
    updateIngredientList(ingredientsContainer, updated.active, updated.options, dropdownContainer);
  });

  // Create the starter option that is displayed when an ingredient is not selected
  const starterOption = elementFactory.createAndAppendElement('option', null, dropdownSelection);
  starterOption.value = '';
  starterOption.textContent = 'Add another ingredient';

  // Sort the remaining ingredients array, then add them as options to the dropdwon
  remainingIngredientOptions.sort((a, b) => a.name.localeCompare(b.name));
  remainingIngredientOptions.forEach(ingredient => {
    const option = elementFactory.createAndAppendElement('option', null, dropdownSelection);
    option.value = ingredient.id;
    option.textContent = ingredient.name;
  });
}

function createIngredient(ingredientObject) {
  const ingredientDOMElement = ingredientRenderer.renderIngredient(ingredientObject);

  // Create the quantity input field with a 'x' symbol
  const infoContainer = ingredientDOMElement.infoContainer;
  const timesElement = elementFactory.createAndAppendElement('p', ['ingredient-quantity', 'font-jersey'], infoContainer);
  timesElement.textContent = 'x';
  const quantityInput = elementFactory.createAndAppendElement('input', ['add-potion-form-input-ingredient-quantity', 'font-jersey'], infoContainer);

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
