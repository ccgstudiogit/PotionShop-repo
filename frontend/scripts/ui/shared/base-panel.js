import * as elementFactory from '../../utils/element-factory.js';

/**
 * Create an empty panel background and append it to the DOM's body.
 * 
 * @param {HTMLElement} parent - The parent DOM element to render into.
 * @returns {{
 *    root: HTMLSectionElement,
 *    div: HTMLDivElement
 * }}
 */
export function renderPanelBackground(parent) {
  const panelBackground = generatePanelBackground();
  parent.appendChild(panelBackground.root);

  return {
    root: panelBackground.root,
    div: panelBackground.div
  };
}

/**
 * Generates a panel background.
 * 
 * @returns {{
 *    root: HTMLSectionElement,
 *    div: HTMLDivElement
 * }} The newly created DOM element.
 */
function generatePanelBackground() {
  const root = elementFactory.createElement('section', 'panel');
  const div = elementFactory.createElement('div', 'panel-background');
  root.appendChild(div);

  return {
    root,
    div: div
  };
}
