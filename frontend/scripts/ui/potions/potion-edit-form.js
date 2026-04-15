import * as elementFactory from '../../utils/element-factory.js';
import * as buttonFactory from '../../utils/button-factory.js';
import * as potionFormUtils from './potion-form-utils.js';

export async function createEditPotionForm(parentElement, potion) {
  try {
      const formContainer = elementFactory.createAndAppendElement('div', 'add-form-container', parentElement);
  
      const formTitle = elementFactory.createAndAppendElement('p', ['add-form-title', 'font-jersey'], formContainer);
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

      /*
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
      */
    } catch (message) {
      console.error(message);
    }
}