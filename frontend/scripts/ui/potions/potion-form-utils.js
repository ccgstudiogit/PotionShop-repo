import * as elementFactory from '../../utils/element-factory.js';
import * as buttonFactory from '../../utils/button-factory.js';
import * as potionActions from '../../actions/potion-actions.js';
import * as ingredientRenderer from '../ingredients/ingredient-render.js';
import * as dropdownRenderer from '../components/dropdown.js';

/**
 * Creates a labeled text input for entering a potion's name.
 *
 * @param {HTMLElement} parent - The parent element to append the input block into.
 * @returns {{root: HTMLElement, title: HTMLElement, input: HTMLInputElement}}
 *   An object containing references to the root container, title label, and input element.
 */
export function createNameInput(parent) {
  const container = elementFactory.createAndAppendElement('div', 'form-input-container', parent);

  const title = elementFactory.createAndAppendElement('p', ['form-input-title', 'font-jersey'], container);
  title.textContent = 'Name:';

  const input = elementFactory.createAndAppendElement('input', ['form-input-string', 'font-jersey'], container);
  input.placeholder = 'New potion name...';

  return {
    root: container,
    title: title,
    input: input
  };
}

/**
 * Creates a labeled dropdown input for selecting a potion type. Fetches available potion types from the backend to ensure accuracy.
 *
 * @async
 * @param {HTMLElement} parent - The parent element to append the dropdown block into.
 * @returns {{root: HTMLElement, title: HTMLElement, dropdown: HTMLElement, select: HTMLSelectElement}}
 *   An object containing references to the root container, title label, the dropdown shell, and the underlying <select> element.
 */
export async function createTypeInput(parent) {
  const container = elementFactory.createAndAppendElement('div', 'form-input-container', parent);

  const title = elementFactory.createAndAppendElement('p', ['form-input-title', 'font-jersey'], container);
  title.textContent = 'Type:';

  const dropdown = dropdownRenderer.createAndAppendDropdownShell('custom-select', 'font-jersey', container);
  const selection = dropdown.selection;

  // Fetch the types from the backend so they are always accurate and up-to-date
  try {
    const types = await potionActions.getPotionTypes();
    types.forEach(type => {
      const option = elementFactory.createAndAppendElement('option', null, selection);
      option.value = type;
      option.textContent = type;
    });
  } catch (message) {
    console.error(message);
  }

  return {
    root: container,
    title: title,
    dropdown: dropdown,
    select: selection
  };
}

/**
 * Creates a labeled numeric input for entering a potion's price.
 *
 * @param {HTMLElement} parent - The parent element to append the input block into.
 * @returns {{root: HTMLElement, title: HTMLElement, input: HTMLInputElement}}
 *   An object containing references to the root container, title label, and input element.
 */
export function createPriceInput(parent) {
  const container = elementFactory.createAndAppendElement('div', 'form-input-container', parent);

  const title = elementFactory.createAndAppendElement('p', ['form-input-title', 'font-jersey'], container);
  title.textContent = 'Price:';

  const input = elementFactory.createAndAppendElement('input', ['form-input-int', 'font-jersey'], container);
  input.placeholder = 'New price...';
  input.onchange = () => {
    const val = Number(input.value);
    if (Number.isNaN(val) || !Number.isInteger(val)) {
      input.value = '';
    }
  }

  return {
    root: container,
    title: title,
    input: input
  };
}

/**
 * Creates a labeled text input for entering a potion's effect description.
 *
 * @param {HTMLElement} parent - The parent element to append the input block into.
 * @returns {{root: HTMLElement, title: HTMLElement, input: HTMLInputElement}}
 *   An object containing references to the root container, title label, and input element.
 */
export function createEffectInput(parent) {
  const container = elementFactory.createAndAppendElement('div', 'form-input-container', parent);

  const title = elementFactory.createAndAppendElement('p', ['form-input-title', 'font-jersey'], container);
  title.textContent = 'Effect:';

  const input = elementFactory.createAndAppendElement('input', ['form-input-string', 'font-jersey'], container);
  input.placeholder = 'New effect...'

  return {
    root: container,
    title: title,
    input: input
  };
}

/**
 * Creates and renders the ingredient selection UI component.
 * This component manages:
 *  - The list of currently selected ingredients
 *  - The dropdown of available ingredients
 *  - Quantity inputs for each ingredient
 *  - A subscription callback for parent components
 *
 * @param {HTMLElement} parent - The parent DOM element to render into.
 * @param {Array<Object>} selectedIngredients - Initial ingredients already selected.
 * @param {Array<Object>} availableIngredients - Ingredients available to add via dropdown.
 * @returns {{
 *   state: Object,
 *   onChange: function(Function): void,
 *   ingredientDOMElements: Array
 * }} A UI controller with state and a subscription method.
 */
