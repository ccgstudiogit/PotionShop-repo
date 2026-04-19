import * as elementFactory from '../../utils/element-factory.js';
import * as buttonFactory from '../../utils/button-factory.js';
import * as dropdownRenderer from './dropdown.js';

export function renderSearchBar(parent) {
  const container = elementFactory.createAndAppendElement('div', 'search-bar-container', parent);

  const searchBar = elementFactory.createAndAppendElement('input', ['search-bar', 'font-jersey'], container);
  searchBar.placeholder = 'Search for...';

  const dropdown = dropdownRenderer.createAndAppendDropdownShell(['search-dropdown', 'custom-select'], ['search-dropdown', 'font-jersey'], container);
  const selection = dropdown.selection;

  const searchButton = buttonFactory.createAndAppendButton('Search', 'search-button', container, null);

  return {
    root: container,
    searchBar,
    dropdown,
    searchButton
  }
}