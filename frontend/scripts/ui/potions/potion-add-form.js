import * as elementFactory from '../../utils/element-factory.js';
import * as buttonFactory from '../../utils/button-factory.js';
import * as modalRenderer from '../components/modal.js';
import * as mathHelper from '../../utils/math-helper.js';
import * as potionFormUtils from './potion-form-utils.js';
import * as ingredientActions from '../../actions/ingredient-actions.js';
import * as potionActions from '../../actions/potion-actions.js';

/**
 * Renders the "Add Potion" form inside the given parent element.
 *
 * This function constructs all form inputs (name, type, price, effect), initializes a randomized set of starting ingredients, wires up
 * ingredient state tracking, and attaches a Submit button that triggers form validation and potion creation.
 *
 * @async
 * @param {HTMLElement} parentElement - The DOM element where the form will be rendered.
 * @param {number} startingIngredientCount - Number of random ingredients to pre-populate.
 * @returns {void}
 */
export async function createAddPotionForm(parentElement, startingIngredientCount) {
  try {
    const formContainer = elementFactory.createAndAppendElement('div', 'form-container', parentElement);

    const formTitle = elementFactory.createAndAppendElement('p', ['form-title', 'font-jersey'], formContainer);
    formTitle.textContent = 'Add New Potion';

    const nameInput = potionFormUtils.createNameInput(formContainer);
    const typeInput = await potionFormUtils.createTypeInput(formContainer);
    const priceInput = potionFormUtils.createPriceInput(formContainer);
    const effectInput = potionFormUtils.createEffectInput(formContainer);

    // Pick random starting ingredients
    const initialSelectedIngredients = []; // The ingredients that are starting out in the ingredient list without any user input
    const availableIngredients = await ingredientActions.getAllIngredients(); // Remaining ingredients are shown in the dropdown
    for (let i = 0; i < startingIngredientCount; i++) {
      const randomIndex = mathHelper.getRandomInt(0, availableIngredients.length - 1)
      initialSelectedIngredients.push(availableIngredients[randomIndex]);
      availableIngredients.splice(randomIndex, 1);
    }

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

    // Create the button to handle submitting the potion form. The current state of the form as passed
    buttonFactory.createAndAppendButton('Submit', 'potion-form-submit-button', formContainer, () => {
      const state = {
        nameInput,
        typeInput,
        priceInput,
        effectInput,
        quantityInputs,
        root: parentElement,
        count: startingIngredientCount // For recreating the potion form with the same starting ingredients after the form is submitted
      }

      submitForm(state);
    });
  } catch (message) {
    console.error(message);
  }
}

/**
 * Validates the potion form state and submits a new potion to the backend.
 *
 * Performs client-side validation for required fields (name, price, effect), then delegates to the potion API layer. If the potion
 * is successfully added, the form is cleared and re-rendered. If an error occurs, a global modal displays the error message.
 *
 * @async
 * @param {{
 *   nameInput: { input: HTMLInputElement },
 *   typeInput: { select: HTMLSelectElement },
 *   priceInput: { input: HTMLInputElement },
 *   effectInput: { input: HTMLInputElement },
 *   quantityInputs: Object.<string, HTMLInputElement>,
 *   root: HTMLElement,
 *   count: number
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

    await potionActions.addPotion(name, type, price, effect, state.quantityInputs);

    // Recreate a blank form after the potion was successfully added
    state.root.innerHTML = '';
    createAddPotionForm(state.root, state.count);
  } catch (message) {
    const errorModal = modalRenderer.renderGlobalModal();

    errorModal.windowTitle.textContent = 'Alchemy error!';
    errorModal.windowText.textContent = message;
  }
}
