import * as elementFactory from '../utils/element-factory.js';

export function addForm(parentElement) {
  const formContainer = elementFactory.createAndAppendElement('div', 'add-form-container', parentElement);

  const formTitle = elementFactory.createAndAppendElement('p', ['add-form-title', 'font-jersey'], formContainer);
  formTitle.textContent = 'Add New Potion';

  // Name input
  const nameInputContainer = elementFactory.createAndAppendElement('div', 'add-form-input-container', formContainer);
  const nameInputTitle = elementFactory.createAndAppendElement('p', ['add-form-input-title', 'font-jersey'], nameInputContainer);
  nameInputTitle.textContent = 'Name:';
  const nameInput = elementFactory.createAndAppendElement('input', ['add-form-input-string', 'font-jersey'], nameInputContainer);
  nameInput.placeholder = 'New potion name...';

  // Type input
  const typeInputContainer = elementFactory.createAndAppendElement('div', 'add-form-input-container', formContainer);
  const typeInputTitle = elementFactory.createAndAppendElement('p', ['add-form-input-title', 'font-jersey'], typeInputContainer);
  typeInputTitle.textContent = 'Type:';

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
}