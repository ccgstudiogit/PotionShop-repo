import * as elementFactory from '../../utils/element-factory.js';
import * as buttonFactory from '../../utils/button-factory.js';
import * as potionFormUtils from './potion-form-utils.js';
import * as ingredientActions from '../../actions/ingredient-actions.js';

export async function createAddPotionForm(parentElement) {
  const formContainer = elementFactory.createAndAppendElement('div', 'add-form-container', parentElement);

  const formTitle = elementFactory.createAndAppendElement('p', ['add-form-title', 'font-jersey'], formContainer);
  formTitle.textContent = 'Add New Potion';

  const nameInput = potionFormUtils.createNameInput(formContainer);
  const typeInput = await potionFormUtils.createTypeInput(formContainer);
  const priceInput = potionFormUtils.createPriceInput(formContainer);
  const effectInput = potionFormUtils.createEffectInput(formContainer);

  const ingredients = await ingredientActions.getAllIngredients();
  const startingIngredients = ingredients.splice(0, 5);

  potionFormUtils.createIngredientsInput(formContainer, startingIngredients, ingredients);

  const submitButton = buttonFactory.createAndAppendButton('Submit', 'add-potion-form-submit-button', formContainer, () => {
    console.log('Submitting form with following attributes:');
    console.log('Name: ' + nameInput.input.value);
    console.log('Type: ' + typeInput.select.value);
    console.log('Price: ' + priceInput.input.value);
    console.log('Effect: ' + effectInput.input.value);
  });
}

