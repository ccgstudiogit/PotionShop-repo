import * as baseView from '../shared/base-view.js';
import * as searchViewUtils from '../shared/search-view-utils.js';
import * as elementFactory from '../../utils/element-factory.js';
import * as buttonFactory from '../../utils/button-factory.js';
import * as potionActions from '../../actions/potion-actions.js';
import * as resultsView from './potions-view-results.js';
import * as dropdown from '../components/dropdown.js';

export function renderSearchPanel() {
  const mainContent = baseView.getMainContent();
  const searchPanel = baseView.renderBaseSearchPanel(mainContent);

  renderSearchFields(searchPanel.searchFieldsContainer);
}

async function renderSearchFields(searchPanel) {
  try {
    // Searching by name field
    const nameInput = searchViewUtils.createSearchBarWithTitle('Search potions by name...', searchPanel);

    // Selecting by types
    const typeDropdown = searchViewUtils.createEmptyDropdownFilter(searchPanel);
    typeDropdown.title.textContent = 'Type(s):';
    typeDropdown.dropdownSelection.multiple = true; // Users must use 'CTRL' + click to select multiple options
    typeDropdown.dropdownSelection.size = 4;

    const multiSelectTip = elementFactory.createAndAppendElement('p', ['search-panel-tip-text', 'font-jersey'], typeDropdown.root);
    multiSelectTip.textContent = '(hold CTRL to select multiple)';

    const potionTypes = await potionActions.getPotionTypes();
    potionTypes.forEach(type => {
      const option = elementFactory.createAndAppendElement('option', null, typeDropdown.dropdownSelection);
      option.value = type;
      option.textContent = type;
    });

    // Searching by price
    const priceInputContainer = elementFactory.createAndAppendElement('div', 'search-panel-field-container', searchPanel);
    const priceTitle = elementFactory.createAndAppendElement('p', ['search-panel-field-title', 'font-jersey'], priceInputContainer);
    priceTitle.textContent = 'Price:';

    // Create and configure the dropdown for selecting the inequality sign for price filtering
    const inequalitySignDropdown = dropdown.createAndAppendDropdownShell(
      ['custom-select', 'custom-select-thin-padding', 'search-panel-inequality-dropdown'], 
      'font-jersey', 
      priceInputContainer
    );
    const lessThanOption = elementFactory.createAndAppendElement('option', null, inequalitySignDropdown.selection);
    lessThanOption.value = '<';
    lessThanOption.textContent = '<';
    const greaterThanOption = elementFactory.createAndAppendElement('option', null, inequalitySignDropdown.selection);
    greaterThanOption.value = '>';
    greaterThanOption.textContent = '>';
    const lessThanOrEqualOption = elementFactory.createAndAppendElement('option', null, inequalitySignDropdown.selection);
    lessThanOrEqualOption.value = '<=';
    lessThanOrEqualOption.textContent = '<=';
    const greaterThanOrEqualOption = elementFactory.createAndAppendElement('option', null, inequalitySignDropdown.selection);
    greaterThanOrEqualOption.value = '>=';
    greaterThanOrEqualOption.textContent = '>=';

    // Create the price input field and add validation to ensure only integers can be entered
    const priceInput = searchViewUtils.createSmallSearchBar('Price...', priceInputContainer);
    priceInput.onchange = () => {
      const val = Number(priceInput.value);
      if (Number.isNaN(val) || !Number.isInteger(val)) {
        priceInput.value = '';
      }
    }

    const searchButton = searchViewUtils.createSearchButton(searchPanel);
    searchButton.addEventListener('click', async () => {
      searchButton.disabled = true;
      await search(nameInput, typeDropdown, inequalitySignDropdown, priceInput);
      searchButton.disabled = false;
      console.log('done');
    });
  } catch (message) {
    console.error(message);
  }
}

async function search(nameInput, typeDropdown, inequalitySignDropdown, priceInput) {
  const name = nameInput.value;

  const types = [];
  for (let i = 0; i < typeDropdown.dropdownSelection.options.length; i++) {
    const type = typeDropdown.dropdownSelection.options[i];
    if (type.selected) {
      types.push(type.value);
    }
  }

  console.log(inequalitySignDropdown.selection.value);
  console.log(priceInput.value);
  console.log(inequalitySignDropdown.selection.value);
  console.log(priceInput.value);

  const inequalitySign = inequalitySignDropdown.selection.value;
  const price = priceInput.value;

  try {
    const potions = await potionActions.getPotionsWithFilters(name, types, inequalitySign, price);
    const sorted = [...potions].sort((a, b) => a.name.localeCompare(b.name));
    resultsView.renderPotions(sorted);
  } catch (message) {
    console.error(message);
  }
}
