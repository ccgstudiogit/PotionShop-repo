import * as elementFactory from '../../utils/element-factory.js';

export function createSearchBar(placeholderText, parent) {
  const container = elementFactory.createAndAppendElement('div', 'searchbar-container', parent);

  const input = elementFactory.createAndAppendElement('input', ['searchbar-flex', 'font-jersey'], container);
  input.placeholder = placeholderText;

  return {
    root: container,
    input: input
  };
}