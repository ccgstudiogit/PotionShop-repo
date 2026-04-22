import * as elementFactory from '../../utils/element-factory.js';
import * as buttonFactory from '../../utils/button-factory.js';
import * as dropdownRenderer from './dropdown.js';

/**
 * Render a search bar with an empty filter dropdown and a search button.
 * 
 * @param {HTMLElement} parent - The parent HTML element for the results section.
 * @returns {{
 *   root: HTMLDivElement,
 *   searchBar: HTMLInputElement,
 *   dropdown: HTMLDivElement,
 *   searchButton: HTMLButtonElement
 * }}
 */
export function renderSearchBar(parent) {
  const container = elementFactory.createAndAppendElement('div', 'search-bar-container', parent);

  const searchBar = elementFactory.createAndAppendElement('input', ['search-bar', 'font-jersey'], container);
  searchBar.placeholder = 'Search for...';

  const dropdown = dropdownRenderer.createAndAppendDropdownShell(['search-dropdown', 'custom-select'], ['search-dropdown', 'font-jersey'], container);

  const searchButton = buttonFactory.createAndAppendButton('Search', 'search-button', container, null);

  return {
    root: container,
    searchBar,
    dropdown,
    searchButton
  }
}

/**
 * Generate a search bar, filter dropdown, and search button. Fill up the filter dropdown's selection options.
 * 
 * @param {String[]} filterOptions - An array of Strings that act as the filter options.
 * @param {HTMLElement} parent - The parent HTML element for the results section.
 * @returns {{
 *   root: HTMLDivElement,
 *   searchBar: HTMLInputElement,
 *   dropdown: HTMLDivElement,
 *   selection: HTMLSelectElement,
 *   searchButton: HTMLButtonElement
 * }}
 */
export function renderSearchBarWithOptions(filterOptions, parent) {
  const filterByElement = renderSearchBar(parent);

  filterByElement.searchBar.placeholder = 'Search...';

  // Create the filter options. These should match potion attributes from the backend
  const dropdownSelection = filterByElement.dropdown.selection;
  filterOptions.forEach((filterOption) => {
    const option = elementFactory.createAndAppendElement('option', null, dropdownSelection);
    option.value = filterOption;
    option.textContent = filterOption;
  });

  filterByElement.searchButton.textContent = 'Search';

  return {
    root: filterByElement,
    searchBar: filterByElement.searchBar,
    dropdown: filterByElement.dropdown,
    selection: dropdownSelection,
    searchButton: filterByElement.searchButton
  }
}