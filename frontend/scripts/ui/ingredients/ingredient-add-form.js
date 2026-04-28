import * as elementFactory from '../../utils/element-factory.js';
import * as buttonFactory from '../../utils/button-factory.js';
import * as ingredientFormUtils from './ingredient-form-utils.js';

export async function createAddIngredientForm(parent) {
  try {
    const formContainer = elementFactory.createAndAppendElement('div', 'form-container', parent);

    const formTitle = elementFactory.createAndAppendElement('p', ['form-title', 'font-jersey'], formContainer);
    formTitle.textContent = 'Add New Ingredient';

    const nameInput = ingredientFormUtils.createNameInput(formContainer);
    const rarityInput = await ingredientFormUtils.createRarityInput(formContainer);

    // Create the button to handle submitting the potion form. The current state of the form as passed
    buttonFactory.createAndAppendButton('Submit', 'potion-form-submit-button', formContainer, () => {
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