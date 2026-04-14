import * as elementFactory from '../../utils/element-factory.js';
import * as buttonFactory from '../../utils/button-factory.js';

// Have the only parameter be the parent and return an object of the modal with its components so the caller function can customize
// the modal window to whatever it needs to be/display
export function renderModal(parent) {
  const container = elementFactory.createAndAppendElement('div', 'modal-container', parent);
  const window = elementFactory.createAndAppendElement('div', 'modal-window', container);

  const windowTitle = elementFactory.createAndAppendElement('p', ['modal-title', 'font-jersey'], window);
  windowTitle.textContent = 'Sample title';

  const line = elementFactory.createAndAppendElement('div', 'modal-line', window);

  const windowText = elementFactory.createAndAppendElement('p', ['modal-text', 'font-jersey'], window);
  windowText.textContent = 'Sample text. Fill this text with either a message or an error, letting the user know something went wrong.';

  const closeButton = buttonFactory.createAndAppendButton('Okay', 'close-button', window, () => {
    container.remove();
  });

  return {
    container,
    window,
    windowTitle,
    line,
    windowText,
    closeButton
  }
}