export function createIngredientsInputList(parent, selectedIngredients, availableIngredients) {
  if (!Array.isArray(selectedIngredients) || !Array.isArray(availableIngredients)) {
    console.error("startingIngredients and selectableIngredients need to be an array!");
    return;
  }

  // Create the title
  const ingredientsTitleContainer = elementFactory.createAndAppendElement('div', 'form-input-container', parent);
  ingredientsTitleContainer.id = 'ingredientsTitleContainer';
  const ingredientsTitle = elementFactory.createAndAppendElement('p', ['form-input-title', 'font-jersey'], ingredientsTitleContainer);
  ingredientsTitle.textContent = 'Selected Ingredients:';

  // Create the container that holds the ingredient list and dropdown. This is here so that when the ingredients list is cleared and remade, the
  // ingredient dropdown stays below this div
  const ingredientsListContainer = elementFactory.createAndAppendElement('div', 'potion-form-ingredients-container', parent);

  // Create the container for the ingredient list (this holds the actual ingredient elements)
  const ingredientsContainer = elementFactory.createAndAppendElement('div', null, ingredientsListContainer);

  // Create the ingredient dropdown container. The actual dropdown element is created in refreshAddIngredientDropdown()
  const ingredientDropdownContainer = elementFactory.createAndAppendElement('div', 'potion-form-ingredient-dropdown-container', ingredientsListContainer);

  // The internal state of the ingredients list
  const state = {
    selectedIngredients,
    quantityInputs: {},
    availableIngredients,
    ingredientsContainer,
    dropdownContainer: ingredientDropdownContainer
  };

  // Variable that will eventually hold a function
  let onChangeCallback = null;

  // Adding a custom method onto the state object
  state.notifyChange = () => {
    // Checks whether the parent actually registered a callback
    if (onChangeCallback) {
      // Call the parent's function and give it the updated state
      onChangeCallback(state);
    }
  }

  // Render the list. The list is continually updated via recursion as the user adds/removes ingredients
  const ingredientDOMElements = renderIngredientList(state);

  // Give callers the initial state and let them "subscribe" to be notified when the state changes
  const ingredientUI = {
    state,
    onChange(callback) { onChangeCallback = callback },
    ingredientDOMElements
  };

  return ingredientUI;
}

/**
 * Renders the full ingredient list UI:
 *  - Clears and rebuilds the ingredient rows
 *  - Rebuilds the quantityInputs map
 *  - Re-renders the dropdown
 *  - Notifies subscribers of updated state
 *
 * @param {Object} state - Internal component state.
 * @param {Array<Object>} state.selectedIngredients - Current selected ingredients.
 * @param {Object<string, HTMLInputElement>} state.quantityInputs - Map of ingredientId -> quantity input element.
 * @param {Array<Object>} state.availableIngredients - Ingredients available for selection.
 * @param {HTMLElement} state.ingredientsContainer - DOM container for ingredient rows.
 * @param {HTMLElement} state.dropdownContainer - DOM container for the dropdown.
 * @returns {Array} An array of ingredient DOM elements.
 */
function renderIngredientList(state) {
  const selectedIngredients = [...state.selectedIngredients];
  const ingredientsContainer = state.ingredientsContainer;
  ingredientsContainer.innerHTML = ''; // Clear the displayed ingredients

  const ingredientDOMElements = [];
  state.quantityInputs = {};
  selectedIngredients.forEach(ingredientObject => {
    const ingredientDOMElement = renderIngredientRow(ingredientObject);
    state.quantityInputs[ingredientObject.id] = ingredientDOMElement.quantityInput;

    // Only add a remove button if there are 2 or more ingredients. Prevents the user from having no ingredients selected
    if (selectedIngredients.length > 1) {
      buttonFactory.createAndAppendButton('Remove', 'potion-form-remove-ingredient-button', ingredientDOMElement.infoContainer, () => {
        // The state gets mutated after removing the ingredient
        removeIngredient(ingredientObject, state);
        renderIngredientList(state);
      });
    }

    ingredientsContainer.appendChild(ingredientDOMElement.root);
    ingredientDOMElements.push(ingredientDOMElement);
  });

  renderIngredientDropdown(state);

  // Let "subscribers" know the state has changed (e.g. the caller functions of createIngredientsInputList())
  state.notifyChange();
  return ingredientDOMElements;
}

/**
 * Adds an ingredient to the selected list and removes it from the available list. Does NOT render the UI, caller must invoke
 * renderIngredientList(). Essentially, this function only modifies the state.
 *
 * @param {number} ingredientToAddId - ID of the ingredient to add.
 * @param {Object} state - Internal component state.
 * @returns {void}
 */
