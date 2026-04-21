import * as elementFactory from '../../utils/element-factory.js';

/**
 * Create an empty panel background and append it to the DOM's body.
 * 
 * @param {HTMLElement} parent The parent DOM element to render into
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
 * }} The newly created DOM element
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

/**
 * An empty panel lets the user know to click one of the options above to view/edit data.
 * 
 * @param {string} message Can be used to override the given message that is already displayed
 * @returns {void}
 */
export function showEmptyPanel(message = null) {
  clearPanel();

  const textContainer = elementFactory.createElement('div', 'text-centered');
  const text = elementFactory.createElement('p', ['font-jersey', 'text-big-static']);
  text.textContent = message === null ? "Press an option above to view and edit data." : message;
  textContainer.appendChild(text);

  const background = document.querySelector('.panel-background');
  background.appendChild(textContainer);
}

/**
 * Clear the panel and reset to an empty background.
 * 
 * @returns {void}
 */
export function clearPanel() {
  const background = document.querySelector('.panel-background');
  background.innerHTML = '';
}

/**
 * Clears the panel and generates the three main structural sections: the options area, the separator line, and the results area.
 *
 * @returns {HTMLElement[]} An array containing:
 *   [0] the main panel element which contains both the options and results sections as children,
 *   [1] the options section element,
 *   [2] the results section element
 */
export function clearAndGenerateSections() {
  clearPanel();

  const background = document.querySelector('.panel-background');

  // Handle creating the header which shows the "Options" and "Results" text at the top. This is the same regardless of the option picked
  const header = elementFactory.createAndAppendElement('div', 'panel-header', background); 
  const headerOptions = elementFactory.createAndAppendElement('div', ['panel-header-options', 'text-centered'], header);
  const headerOptionsText = elementFactory.createAndAppendElement('p', ['font-jersey', 'panel-header-title'], headerOptions);
  headerOptionsText.textContent = "Options";
  elementFactory.createAndAppendElement('div', 'panel-line', header);
  const headerResults = elementFactory.createAndAppendElement('div', ['panel-header-results', 'text-centered'], header);
  const headerResultsText = elementFactory.createAndAppendElement('p', ['font-jersey', 'panel-header-title'], headerResults);
  headerResultsText.textContent = "Results";

  // Handle creating the main body of the panel which contains the options and results sections
  const panel = elementFactory.createAndAppendElement('div', 'panel-content', background);
  const options = elementFactory.createAndAppendElement('div', 'panel-content-options', panel);
  elementFactory.createAndAppendElement('div', 'panel-line', panel); // Separator line between options and results sections
  const results = elementFactory.createAndAppendElement('div', ['panel-content-results', 'panel-scrollable'], panel);

  // Handle creating the default message in the results section before any buttons are clicked
  const emptyResultsMessageContainer = elementFactory.createAndAppendElement('div', 'text-centered-flex-1', results);
  const emptyResultsMessage = elementFactory.createAndAppendElement('p', ['font-jersey', 'text-big-static'], emptyResultsMessageContainer);
  emptyResultsMessage.textContent = "Select an option to see results here.";

  return [panel, options, results];
}
