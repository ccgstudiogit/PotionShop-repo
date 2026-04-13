import * as elementFactory from '../../utils/element-factory.js';

// Have the only parameter be the parent and return an object of the modal with its components so the caller function can customize
// the modal window to whatever it needs to be/display
export function renderModal(parent) {
  const container = elementFactory.createAndAppendElement('div', 'modal-container', parent);
  const window = elementFactory.createAndAppendElement('div', 'modal-window', container);
  const windowText = elementFactory.createAndAppendElement('p', 'font-jersey', window);
  windowText.textContent = 'This is a test!';
}