function addIngredient(ingredientToAddId, state) {
  const updatedAvailableIngredients = [...state.availableIngredients];

  // Remove the desired ingredient from the remaining ingredient options that are currently in the dropdown
  const index = updatedAvailableIngredients.findIndex(ingredient => ingredient.id === ingredientToAddId);
  const [ingredientObjToAdd] = updatedAvailableIngredients.splice(index, 1);

  // Add the desired ingredient to the active ingredients, so when the ingredients list is rebuilt it's included
  const updatedSelectedIngredients = [...state.selectedIngredients];
  updatedSelectedIngredients.push(ingredientObjToAdd);

  state.selectedIngredients = updatedSelectedIngredients;
  state.availableIngredients = updatedAvailableIngredients;
}

/**
 * Removes an ingredient from the selected list and returns it to the available list. Does NOT render the UI, caller must invoke
 * renderIngredientList(). Essentially, this function only modifies the state.
 *
 * @param {Object} ingredientToRemove - Ingredient object to remove.
 * @param {Object} state - Internal component state.
 * @returns {void}
 */
function removeIngredient(ingredientToRemove, state) {
  const ingredientToRemoveId = ingredientToRemove.id;

  // Remove this ingredient from the active ingredients
  const updatedSelectedIngredients = [...state.selectedIngredients].filter(ingredient => ingredient.id !== ingredientToRemoveId);

  // Put this ingredient back in the ingredient selection dropdown
  const updatedAvailableIngredients = [...state.availableIngredients];
  updatedAvailableIngredients.push(ingredientToRemove);

  state.selectedIngredients = updatedSelectedIngredients;
  state.availableIngredients = updatedAvailableIngredients;
}

/**
 * Renders the ingredient dropdown:
 *  - Clears the existing dropdown
 *  - Creates a new dropdown shell
 *  - Populates it with sorted available ingredients
 *  - Registers the "add ingredient" change handler
 *
 * @param {Object} state - Internal component state.
 * @returns {void}
 */
function renderIngredientDropdown(state) {
  const availableIngredients = state.availableIngredients;
  const dropdownContainer = state.dropdownContainer;

  // Clear the current dropdown and create a new one. This is done so that a clean event can be added to the dropdown's selection
  dropdownContainer.innerHTML = '';
  const addIngredientDropdownRoot = dropdownRenderer.createAndAppendDropdownShell('custom-select', 'font-jersey', dropdownContainer);
  const dropdownSelection = addIngredientDropdownRoot.selection;

  // If the user selects an ingredient from the dropdown, add that ingredient to the list
  dropdownSelection.addEventListener('change', () => {
    const ingredientIdToAdd = Number(dropdownSelection.options[dropdownSelection.selectedIndex].value);
    addIngredient(ingredientIdToAdd, state);
    renderIngredientList(state);
  });

  // Create the starter option that is displayed when an ingredient is not selected
  const starterOption = elementFactory.createAndAppendElement('option', null, dropdownSelection);
  starterOption.value = '';
  starterOption.textContent = 'Add another ingredient';

  // Sort the remaining ingredients array, then add them as options to the dropdwon
  const sorted = [...availableIngredients].sort((a, b) => a.name.localeCompare(b.name));
  sorted.forEach(ingredient => {
    const option = elementFactory.createAndAppendElement('option', null, dropdownSelection);
    option.value = ingredient.id;
    option.textContent = ingredient.name;
  });
}

/**
 * Renders a single ingredient row, including:
 *  - Ingredient name + rarity (via ingredientRenderer)
 *  - A quantity input (default 1, min 1)
 *  - A small "x" label before the input
 *
 * @param {Object} ingredientObject - Ingredient data object.
 * @returns {{
 *   root: HTMLDivElement,
 *   nameElement: HTMLParagraphElement,
 *   rarityElement: HTMLParagraphElement,
 *   infoContainer: HTMLDivElement,
 *   quantityInput: HTMLInputElement
 * }} DOM references for the rendered ingredient row.
 */
function renderIngredientRow(ingredientObject) {
  const ingredientDOMElement = ingredientRenderer.renderIngredient(ingredientObject);

  // Remove the remove button since an ingredient should not be able to be deleted from the database from a potion's ingredient list
  ingredientDOMElement.removeButton.remove();

  // Create the quantity input field with a 'x' symbol
  const infoContainer = ingredientDOMElement.infoContainer;
  const timesElement = elementFactory.createAndAppendElement('p', ['ingredient-quantity', 'font-jersey'], infoContainer);
  timesElement.textContent = 'x';
  const quantityInput = elementFactory.createAndAppendElement('input', ['potion-form-input-ingredient-quantity', 'font-jersey'], infoContainer);

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
    nameElement: ingredientDOMElement.nameElement,
    rarityElement: ingredientDOMElement.rarityElement,
    infoContainer: infoContainer,
    quantityInput: quantityInput
  }
}
