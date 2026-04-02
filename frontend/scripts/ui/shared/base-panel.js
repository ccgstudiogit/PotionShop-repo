import * as elementFactory from '../../utils/element-factory.js';

/**
 * Create the panel background. A <section> element with the class 'panel' is created with an inner <div> containing the
 * 'panel-background' class.
 */
export function createPanelBackground() {
  const panelBackground = generatePanelBackgroundHTML();
  document.body.appendChild(panelBackground);
}

/**
 * Generates the panel section with 'panel' class along with a div containing the 'panel-background' class. The HTML is
 * generated via document.createElement().
 * 
 * @returns {HTMLElement} The newly created DOM element
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
 * @param {string} message Can be used to override the given message that is already displayed
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
  const headerOptionsText = elementFactory.createAndAppendElement('p', ['font-jersey', 'text-big-dynamic'], headerOptions);
  headerOptionsText.textContent = "Options";
  elementFactory.createAndAppendElement('div', 'panel-line', header);
  const headerResults = elementFactory.createAndAppendElement('div', ['panel-header-results', 'text-centered'], header);
  const headerResultsText = elementFactory.createAndAppendElement('p', ['font-jersey', 'text-big-dynamic'], headerResults);
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
