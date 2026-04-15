import * as elementFactory from '../../utils/element-factory.js';
import * as buttonFactory from '../../utils/button-factory.js';
import * as modal from '../components/modal.js';
import * as mathHelper from '../../utils/math-helper.js';
import * as potionFormUtils from './potion-form-utils.js';
import * as ingredientActions from '../../actions/ingredient-actions.js';
import * as potionActions from '../../actions/potion-actions.js';

export async function createAddPotionForm(parentElement, startingIngredientCount) {
  const formContainer = elementFactory.createAndAppendElement('div', 'add-form-container', parentElement);

  const formTitle = elementFactory.createAndAppendElement('p', ['add-form-title', 'font-jersey'], formContainer);
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
  buttonFactory.createAndAppendButton('Submit', 'add-potion-form-submit-button', formContainer, () => {
    const state = {
      nameInput,
      typeInput,
      priceInput,
      effectInput, 
      quantityInputs,
      root: parentElement,
      count: startingIngredientCount
    }

    submitForm(state);
  });
}

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
    const errorModal = modal.renderGlobalModal();

    errorModal.windowTitle.textContent = 'Alchemy error!';
    errorModal.windowText.textContent = message;
  }
}
