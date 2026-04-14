import * as elementFactory from '../../utils/element-factory.js';
import * as buttonFactory from '../../utils/button-factory.js';


export function renderGlobalModal() {
  const body = document.getElementsByTagName('body')[0];

  const container = elementFactory.createAndAppendElement('div', 'modal-container', body);
  const window = elementFactory.createAndAppendElement('div', 'modal-window', container);

  const windowTitle = elementFactory.createAndAppendElement('p', ['modal-title', 'font-jersey'], window);
  windowTitle.textContent = 'Sample title';

  const line = elementFactory.createAndAppendElement('div', 'modal-line', window);

  const windowText = elementFactory.createAndAppendElement('p', ['modal-text', 'font-jersey'], window);
  windowText.textContent = 'Sample text. Fill this text with either a message or an error, letting the user know something went wrong.';

  const closeButton = buttonFactory.createAndAppendButton('Okay', 'close-button', window, () => {
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
    container,
    window,
    windowTitle,
    line,
    windowText,
    closeButton
  }
}