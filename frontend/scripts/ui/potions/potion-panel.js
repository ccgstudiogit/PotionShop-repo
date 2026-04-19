import { clearAndGenerateSections } from "../shared/base-panel.js";
import * as buttonFactory from '../../utils/button-factory.js';
import * as potionActions from '../../actions/potion-actions.js';
import * as potionRenderer from './potion-render.js';
import * as potionAddForm from './potion-add-form.js';
import * as potionEditForm from './potion-edit-form.js';

/**
 * Clear the current panel and display the potions panel.
 * 
 * @returns {void}
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
 * @returns {void}
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
 * @async
 * @param {HTMLElement} resultsSection The parent HTML element for the results section
 * @returns {void}
 */
async function displayAllPotions(resultsSection) {
  // Clear the results section before displaying the new results
  resultsSection.innerHTML = '';

  // Fetch the potions from the backend via the actions layer, which calls the API layer
  try {
    const potions = await potionActions.getAllPotionsWithIngredients();

    if (potions) {
      potions.forEach(async potion => {
        const potionObject = potionRenderer.renderPotion(potion);
        resultsSection.appendChild(potionObject.root);

        // If the edit button is pressed, open the edit potion form with that potion's information
        potionObject.editButton.onclick = function() {
          editPotionForm(resultsSection, potion);
        };

        // If the remove button is pressed, remove the potion from the database and refresh
        potionObject.removeButton.onclick = async function() {
          await potionActions.deletePotion(potion.id);
          displayAllPotions(resultsSection);
        }
      });
    }
  } catch (message) {
    console.error(message);
  }
}

/**
 * Clear the results section and display an add potion form.
 * 
 * @param {HTMLElement} resultsSection The parent HTML element for the results section
 * @returns {void}
 */
function addPotionForm(resultsSection) {
  resultsSection.innerHTML = '';
  potionAddForm.createAddPotionForm(resultsSection, 3); // The integer is how many random ingredients there will be
}

/**
 * Clear the results section and display the edit potion form.
 * 
 * @param {HTMLElement} resultsSection The parent HTML element for the results section
 * @param {Object} potion The potion that's being edited by the user
 * @returns {void}
 */
function editPotionForm(resultsSection, potion) {
  resultsSection.innerHTML = '';
  potionEditForm.createEditPotionForm(resultsSection, potion);
}
