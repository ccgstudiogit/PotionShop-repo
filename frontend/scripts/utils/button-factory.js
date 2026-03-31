import * as elementFactory from './element-factory.js';

/**
 * Creates a button, applies classes, sets text, and attaches a click handler.
 *
 * @param {string} label - The text displayed on the button
 * @param {string|string[]} classes - CSS classes to apply
 * @param {HTMLElement} parent - The parent element to append the button to
 * @param {Function} onClick - The function to call when the button is clicked
 * @returns {HTMLButtonElement} The created button element
 */
export function createAndAppendButton(label, classes, parent, onClick) {
  const button = elementFactory.createAndAppendElement('button', classes, parent);
  button.textContent = label;
  button.addEventListener('click', onClick);
  return button;
}