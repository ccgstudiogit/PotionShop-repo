import * as elementFactory from '../utils/element-factory.js';
import * as potionActions from '../actions/potion-actions.js';

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

  const ingredient1Obj = {
    "name": "Applesause",
    "rarity": "Common"
  }
  const ingredient1 = ingredientRenderer.renderIngredient(ingredient1Obj);
  ingredientsContainer.appendChild(ingredient1.root);
}