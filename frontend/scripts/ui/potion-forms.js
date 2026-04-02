import * as elementFactory from '../utils/element-factory.js';
import * as buttonFactory from '../utils/button-factory.js';
import * as potionActions from '../actions/potion-actions.js';
import * as ingredientActions from '../actions/ingredient-actions.js';

import * as ingredientRenderer from './ingredient-render.js';

export async function createAddPotionForm(parentElement) {
  const formContainer = elementFactory.createAndAppendElement('div', 'add-form-container', parentElement);

  const formTitle = elementFactory.createAndAppendElement('p', ['add-form-title', 'font-jersey'], formContainer);
  formTitle.textContent = 'Add New Potion';

  // Name input
  const nameInputContainer = elementFactory.createAndAppendElement('div', 'add-form-input-container', formContainer);
  const nameInputTitle = elementFactory.createAndAppendElement('p', ['add-form-input-title', 'font-jersey'], nameInputContainer);
  nameInputTitle.textContent = 'Name:';
  const nameInput = elementFactory.createAndAppendElement('input', ['add-form-input-string', 'font-jersey'], nameInputContainer);
  nameInput.placeholder = 'New potion name...';

  // Type input (as dropdown)
  const typeInputContainer = elementFactory.createAndAppendElement('div', 'add-form-input-container', formContainer);
  const typeInputTitle = elementFactory.createAndAppendElement('p', ['add-form-input-title', 'font-jersey'], typeInputContainer);
  typeInputTitle.textContent = 'Type:';
  const typeDropdown = elementFactory.createAndAppendDropdownShell('custom-select', 'font-jersey', typeInputContainer);
  const typeSelection = typeDropdown.selection;
  const types = await potionActions.getPotionTypes(); // Fetch the types so they are always accurate and up-to-date
  types.forEach(type => {
    const option = elementFactory.createAndAppendElement('option', null, typeSelection);
    option.value = type;
    option.textContent = type;
  });
  
  // Price input
  const priceInputContainer = elementFactory.createAndAppendElement('div', 'add-form-input-container', formContainer);
  const priceInputTitle = elementFactory.createAndAppendElement('p', ['add-form-input-title', 'font-jersey'], priceInputContainer);
  priceInputTitle.textContent = 'Price:';
  const priceInput = elementFactory.createAndAppendElement('input', ['add-form-input-int', 'font-jersey'], priceInputContainer);
  priceInput.placeholder = 'New price...';

  // Effect input
  const effectInputContainer = elementFactory.createAndAppendElement('div', 'add-form-input-container', formContainer);
  const effectInputTitle = elementFactory.createAndAppendElement('p', ['add-form-input-title', 'font-jersey'], effectInputContainer);
  effectInputTitle.textContent = 'Effect:';
  const effectInput = elementFactory.createAndAppendElement('input', ['add-form-input-string', 'font-jersey'], effectInputContainer);
  effectInput.placeholder = 'New effect...'

  // Ingredients
  const ingredientsTitleContainer = elementFactory.createAndAppendElement('div', 'add-form-input-container', formContainer);
  const ingredientsTitle = elementFactory.createAndAppendElement('p', ['add-form-input-title', 'font-jersey'], ingredientsTitleContainer);
  ingredientsTitle.textContent = 'Selected Ingredients:';
  const ingredientsContainer = elementFactory.createAndAppendElement('div', 'add-potion-form-ingredients-container', formContainer);

  /* FOR TESTING PURPOSES AND MAKING SURE EVERYTHING LOOKS GOOD */
  const ingredient1Obj = {
    "name": "Applesauce",
    "rarity": "Common"
  }
  const ingredient1 = ingredientRenderer.renderIngredient(ingredient1Obj);
  const i1Info = ingredient1.infoContainer;
  const times = elementFactory.createAndAppendElement('p', ['ingredient-quantity', 'font-jersey'], i1Info);
  times.textContent = 'x';
  const i1QuantityInput = elementFactory.createAndAppendElement('input', ['add-potion-form-input-ing-quantity', 'font-jersey'], i1Info);
  i1QuantityInput.value = 1;
  ingredientsContainer.appendChild(ingredient1.root);
  const removeButton = buttonFactory.createAndAppendButton('Remove', 'add-potion-form-remove-ing-button', i1Info, () => {console.log('clicked');});

  const addIngredientDropdownContainer = elementFactory.createAndAppendElement('div', 'add-potion-form-select-ing-container', ingredientsContainer);
  const addIngredientDropdown = elementFactory.createAndAppendDropdownShell('custom-select', 'font-jersey', addIngredientDropdownContainer);
  const ingredientsSelection = addIngredientDropdown.selection;
  const starterOption = elementFactory.createAndAppendElement('option', null, ingredientsSelection);
  starterOption.value = '';
  starterOption.textContent = 'Add another ingredient';
  const ingredients = await ingredientActions.getAllIngredients();
  ingredients.forEach(ingredient => {
    const option = elementFactory.createAndAppendElement('option', null, ingredientsSelection);
    option.value = ingredient.id;
    option.textContent = ingredient.name;
  });

  //const addIngredientButton = buttonFactory.createAndAppendButton('Add', 'add-ingredient-button', ingredientsContainer, () => {console.log("adding")});
  /*
  const ingredient2Obj = {
    "name": "Mayo",
    "rarity": "Legendary"
  }
  const ingredient2 = ingredientRenderer.renderIngredient(ingredient2Obj);
  ingredientsContainer.appendChild(ingredient2.root);

  const ingredient3Obj = {
    "name": "Lettuce",
    "rarity": "Uncommon"
  }
  const ingredient3 = ingredientRenderer.renderIngredient(ingredient3Obj);
  ingredientsContainer.appendChild(ingredient3.root);

  const ingredient4Obj = {
    "name": "Ramen Noodles",
    "rarity": "Rare"
  }
  const ingredient4 = ingredientRenderer.renderIngredient(ingredient4Obj);
  ingredientsContainer.appendChild(ingredient4.root);
  */
}