import * as elementFactory from '../../utils/element-factory.js';
import * as buttonFactory from '../../utils/button-factory.js';
import * as mathHelper from '../../utils/math-helper.js';
import * as potionFormUtils from './potion-form-utils.js';
import * as ingredientActions from '../../actions/ingredient-actions.js';
import { EventBus } from '../../events/event-bus.js';
import * as ingredientEvents from '../../events/ingredient-events.js';

export async function createAddPotionForm(parentElement, startingIngredientCount) {
  const formContainer = elementFactory.createAndAppendElement('div', 'add-form-container', parentElement);

  const formTitle = elementFactory.createAndAppendElement('p', ['add-form-title', 'font-jersey'], formContainer);
  formTitle.textContent = 'Add New Potion';

  const nameInput = potionFormUtils.createNameInput(formContainer);
  const typeInput = await potionFormUtils.createTypeInput(formContainer);
  const priceInput = potionFormUtils.createPriceInput(formContainer);
  const effectInput = potionFormUtils.createEffectInput(formContainer);

  // Pick random starting ingredients
  const startingIngredients = [];
  const ingredients = await ingredientActions.getAllIngredients();
  for (let i = 0; i < startingIngredientCount; i++) {
    const randomIndex = mathHelper.getRandomInt(0, ingredients.length - 1)
    startingIngredients.push(ingredients[randomIndex]);
    ingredients.splice(randomIndex, 1);
  }

  // The empty div exists to make sure that the submit button always stays below the ingredients (when an ingredient is removed, the current
  // ingredient HTML structure is destroyed and updated. Using a div wrapper prevents the submit button from going above the newly created list)
  const ingredientsContainer = elementFactory.createAndAppendElement('div', null, formContainer);
  potionFormUtils.createIngredientsInput(ingredientsContainer, startingIngredients, ingredients);

  const submitButton = buttonFactory.createAndAppendButton('Submit', 'add-potion-form-submit-button', formContainer, () => {
    console.log('Submitting form with following attributes:');
    console.log('Name: ' + nameInput.input.value);
    console.log('Type: ' + typeInput.select.value);
    console.log('Price: ' + priceInput.input.value);
    console.log('Effect: ' + effectInput.input.value);
    /*
    console.log('Ingredients:');
    const ingredients = potionFormUtils.getCurrentIngredients();
    for (let i = 0; i < ingredients.length; i++) {
      console.log(ingredients[i].name);
    }
     */
  });

  EventBus.addEventListener(ingredientEvents.addIngredientEvent, (event) => {
    console.log('ingredient info:');
    console.log('ingredient id: ' + event.detail.id);
    console.log('ingredient quantity: ' + event.detail.quantity);
  });
}
