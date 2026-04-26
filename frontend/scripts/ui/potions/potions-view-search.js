import * as baseView from '../shared/base-view.js';
import * as elementFactory from '../../utils/element-factory.js';
import * as buttonFactory from '../../utils/button-factory.js';
import * as potionActions from '../../actions/potion-actions.js';
import * as resultsView from './potions-view-results.js';
import * as dropdownRenderer from '../components/dropdown.js';

let searchPanel;

export function getSearchPanel() {
  return searchPanel;
}

function setSearchPanel(panel) {
  searchPanel = panel;
}

export function renderSearchPanel() {
  const mainContent = baseView.getMainContent();
  const searchPanel = baseView.renderBaseSearchPanel(mainContent);
  setSearchPanel(searchPanel.searchFieldsContainer);

  renderSearchFields(getSearchPanel());
}

async function renderSearchFields() {
  try {
    const nameInput = renderNameSearchField();
    const typeDropdown = await renderTypeSearchField();
    const priceInput = renderPriceSearchField();
    renderSearchButton(nameInput.input, typeDropdown, priceInput.inequalitySignDropdown, priceInput.input);
  } catch (message) {
    console.error(message);
  }
}

function renderNameSearchField() {
  const nameInputContainer = elementFactory.createAndAppendElement('div', 'search-panel-field-container', getSearchPanel());
  const nameInputTitle = elementFactory.createAndAppendElement('p', ['search-panel-field-title', 'font-jersey'], nameInputContainer);
  nameInputTitle.textContent = 'Name:';
  const nameInput = elementFactory.createAndAppendElement('input', ['search-panel-searchbar', 'search-panel-searchbar-flex', 'font-jersey'], nameInputContainer);
  nameInput.placeholder = 'Search potions by name...';

  return {
    root: nameInputContainer,
    title: nameInputTitle,
    input: nameInput
  };
}

async function renderTypeSearchField() {
  const typeDropdownContainer = elementFactory.createAndAppendElement('div', 'search-panel-field-container', getSearchPanel());
  const typeDropdownTitle = elementFactory.createAndAppendElement('p', ['search-panel-field-title', 'font-jersey'], typeDropdownContainer);
  typeDropdownTitle.textContent = 'Type(s):';
  const typeDropdown = dropdownRenderer.createAndAppendDropdownShell(['custom-select-no-arrows', 'custom-select-wide-padding'], 'font-jersey', typeDropdownContainer);
  typeDropdown.selection.multiple = true; // Users must use 'CTRL' + click to select multiple options
  typeDropdown.selection.size = 4;

  const multiSelectTip = elementFactory.createAndAppendElement('p', ['search-panel-tip-text', 'font-jersey'], typeDropdownContainer);
  multiSelectTip.textContent = '(hold CTRL to select multiple)';

  const potionTypes = await potionActions.getPotionTypes();
  potionTypes.forEach(type => {
    const option = elementFactory.createAndAppendElement('option', null, typeDropdown.selection);
    option.value = type;
    option.textContent = type;
  });

  return {
    root: typeDropdownContainer,
    title: typeDropdownTitle,
    dropdownRoot: typeDropdown.root,
    dropdownSelection: typeDropdown.selection
  };
}

function renderPriceSearchField() {
  const priceInputContainer = elementFactory.createAndAppendElement('div', 'search-panel-field-container', getSearchPanel());
  const priceTitle = elementFactory.createAndAppendElement('p', ['search-panel-field-title', 'font-jersey'], priceInputContainer);
  priceTitle.textContent = 'Price:';

  // Create and configure the dropdown for selecting the inequality sign for price filtering
  const inequalitySignDropdown = dropdownRenderer.createAndAppendDropdownShell(
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
  const priceInput = elementFactory.createAndAppendElement('input', ['search-panel-searchbar', 'search-panel-searchbar-short', 'font-jersey'], priceInputContainer);
  priceInput.placeholder = 'Price...';
  priceInput.onchange = () => {
    const val = Number(priceInput.value);
    if (Number.isNaN(val) || !Number.isInteger(val)) {
      priceInput.value = '';
    }
  }

  return {
    root: priceInputContainer,
    title: priceTitle,
    inequalitySignDropdown,
    input: priceInput
  };
}

function renderSearchButton(nameInput, typeDropdown, inequalitySignDropdown, priceInput) {
  const searchButton = buttonFactory.createAndAppendButton('Search', 'search-panel-search-button', getSearchPanel(), null);
  searchButton.addEventListener('click', async () => {
    searchButton.disabled = true;
    await search(nameInput, typeDropdown, inequalitySignDropdown, priceInput);
    searchButton.disabled = false;
  });

  return searchButton;
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
