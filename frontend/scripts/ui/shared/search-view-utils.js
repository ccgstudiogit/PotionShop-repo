import * as elementFactory from '../../utils/element-factory.js';

export function createSearchBar(placeholderText, parent) {
  const container = elementFactory.createAndAppendElement('div', 'search-panel-field-container', parent);

  const title = elementFactory.createAndAppendElement('p', ['search-panel-field-title', 'font-jersey'], container);
  title.textContent = 'Search:';

  const input = elementFactory.createAndAppendElement('input', ['search-panel-searchbar', 'search-panel-searchbar-flex', 'font-jersey'], container);
  input.placeholder = placeholderText;

  return {
    root: container,
    input: input
  };
}