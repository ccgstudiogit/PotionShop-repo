import * as elementFactory from '../../utils/element-factory.js';
import * as buttonFactory from '../../utils/button-factory.js';
import * as mathHelper from '../../utils/math-helper.js';
import * as potionFormUtils from './potion-form-utils.js';
import * as ingredientActions from '../../actions/ingredient-actions.js';
//import { EventBus } from '../../events/event-bus.js';
//import * as ingredientEvents from '../../events/ingredient-events.js';

export async function createAddPotionForm(parentElement, startingIngredientCount) {
  const formContainer = elementFactory.createAndAppendElement('div', 'add-form-container', parentElement);

  const formTitle = elementFactory.createAndAppendElement('p', ['add-form-title', 'font-jersey'], formContainer);
  formTitle.textContent = 'Add New Potion';

  const nameInput = potionFormUtils.createNameInput(formContainer);
  const typeInput = await potionFormUtils.createTypeInput(formContainer);
  const priceInput = potionFormUtils.createPriceInput(formContainer);
  const effectInput = potionFormUtils.createEffectInput(formContainer);

  // Pick random starting ingredients
  const activeIngredients = []; // Active ingredients are what ingredients the potion will be created with
  const remainingIngredientOptions = await ingredientActions.getAllIngredients(); // Remaining ingredients are shown in the dropdown
  for (let i = 0; i < startingIngredientCount; i++) {
    const randomIndex = mathHelper.getRandomInt(0, remainingIngredientOptions.length - 1)
    activeIngredients.push(remainingIngredientOptions[randomIndex]);
    remainingIngredientOptions.splice(randomIndex, 1);
  }

  // The empty div exists to make sure that the submit button always stays below the ingredients (when an ingredient is removed, the current
  // ingredient HTML structure is destroyed and updated. Using a div wrapper prevents the submit button from going above the newly created list)
  const ingredientsContainer = elementFactory.createAndAppendElement('div', null, formContainer);
  potionFormUtils.createIngredientsInputList(ingredientsContainer, activeIngredients, remainingIngredientOptions);

  //const ingredientsWithQuantities = [];

  const submitButton = buttonFactory.createAndAppendButton('Submit', 'add-potion-form-submit-button', formContainer, () => {
    console.log('Submitting form with following attributes:');
    console.log('Name: ' + nameInput.input.value);
    console.log('Type: ' + typeInput.select.value);
    console.log('Price: ' + priceInput.input.value);
    console.log('Effect: ' + effectInput.input.value);
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
