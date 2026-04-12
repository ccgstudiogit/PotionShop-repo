import * as elementFactory from '../../utils/element-factory.js';

export function popup(parent) {
  const container = elementFactory.createAndAppendElement('div', 'popup-container', parent);
}