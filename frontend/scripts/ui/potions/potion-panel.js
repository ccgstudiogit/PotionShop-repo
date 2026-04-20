import { clearAndGenerateSections } from "../shared/base-panel.js";
import * as elementFactory from '../../utils/element-factory.js';
import * as buttonFactory from '../../utils/button-factory.js';
import * as potionActions from '../../actions/potion-actions.js';
import * as potionRenderer from './potion-render.js';
import * as potionAddForm from './potion-add-form.js';
import * as potionEditForm from './potion-edit-form.js';
import * as modalRenderer from '../components/modal.js';
import * as searchBarRenderer from '../components/search-bar.js';

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
    clearResultsAndCreateSearchBar(resultsSection);
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
 * @param {HTMLElement} resultsSection The parent HTML element for the results section
 * @returns {void}
 */
async function displayAllPotions(resultsSection) {
  // Fetch the potions from the backend via the actions layer, which calls the API layer
  try {
    const potions = await potionActions.getAllPotionsWithIngredients();
    const sorted = [...potions].sort((a, b) => a.name.localeCompare(b.name));
    renderPotions(sorted, resultsSection);
  } catch (message) {
    console.error(message);
  }
}

function clearResultsAndCreateSearchBar(resultsSection) {
  resultsSection.innerHTML = '';

  // Create and wire up the search bar that sits up top
  const searchBar = searchBarRenderer.renderSearchBarWithOptions(['Name', 'Type', 'Price'], resultsSection);
  searchBar.searchButton.onclick = async function () {
    try {
      const searchValue = searchBar.searchBar.value;
      const filterBy = searchBar.selection.value;

      if (searchValue === '') {
        return;
      }

      const filteredPotions = await potionActions.getPotionsWithFilter(filterBy, searchValue);
      clearResultsAndCreateSearchBar(resultsSection);
      const sorted = [...filteredPotions].sort((a, b) => a.name.localeCompare(b.name));
      renderPotions(sorted, resultsSection);
    } catch (message) {
      console.error(message);
    }
  };
}

/**
 * Fetch the potions from the backend, sort them by name, and render them. The potions' edit and remove buttons are also configured.
 * 
 * @async
 * @param {HTMLElement} resultsSection The parent HTML element for the results section
 * @returns {void}
 */
async function renderPotions(potions, resultsSection) {
  potions.forEach(async potion => {
    const potionElement = potionRenderer.renderPotion(potion);
    resultsSection.appendChild(potionElement.root);

    // If the edit button is pressed, open the edit potion form with that potion's information
    potionElement.editButton.onclick = function () {
      editPotionForm(potion, resultsSection);
    };

    // If the remove button is pressed, prompt the user with a confirm delete request. If the user confirms,
    // delete the potion from the database (destructive)
    potionElement.removeButton.onclick = async function () {
      generateConfirmDeletePotionModal(potion, resultsSection);
    };
  });
}

/**
 * Render the confirm delete modal window. If the user confirms the action, a DELETE request with the potion's id is sent to the backend.
 * Once the confirm takes place, the potion list is re-rendered by calling displayAllPotions again.
 * 
 * @param {Object} potion The potion object
 * @param {HTMLElement} resultsSection The parent HTML element for the results section
 * @returns {void}
 */
function generateConfirmDeletePotionModal(potion, resultsSection) {
  const confirmModal = modalRenderer.renderGlobalModal();

  confirmModal.windowTitle.textContent = 'Confirm Delete';
  confirmModal.windowText.textContent = `Delete ${potion.name} from the shop?`;

  confirmModal.mainButton.textContent = 'Delete';
  confirmModal.mainButton.onclick = async function () {
    try {
      await potionActions.deletePotion(potion.id);
    } catch (message) {
      console.error(message);
    }

    // Refresh the updated list after deletion
    displayAllPotions(resultsSection);
  };

  // Add the cancel button
  const cancelButton = buttonFactory.createAndAppendButton('Cancel', 'modal-button', confirmModal.buttonContainer, () => {
    confirmModal.root.remove();
  });
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
 * @param {Object} potion The potion that's being edited by the user
 * @param {HTMLElement} resultsSection The parent HTML element for the results section
 * @returns {void}
 */
function editPotionForm(potion, resultsSection) {
  resultsSection.innerHTML = '';
  potionEditForm.createEditPotionForm(resultsSection, potion);
}
