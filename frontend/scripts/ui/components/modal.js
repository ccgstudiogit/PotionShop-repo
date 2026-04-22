import * as elementFactory from '../../utils/element-factory.js';
import * as buttonFactory from '../../utils/button-factory.js';

/**
 * Renders a global modal window attached to the document body.
 *
 * Creates a modal overlay containing:
 * - a centered modal window
 * - a title element
 * - a divider line
 * - a text/message element
 * - a button container so additional buttons may be added
 * - an "Okay" button that dismisses the modal
 *
 * The modal is removed when the user clicks the button or presses Escape.
 *
 * @returns {{
 *   root: HTMLDivElement,
 *   window: HTMLDivElement,
 *   windowTitle: HTMLParagraphElement,
 *   line: HTMLDivElement,
 *   windowText: HTMLParagraphElement,
 *   buttonContainer: HTMLDivElement,
 *   mainButton: HTMLButtonElement
 * }} DOM references for the rendered modal window.
 */
export function renderGlobalModal() {
  const body = document.getElementsByTagName('body')[0];

  const container = elementFactory.createAndAppendElement('div', 'modal-container', body);
  const window = elementFactory.createAndAppendElement('div', 'modal-window', container);

  const windowTitle = elementFactory.createAndAppendElement('p', ['modal-title', 'font-jersey'], window);
  windowTitle.textContent = 'Sample title';

  const line = elementFactory.createAndAppendElement('div', 'modal-line', window);

  const windowText = elementFactory.createAndAppendElement('p', ['modal-text', 'font-jersey'], window);
  windowText.textContent = 'Sample text. Fill this text with either a message or an error, letting the user know something went wrong.';

  const buttonContainer = elementFactory.createAndAppendElement('div', 'modal-button-container', window);

  const closeButton = buttonFactory.createAndAppendButton('Okay', 'modal-button', buttonContainer, () => {
    container.remove();
  });

  // Pressing ESC key will also dismiss the modal
  document.addEventListener('keydown', function escHandler(press) {
    if (press.key === 'Escape') {
      document.removeEventListener('keydown', escHandler);
      container.remove();
    }
  });

  return {
    root: container,
    window,
    windowTitle,
    line,
    windowText,
    buttonContainer,
    mainButton: closeButton
  }
}