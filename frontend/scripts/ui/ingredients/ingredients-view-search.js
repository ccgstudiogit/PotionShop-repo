import * as baseView from '../shared/base-view.js';
import * as resultsView from './ingredients-view-results.js';
import * as elementFactory from '../../utils/element-factory.js';
import * as buttonFactory from '../../utils/button-factory.js';
import * as dropdownRenderer from '../components/dropdown.js';
import * as ingredientActions from '../../actions/ingredient-actions.js';

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
 * Renders the full search panel UI, including the name field, rarity field, and search button.
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
    const rarityDropdown = await renderRaritySearchField();

    // Keep references so the the actions buttons can access them
    const inputs = {
      nameInput,
      rarityDropdown
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
  nameInput.placeholder = 'Search ingredients by name...';

  return {
    root: nameInputContainer,
    title: nameInputTitle,
    input: nameInput
  };
}

/**
 * Renders the rarity filter field, including a multi-select dropdown populated with potion rarities fetched from the backend. Also displays a tip explaining
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
async function renderRaritySearchField() {
  const rarityDropdownContainer = elementFactory.createAndAppendElement('div', 'search-panel-field-container', getSearchPanel().searchFieldsContainer);
  const rarityDropdownTitle = elementFactory.createAndAppendElement('p', ['search-panel-field-title', 'font-jersey'], rarityDropdownContainer);
  rarityDropdownTitle.textContent = 'Rarity(s):';
  const rarityDropdown = dropdownRenderer.createAndAppendDropdownShell(['custom-select-no-arrows', 'custom-select-wide-padding'], 'font-jersey', rarityDropdownContainer);
  rarityDropdown.selection.multiple = true; // Users must use 'CTRL' + click to select multiple options
  rarityDropdown.selection.size = 4;

  const multiSelectTip = elementFactory.createAndAppendElement('p', ['search-panel-tip-text', 'font-jersey'], rarityDropdownContainer);
  multiSelectTip.textContent = '(hold CTRL to select multiple)';

  const ingredientRarities = await ingredientActions.getRarities();
  ingredientRarities.forEach(rarity => {
    const option = elementFactory.createAndAppendElement('option', null, rarityDropdown.selection);
    option.value = rarity;
    option.textContent = rarity;
  });

  return {
    root: rarityDropdownContainer,
    title: rarityDropdownTitle,
    dropdownRoot: rarityDropdown.root,
    dropdownSelection: rarityDropdown.selection
  };
}

/**
 * Renders the search button and wires it to trigger the search operation. Disables the button while the search is running to prevent duplicate requests.
 *
 * @param {Object} inputs - A collection of references to all search filter inputs.
 * @param {HTMLInputElement} inputs.nameInput - The name search input element.
 * @param {Object} inputs.rarityDropdown - The rarity dropdown object returned from renderRaritySearchField().
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
 * @param {Object} inputs - A collection of references to all search filter inputs.
 * @param {HTMLInputElement} inputs.nameInput - The name search input element.
 * @param {Object} inputs.rarityDropdown - The rarity dropdown object containing selected rarities.
 * @returns {Promise<void>}
 */
async function search(inputs) {
  const name = inputs.nameInput.input.value;

  const rarities = [];
  for (let i = 0; i < inputs.rarityDropdown.dropdownSelection.options.length; i++) {
    const rarity = inputs.rarityDropdown.dropdownSelection.options[i];
    if (rarity.selected) {
      rarities.push(rarity.value);
    }
  }

  try {
    const ingredients = await ingredientActions.getIngredientsWithFilters(name, rarities);
    const sorted = [...ingredients].sort((a, b) => a.name.localeCompare(b.name));
    resultsView.renderIngredients(sorted);
  } catch (message) {
    console.error(message);
  }
}

/**
 * Renders the "Clear Filters" button inside the search panel's actions area. When clicked, it resets all search filter inputs to their default states,
 * including:
 * - Clearing the name text field
 * - Deselecting all rarity options
 *
 * @param {Object} inputs - A collection of references to all search filter inputs.
 * @param {Object} inputs.nameInput - The name search field component.
 * @param {Object} inputs.rarityDropdown - The rarity dropdown component.
 * @returns {HTMLButtonElement} The rendered "Clear Filters" button element.
 */
function renderClearFiltersButton(inputs) {
  const clearFiltersButton = buttonFactory.createAndAppendButton('Clear Filters', 'search-panel-button', getSearchPanel().searchActionsContainer, () => {
    inputs.nameInput.input.value = '';
    inputs.rarityDropdown.dropdownSelection.selectedIndex = -1; // Deselect all options
  });

  return clearFiltersButton;
}
