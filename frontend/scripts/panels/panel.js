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
 */
function generatePanelBackgroundHTML() {
  const section = document.createElement('section');
  section.classList.add('panel');

  const background = document.createElement('div');
  background.classList.add('panel-background');

  section.appendChild(background);
  return section;
}

/**
 * An empty panel lets the user know to click one of the options above to view/edit data.
 * 
 * @param {string} message Can be used to override the given message that is already displayed.
 */
export function emptyPanel(message = null) {
  clearPanel();

  const textContainer = document.createElement('div');
  textContainer.classList.add('text-centered');

  const text = document.createElement('p');
  text.classList.add('font-jersey');
  text.classList.add('text-big');
  text.textContent = message === null ? "Press an option above to view and edit data." : message;

  textContainer.append(text);

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
