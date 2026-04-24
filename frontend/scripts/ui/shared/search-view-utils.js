import * as elementFactory from '../../utils/element-factory.js';
import * as buttonFactory from '../../utils/button-factory.js';
import * as dropdownRenderer from '../components/dropdown.js';

export function createSearchBar(placeholderText, parent) {
  const container = elementFactory.createAndAppendElement('div', 'search-panel-field-container', parent);

  const title = elementFactory.createAndAppendElement('p', ['search-panel-field-title', 'font-jersey'], container);
  title.textContent = 'Search:';

  const input = elementFactory.createAndAppendElement('input', ['search-panel-searchbar', 'search-panel-searchbar-flex', 'font-jersey'], container);
  input.placeholder = placeholderText;

  return {
    root: container,
    title,
    input
  };
}

export function createSmallSearchBar(placeholderText, parent) {
  const container = elementFactory.createAndAppendElement('div', 'search-panel-field-container', parent);

  const title = elementFactory.createAndAppendElement('p', ['search-panel-field-title', 'font-jersey'], container);
  title.textContent = 'Search:';

  const input = elementFactory.createAndAppendElement('input', ['search-panel-searchbar', 'search-panel-searchbar-short', 'font-jersey'], container);
  input.placeholder = placeholderText;

  return {
    root: container,
    title,
    input
  };
}

export function createEmptyDropdownFilter(parent) {
  const container = elementFactory.createAndAppendElement('div', 'search-panel-field-container', parent);

  const title = elementFactory.createAndAppendElement('p', ['search-panel-field-title', 'font-jersey'], container);
  title.textContent = 'Filter:';

  const dropdown = dropdownRenderer.createAndAppendDropdownShell('custom-select-no-arrows', 'font-jersey', container);

  return {
    root: container,
    title,
    dropdownRoot: dropdown.root,
    dropdownSelection: dropdown.selection
  };
}

export function createSearchButton(parent) {
  const button = buttonFactory.createAndAppendButton('Search', 'search-panel-search-button', parent, null);
  return button;
}
