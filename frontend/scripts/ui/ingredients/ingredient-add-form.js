import * as elementFactory from '../../utils/element-factory.js';
import * as buttonFactory from '../../utils/button-factory.js';
import * as ingredientFormUtils from './ingredient-form-utils.js';
import * as ingredientActions from '../../actions/ingredient-actions.js';
import * as modalRenderer from '../components/modal.js';

export async function createAddIngredientForm(parent) {
  try {
    const formContainer = elementFactory.createAndAppendElement('div', 'form-container', parent);

    const formTitle = elementFactory.createAndAppendElement('p', ['form-title', 'font-jersey'], formContainer);
    formTitle.textContent = 'Add New Ingredient';

    const nameInput = ingredientFormUtils.createNameInput(formContainer);
    const rarityInput = await ingredientFormUtils.createRarityInput(formContainer);

    // Create the button to handle submitting the potion form. The current state of the form as passed
    buttonFactory.createAndAppendButton('Submit', 'form-submit-button', formContainer, () => {
      const state = {
        nameInput,
        rarityInput,
        root: parent
      }

      submitForm(state);
    });
  } catch (message) {
    console.error(message);
  }
}

/**
 * Validates the ingredient form state and submits a new ingredient to the backend.
 *
 * Performs client-side validation for required fields (name, rarity), then delegates to the ingredient API layer. If the ingredient
 * is successfully added, the form is cleared and re-rendered. If an error occurs, a global modal displays the error message.
 *
 * @async
 * @param {{
 *   nameInput: { input: HTMLInputElement },
 *   rarityInput: { select: HTMLSelectElement },
 *   root: HTMLElement,
 * }} state - The current form state and DOM references.
 * @returns {Promise<void>}
 */
async function submitForm(state) {
  try {
    const name = state.nameInput.input.value;
    if (name === '') {
      throw new Error('Name cannot be empty.');
    }

    // Rarity will always be correct since it retrieves the rarities from the backend, so no need for validation
    const rarity = state.rarityInput.select.value;

    await ingredientActions.addIngredient(name, rarity);

    // Recreate a blank form after the ingredient was successfully added
    state.root.innerHTML = '';
    createAddIngredientForm(state.root, state.count);
  } catch (message) {
    const errorModal = modalRenderer.renderGlobalModal();

    errorModal.windowTitle.textContent = 'Alchemy error!';
    errorModal.windowText.textContent = message;
  }
}
