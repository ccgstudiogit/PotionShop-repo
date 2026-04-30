import * as elementFactory from '../../utils/element-factory.js';
import * as buttonFactory from '../../utils/button-factory.js';
import * as potionFormUtils from './potion-form-utils.js';
import * as ingredientActions from '../../actions/ingredient-actions.js';
import * as potionActions from '../../actions/potion-actions.js';
import * as modalRenderer from '../components/modal.js';
import * as addPotionFrom from './potion-add-form.js';

/**
 * Renders an "Edit Potion" form pre-filled with the potion's existing data.
 *
 * Responsibilities:
 *  - Builds all input fields (name, type, price, effect)
 *  - Pre-selects the potion's current type
 *  - Loads and displays the potion's current ingredients
 *  - Hydrates ingredient quantity inputs with existing values
 *  - Subscribes to ingredient list state changes
 *  - On submit, constructs a state object and triggers the update flow
 *
 * @async
 * @param {Object} potion - The potion being edited.
 * @param {number} potion.id - The potion's ID.
 * @param {string} potion.name - The potion's current name.
 * @param {string} potion.type - The potion's current type (PotionType enum value).
 * @param {number} potion.price - The potion's current price.
 * @param {string} potion.effect - The potion's current effect.
 * @param {Array<Object>} potion.ingredients - The potion's current ingredient list.
 * @param {HTMLElement} parentElement - The DOM element where the form will be rendered.
 * @returns {Promise<void>} Resolves once the form is fully rendered.
 */
export async function createEditPotionForm(potion, parentElement) {
  try {
    const formContainer = elementFactory.createAndAppendElement('div', 'form-container', parentElement);

    const formTitle = elementFactory.createAndAppendElement('p', ['form-title', 'font-jersey'], formContainer);
    formTitle.textContent = 'Edit Potion';

    // Create the inputs and fill the inputs with the potion's existing information
    const nameInput = potionFormUtils.createNameInput(formContainer);
    nameInput.input.value = potion.name;

    const typeInput = await potionFormUtils.createTypeInput(formContainer);
    for (let i = 0; i < typeInput.select.options.length; i++) {
      if (potion.type === typeInput.select.options[i].value) {
        typeInput.select.selectedIndex = i;
        break;
      }
    }

    const priceInput = potionFormUtils.createPriceInput(formContainer);
    priceInput.input.value = potion.price;

    const effectInput = potionFormUtils.createEffectInput(formContainer);
    effectInput.input.value = potion.effect;

    // Get the potions' current ingredients
    const initialSelectedIngredients = []; // The ingredients that are starting out in the ingredient list without any user input
    potion.ingredients.forEach((ingredient) => {
      initialSelectedIngredients.push(ingredient);
    });

    const availableIngredients = await ingredientActions.getAllIngredients(); // Remaining ingredients are shown in the dropdown
    availableIngredients.filter((element) => !initialSelectedIngredients.includes(element)); // Remove the initial ingredients from the dropdown array

    // Render the ingredient input section using the random starting ingredients
    const ingredientUI = potionFormUtils.createIngredientsInputList(formContainer, initialSelectedIngredients, availableIngredients);

    // "Subscribe" to be notified whenever the ingredients list state changes (i.e. whenever the user adds/removes an ingredient)
    let selectedIngredients = [];
    let quantityInputs = {};
    ingredientUI.onChange((state) => {
      selectedIngredients = [...state.selectedIngredients];
      quantityInputs = { ...state.quantityInputs }
    });
    ingredientUI.state.notifyChange(); // Get initial ingredients with their default quantities

    // Update the input values on the quantity inputs to match the ingredients' current quantites
    ingredientUI.ingredientDOMElements.forEach((ingredientDOMElement) => {
      for (let i = 0; i < initialSelectedIngredients.length; i++) {
        if (ingredientDOMElement.nameElement.textContent === initialSelectedIngredients[i].name) {
          ingredientDOMElement.quantityInput.value = initialSelectedIngredients[i].quantity;
          break;
        }
      }
    });

    // Create the button to handle submitting the potion form. The current state of the form as passed
    buttonFactory.createAndAppendButton('Submit', 'form-submit-button', formContainer, () => {
      const state = {
        potionId: potion.id,
        nameInput,
        typeInput,
        priceInput,
        effectInput,
        quantityInputs,
        root: parentElement,
      }
      
      submitForm(state);
    });
  } catch (message) {
    console.error(message);
  }
}

/**
 * Validates the potion form state and submits an edit request for the potion to the backend.
 *
 * Performs client-side validation for required fields (name, price, effect), then delegates to the potion API layer. If the potion
 * is successfully edited, the form is cleared and re-rendered. If an error occurs, a global modal displays the error message.
 *
 * @async
 * @param {{
 *   potionId: number,
 *   nameInput: { input: HTMLInputElement },
 *   typeInput: { select: HTMLSelectElement },
 *   priceInput: { input: HTMLInputElement },
 *   effectInput: { input: HTMLInputElement },
 *   quantityInputs: Object.<string, HTMLInputElement>,
 *   root: HTMLElement
 * }} state - The current form state and DOM references.
 * @returns {Promise<void>}
 */
async function submitForm(state) {
  try {
    const name = state.nameInput.input.value;
    if (name === '') {
      throw new Error('Name cannot be empty.');
    }

    // Type will always be correct since it retrieves the types from the backend, so no need for validation
    const type = state.typeInput.select.value;

    const price = state.priceInput.input.value;
    if (price === '') {
      throw new Error('Price cannot be empty.');
    }

    const effect = state.effectInput.input.value;
    if (effect === '') {
      throw new Error('Effect cannot empty.');
    }

    console.log('name = ' + name);
    console.log('type = ' + type);

    await potionActions.putPotion(state.potionId, name, type, price, effect, state.quantityInputs);

    // Recreate a blank form after the potion was successfully added
    state.root.innerHTML = '';
    addPotionFrom.createAddPotionForm(state.root, 3);
  } catch (message) {
    const errorModal = modalRenderer.renderGlobalModal();

    errorModal.windowTitle.textContent = 'Alchemy error!';
    errorModal.windowText.textContent = message;
  }
}
