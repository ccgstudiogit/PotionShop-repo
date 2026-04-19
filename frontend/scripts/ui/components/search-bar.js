import * as elementFactory from '../../utils/element-factory.js';

export function renderSearchBar(parent) {
  const container = elementFactory.createAndAppendElement('div', 'search-bar-container', parent);

  const searchBar = elementFactory.createAndAppendElement('input', ['search-bar', 'font-jersey'], container);
  searchBar.placeholder = 'Search for...';
}