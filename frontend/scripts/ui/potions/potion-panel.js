import { clearAndGenerateSections } from "../shared/base-panel.js";
import * as buttonFactory from '../../utils/button-factory.js';
import * as potionActions from '../../actions/potion-actions.js';
import * as potionRenderer from './potion-render.js';
import * as potionAddForm from './potion-add-form.js';
import * as potionEditForm from './potion-edit-form.js';
import * as modal from '../components/modal.js';
import * as searchBar from '../components/search-bar.js';

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
  const getPotionsButton = buttonFactory.createAndAppendButton('Get Potions', 'option-button', optionsSection, async function () {
    getPotionsButton.disabled = true;
    await displayAllPotions(resultsSection);
    getPotionsButton.disabled = false;
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

  // Generate search bar up top
  searchBar.renderSearchBar(resultsSection);

  // Fetch the potions from the backend via the actions layer, which calls the API layer
  try {
    const potions = await potionActions.getAllPotionsWithIngredients();

    if (potions) {
      potions.forEach(async potion => {
        const potionObject = potionRenderer.renderPotion(potion);
        resultsSection.appendChild(potionObject.root);

        // If the edit button is pressed, open the edit potion form with that potion's information
        potionObject.editButton.onclick = function () {
          editPotionForm(resultsSection, potion);
        };

        // If the remove button is pressed, prompt the user with a confirm delete request. If the user confirms,
        // delete the potion from the database (destructive)
        potionObject.removeButton.onclick = async function () {
          const confirmModal = modal.renderGlobalModal();

          confirmModal.windowTitle.textContent = 'Confirm Delete';
          confirmModal.windowText.textContent = `Delete ${potionObject.potionName.textContent} from the shop?`;

          confirmModal.mainButton.textContent = 'Delete';
          confirmModal.mainButton.onclick = async function () {
            try {
              await potionActions.deletePotion(potion.id);
            } catch (message) {
              console.error(message);
            }

            // Refresh the updated list after deletion
            displayAllPotions(resultsSection);
          }

          // Add the cancel button
          const cancelButton = buttonFactory.createAndAppendButton('Cancel', 'modal-button', confirmModal.buttonContainer, () => {
            confirmModal.root.remove();
          });
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
