import * as elementFactory from '../../utils/element-factory.js';
import * as buttonFactory from '../../utils/button-factory.js';
import * as ingredientActions from '../../actions/ingredient-actions.js';
import * as dropdownRenderer from '../components/dropdown.js';

/**
 * Creates a labeled text input for entering an ingredient's name.
 *
 * @param {HTMLElement} parent - The parent element to append the input block into.
 * @returns {{root: HTMLElement, title: HTMLElement, input: HTMLInputElement}}
 *   An object containing references to the root container, title label, and input element.
 */
export function createNameInput(parent) {
  const container = elementFactory.createAndAppendElement('div', 'form-input-container', parent);

  const title = elementFactory.createAndAppendElement('p', ['form-input-title', 'font-jersey'], container);
  title.textContent = 'Name:';

  const input = elementFactory.createAndAppendElement('input', ['form-input-string', 'font-jersey'], container);
  input.placeholder = 'New ingredient name...';

  return {
    root: container,
    title: title,
    input: input
  };
}

/**
 * Creates a labeled dropdown input for selecting an ingredient's rarity. Fetches available rarities from the backend to ensure accuracy.
 *
 * @async
 * @param {HTMLElement} parent - The parent element to append the dropdown block into.
 * @returns {{root: HTMLElement, title: HTMLElement, dropdown: HTMLElement, select: HTMLSelectElement}}
 *   An object containing references to the root container, title label, the dropdown shell, and the underlying <select> element.
 */
export async function createRarityInput(parent) {
  const container = elementFactory.createAndAppendElement('div', 'form-input-container', parent);

  const title = elementFactory.createAndAppendElement('p', ['form-input-title', 'font-jersey'], container);
  title.textContent = 'Rarity:';

  const dropdown = dropdownRenderer.createAndAppendDropdownShell(['custom-select', 'custom-select-wide-padding'], 'font-jersey', container);
  const selection = dropdown.selection;

  // Fetch the rarities from the backend so they are always accurate and up-to-date
  try {
    const rarities = await ingredientActions.getRarities();
    rarities.forEach(rarity => {
      const option = elementFactory.createAndAppendElement('option', null, selection);
      option.value = rarity;
      option.textContent = rarity;
    });
  } catch (message) {
    console.error(message);
  }

  return {
    root: container,
    title: title,
    dropdown: dropdown,
    select: selection
  };
}