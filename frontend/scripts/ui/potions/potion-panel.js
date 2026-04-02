import { clearAndGenerateSections } from "../shared/base-panel.js";
import * as buttonFactory from '../../utils/button-factory.js';
import * as elementFactory from '../../utils/element-factory.js';
import * as potionActions from '../../actions/potion-actions.js';
import * as potionRenderer from './potion-render.js';
import * as potionForms from './potion-add-form.js';

/**
 * Clear the current panel and display the potions panel.
 */
export function showPotionsPanel() {
  const [panel, options, results] = clearAndGenerateSections();

  // Results section is passed in as an argument to the functions that generate the options buttons so that when the buttons are clicked,
  // the buttons can manipulate the results section to display the output of the respective button's function
  generateAndLinkOptionsButtons(options, results);
}

/**
 * Generates the options buttons for the potions panel and links them to their respective functions so the output is displayed in results.
 * 
 * @param {HTMLElement} optionsSection The parent HTML element for the options section
 * @param {HTMLElement} resultsSection The parent HTML element for the results section
 */
function generateAndLinkOptionsButtons(optionsSection, resultsSection) {
  buttonFactory.createAndAppendButton('Get Potions', 'option-button', optionsSection, () => {
    displayAllPotions(resultsSection);
  });

  buttonFactory.createAndAppendButton('Add Potion', 'option-button', optionsSection, () => {
    addPotionForm(resultsSection);
  });
}

/**
 * Displays all potions in the results section.
 * 
 * @param {HTMLElement} resultsSection The parent HTML element for the results section
 */
async function displayAllPotions(resultsSection) {
  // Clear the results section before displaying the new results
  resultsSection.innerHTML = '';

  // Fetch the potions from the backend via the actions layer, which calls the API layer
  const potions = await potionActions.getAllPotions();

  if (potions) {
    potions.forEach(async potion => {
      const potionObject = await potionRenderer.renderPotion(potion);
      resultsSection.appendChild(potionObject.root);
    });
  }
}

/**
 * Clear the results section and display an add potion form.
 * 
 * @param {HTMLElement} resultsSection The parent HTML element for the results section
 */
function addPotionForm(resultsSection) {
  resultsSection.innerHTML = '';
  potionForms.createAddPotionForm(resultsSection);
}
