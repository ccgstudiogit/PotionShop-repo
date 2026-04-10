import * as elementFactory from '../../utils/element-factory.js';
import * as buttonFactory from '../../utils/button-factory.js';
import * as mathHelper from '../../utils/math-helper.js';
import * as potionFormUtils from './potion-form-utils.js';
import * as ingredientActions from '../../actions/ingredient-actions.js';

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
  let selectedIngredients = [...initialSelectedIngredients];
  ingredientUI.onChange((state) => {
    selectedIngredients = [...state.selectedIngredients];
  });

  const submitButton = buttonFactory.createAndAppendButton('Submit', 'add-potion-form-submit-button', formContainer, () => {
    console.log('Submitting form with following attributes:');
    console.log('Name: ' + nameInput.input.value);
    console.log('Type: ' + typeInput.select.value);
    console.log('Price: ' + priceInput.input.value);
    console.log('Effect: ' + effectInput.input.value);
    console.log(selectedIngredients);
  });

  /*
  EventBus.addEventListener(ingredientEvents.onUpdateIngredients, (event) => {
    ingredientsWithQuantities.push(event.detail);
    console.log('ingredients info:');
    ingredientsWithQuantities.forEach((ing) => {
      console.log('ingredient id: ' + ing.id);
      console.log('ingredient quantity: ' + ing.quantity);
      console.log();
    });
  });
  */
}
