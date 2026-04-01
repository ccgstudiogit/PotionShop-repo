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

  const customDropdown = elementFactory.createAndAppendElement('div', 'custom-select', typeInputContainer);
  const select = elementFactory.createAndAppendElement('select', 'font-jersey', customDropdown);
  const option1 = elementFactory.createAndAppendElement('option', null, select);
  option1.value = 'Buff';
  option1.textContent = 'Buff';
  const option2 = elementFactory.createAndAppendElement('option', null, select);
  option2.value = 'Healing';
  option2.textContent = 'Healing';
  const option3 = elementFactory.createAndAppendElement('option', null, select);
  option3.value = 'Poison';
  option3.textContent = 'Poison';

  /*
  document.addEventListener('DOMContentLoaded', function () {
    const selectElement = document.querySelector('select');
    const customSelect = document.querySelector('.custom-select');

    const updateSelectStyles = () => {
      customSelect.classList.toggle('select-valid', selectElement.value !== "");
    };
    selectElement.addEventListener('change', updateSelectStyles);
  });

  /*
  // NOTE ** MIGHT WANT TO CREATE A FUNCTION TO HANDLE CREATING DROPDOWNS IN ELEMENT-FACTORY **
  const typeDropdownLabel = elementFactory.createAndAppendElement('label', null, typeInputContainer);
  typeDropdownLabel.setAttribute('for', 'types');
  const typeDropdownSelect = elementFactory.createAndAppendElement('select', ['add-form-input-dropdown-select', 'font-jersey'], typeInputContainer);
  typeDropdownSelect.setAttribute('name', 'types');
  const typeOption1 = elementFactory.createAndAppendElement('option', 'font-jersey', typeDropdownSelect);
  typeOption1.value = 'Buff';
  typeOption1.textContent = 'Buff';
  const typeOption2 = elementFactory.createAndAppendElement('option', 'font-jersey', typeDropdownSelect);
  typeOption2.value = 'Healing';
  typeOption2.textContent = 'Healing';
  const typeOption3 = elementFactory.createAndAppendElement('option', 'font-jersey', typeDropdownSelect);
  typeOption3.value = 'Poison';
  typeOption3.textContent = 'Poison';
  */

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