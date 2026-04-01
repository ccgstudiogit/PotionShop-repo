import * as elementFactory from '../utils/element-factory.js';

export function createAddPotionForm(parentElement) {
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

  const typeDropdown = elementFactory.createAndAppendDropdownShell('custom-select', 'font-jersey', typeInputContainer);
  const typeSelection = typeDropdown.selection;

  // NOTE: Will replace with a get request to get and append valid options to the dropdown
  const option1 = elementFactory.createAndAppendElement('option', null, typeSelection);
  option1.value = 'Buff';
  option1.textContent = 'Buff';
  const option2 = elementFactory.createAndAppendElement('option', null, typeSelection);
  option2.value = 'Healing';
  option2.textContent = 'Healing';
  const option3 = elementFactory.createAndAppendElement('option', null, typeSelection);
  option3.value = 'Poison';
  option3.textContent = 'Poison';

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
}