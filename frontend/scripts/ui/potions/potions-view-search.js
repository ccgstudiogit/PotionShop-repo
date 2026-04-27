import * as baseView from '../shared/base-view.js';
import * as elementFactory from '../../utils/element-factory.js';
import * as buttonFactory from '../../utils/button-factory.js';
import * as potionActions from '../../actions/potion-actions.js';
import * as resultsView from './potions-view-results.js';
import * as dropdownRenderer from '../components/dropdown.js';

let searchPanel;

/**
 * Returns the current search panel DOM element. Used by other modules to access the container where search fields are rendered.
 *
 * @returns {{
 *   searchFieldsContainer: HTMLDivElement,
 *   searchActionsContainer: HTMLDivElement
 * }} The search panel container element.
 */
export function getSearchPanel() {
  return {
    searchFieldsContainer: searchPanel.searchFieldsContainer,
    searchActionsContainer: searchPanel.searchActionsContainer
  };
}

/**
 * Sets the internal reference to the search panel container. This is called when the search panel is first rendered and allows other functions in
 * this module to access the panel without passing it around.
 *
 * @param {HTMLElement} panel - The search panel container element.
 * @returns {void}
 */
function setSearchPanel(panel) {
  searchPanel = panel;
}

/**
 * Renders the full search panel UI, including the name field, type filter, price filter, and search button.
 *
 * @async
 * @returns {void}
 */
export async function renderSearchPanel() {
  const mainContent = baseView.getMainContent();
  const searchPanel = baseView.renderBaseSearchPanel(mainContent);
  setSearchPanel(searchPanel);

  try {
    // Render the search fields and search button
    const nameInput = renderNameSearchField();
    const typeDropdown = await renderTypeSearchField();
    const priceInput = renderPriceSearchField();

    // Keep references so the the actions buttons can access them
    const inputs = {
      nameInput,
      typeDropdown,
      priceInput
    };

    renderSearchButton(inputs);

    // Render the actions buttons (e.g. Clear Filters, etc.)
    renderClearFiltersButton(inputs);
  } catch (message) {
    console.error(message);
  }
}

/**
 * Renders the name search field, including its title and input box.
 *
 * @returns {{
 *   root: HTMLDivElement,
 *   title: HTMLParagraphElement,
 *   input: HTMLInputElement
 * }} An object containing references to the container, title, and input element.
 */
function renderNameSearchField() {
  const nameInputContainer = elementFactory.createAndAppendElement('div', 'search-panel-field-container', getSearchPanel().searchFieldsContainer);
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

/**
 * Renders the type filter field, including a multi-select dropdown populated with potion types fetched from the backend. Also displays a tip explaining
 * how to select multiple values.
 *
 * @async
 * @returns {{
 *   root: HTMLDivElement,
 *   title: HTMLParagraphElement,
 *   dropdownRoot: HTMLDivElement,
 *   dropdownSelection: HTMLSelectElement
 * }} A promise resolving to an object containing references to the container, title, dropdown root, and selection element.
 */
async function renderTypeSearchField() {
  const typeDropdownContainer = elementFactory.createAndAppendElement('div', 'search-panel-field-container', getSearchPanel().searchFieldsContainer);
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

/**
 * Renders the price filter field, including:
 * - A dropdown for selecting an inequality sign (<, >, <=, >=)
 * - A numeric input for entering the price value
 * Includes validation to ensure only integer values are accepted.
 *
 * @returns {{
 *   root: HTMLDivElement,
 *   title: HTMLParagraphElement,
 *   inequalitySignDropdown: Object,
 *   input: HTMLInputElement
 * }} An object containing references to the container, title, inequality dropdown, and price input element.
 */
function renderPriceSearchField() {
  const priceInputContainer = elementFactory.createAndAppendElement('div', 'search-panel-field-container', getSearchPanel().searchFieldsContainer);
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

/**
 * Renders the search button and wires it to trigger the search operation. Disables the button while the search is running to prevent duplicate requests.
 *
 * @param {HTMLInputElement} nameInput - The name search input element.
 * @param {Object} typeDropdown - The type dropdown object returned from renderTypeSearchField().
 * @param {Object} inequalitySignDropdown - The dropdown for selecting the price inequality sign.
 * @param {HTMLInputElement} priceInput - The price input element.
 * @returns {HTMLButtonElement} The rendered search button.
 */
function renderSearchButton(inputs) {
  const searchButton = buttonFactory.createAndAppendButton('Search', 'search-panel-button', getSearchPanel().searchFieldsContainer, null);
  searchButton.addEventListener('click', async () => {
    searchButton.disabled = true;
    await search(inputs);
    searchButton.disabled = false;
  });

  return searchButton;
}

/**
 * Executes the search operation by collecting all filter values, sending them to the backend via the actions layer, sorting the results, and rendering them
 * in the results panel.
 *
 * @async
 * @param {HTMLInputElement} nameInput - The name search input element.
 * @param {Object} typeDropdown - The type dropdown object containing selected types.
 * @param {Object} inequalitySignDropdown - The dropdown containing the selected inequality sign.
 * @param {HTMLInputElement} priceInput - The price input element.
 * @returns {Promise<void>}
 */
async function search(inputs) {
  const name = inputs.nameInput.input.value;

  const types = [];
  for (let i = 0; i < inputs.typeDropdown.dropdownSelection.options.length; i++) {
    const type = inputs.typeDropdown.dropdownSelection.options[i];
    if (type.selected) {
      types.push(type.value);
    }
  }

  const inequalitySign = inputs.priceInput.inequalitySignDropdown.selection.value;
  const price = inputs.priceInput.input.value;

  try {
    const potions = await potionActions.getPotionsWithFilters(name, types, inequalitySign, price);
    const sorted = [...potions].sort((a, b) => a.name.localeCompare(b.name));
    resultsView.renderPotions(sorted);
  } catch (message) {
    console.error(message);
  }
}

/**
 * Renders the "Clear Filters" button inside the search panel's actions area. When clicked, it resets all search filter inputs to their default states,
 * including:
 * - Clearing the name text field
 * - Deselecting all potion type options
 * - Resetting the price inequality dropdown to its default option
 * - Clearing the price input field
 *
 * @param {Object} inputs - A collection of references to all search filter inputs.
 * @param {Object} inputs.nameInput - The name search field component.
 * @param {Object} inputs.typeDropdown - The potion type dropdown component.
 * @param {Object} inputs.priceInput - The price filter component.
 * @returns {HTMLButtonElement} The rendered "Clear Filters" button element.
 */
function renderClearFiltersButton(inputs) {
  const clearFiltersButton = buttonFactory.createAndAppendButton('Clear Filters', 'search-panel-button', getSearchPanel().searchActionsContainer, () => {
    inputs.nameInput.input.value = '';
    inputs.typeDropdown.dropdownSelection.selectedIndex = -1; // Deselect all options
    inputs.priceInput.inequalitySignDropdown.selection.selectedIndex = 0;
    inputs.priceInput.input.value = '';
  });

  return clearFiltersButton;
}
