import * as elementFactory from '../utils/element-factory.js';

/**
 * Create the panel background. A <section> element with the class 'panel' is created with an inner <div>
 * containing the 'panel-background' class.
 */
export function createPanelBackground() {
  const panelBackground = generatePanelBackgroundHTML();
  document.body.appendChild(panelBackground);
}

/**
 * Generates the panel section with 'panel' class along with a div containing the 'panel-background' class.
 * The HTML is generated via document.createElement().
 * 
 * @returns {HTMLElement} The newly created DOM element.
 */
function generatePanelBackgroundHTML() {
  const section = elementFactory.createElement('section', 'panel');
  const background = elementFactory.createElement('div', 'panel-background');

  section.appendChild(background);
  return section;
}

/**
 * An empty panel lets the user know to click one of the options above to view/edit data.
 * 
 * @param {string} message Can be used to override the given message that is already displayed.
 */
export function showEmptyPanel(message = null) {
  clearPanel();

  const textContainer = elementFactory.createElement('div', 'text-centered');
  const text = elementFactory.createElement('p', ['font-jersey', 'text-big']);
  text.textContent = message === null ? "Press an option above to view and edit data." : message;
  textContainer.appendChild(text);

  const background = document.querySelector('.panel-background');
  background.appendChild(textContainer);
}

/**
 * Clear the panel and reset to an empty background.
 */
export function clearPanel() {
  const background = document.querySelector('.panel-background');
  background.innerHTML = '';
}

/**
 * Clear the current panel and display the potions panel.
 */
export function showPotionsPanel() {
  generatePanelSectionsHTML();
}

/**
 * Clears the panel and then generates the options section, separator line, and the results section of the panel.
 * 
 * @returns {HTMLElement} The newly created DOM element.
 */
function generatePanelSectionsHTML() {
  clearPanel();

  const panel = document.querySelector('.panel-background');
  elementFactory.createAndAppendElement('div', 'panel-options', panel);
  elementFactory.createAndAppendElement('div', 'panel-line', panel);
  elementFactory.createAndAppendElement('div', 'panel-results', panel);

  return panel;
}
