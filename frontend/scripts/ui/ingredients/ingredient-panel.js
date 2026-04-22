import { clearAndGenerateSections } from "../shared/base-panel.js";
import * as buttonFactory from '../../utils/button-factory.js';
import * as ingredientActions from '../../actions/ingredient-actions.js';
import * as ingredientRenderer from './ingredient-render.js';
import * as modalRenderer from '../components/modal.js';
import * as searchBarRenderer from '../components/search-bar.js';

/**
 * Clear the current panel and display the ingredients panel.
 * 
 * @returns {void}
 */
export function showIngredientsPanel() {
  const [panel, options, results] = clearAndGenerateSections();

  // Results section is passed in as an argument to the functions that generate the options buttons so that when the buttons are clicked,
  // the buttons can manipulate the results section to display the output of the respective button's function
  generateAndLinkOptionsButtons(options, results);
}

/**
 * Generates the options buttons for the ingredients panel and links them to their respective functions so the output is displayed in results.
 * 
 * @param {HTMLElement} optionsSection - The parent HTML element for the options section
 * @param {HTMLElement} resultsSection - The parent HTML element for the results section
 * @returns {void}
 */
function generateAndLinkOptionsButtons(optionsSection, resultsSection) {
  const getIngredientsButton = buttonFactory.createAndAppendButton('Get Ingredients', 'option-button', optionsSection, async function () {
    getIngredientsButton.disabled = true;
    await displayAllIngredients(resultsSection);
    getIngredientsButton.disabled = false;
  });
}

/**
 * Displays all ingredients in the results section.
 * 
 * @async
 * @param {HTMLElement} resultsSection - The parent HTML element for the results section.
 * @returns {void}
 */
async function displayAllIngredients(resultsSection) {
  // Clear the results section before displaying the new results
  resultsSection.innerHTML = '';

  searchBarRenderer.renderSearchBarWithOptions(['Name', 'Rarity'], resultsSection);
  renderIngredients(resultsSection);
}

/**
 * Fetch the ingredients from the backend, sort them by name, and render them. The ingredients' remove buttons are also configured.
 * 
 * @async
 * @param {HTMLElement} resultsSection - The parent HTML element for the results section.
 * @returns {void}
 */
async function renderIngredients(resultsSection) {
  try {
    // Fetch the ingredients from the backend via the actions layer, which calls the API layer
    const ingredients = await ingredientActions.getAllIngredients();

    const sorted = [...ingredients].sort((a, b) => a.name.localeCompare(b.name));
    sorted.forEach(ingredient => {
      const ingredientElement = ingredientRenderer.renderIngredient(ingredient);
      resultsSection.appendChild(ingredientElement.root);

      ingredientElement.removeButton.onclick = async function () {
        generateConfirmDeleteModalWindow(ingredient, resultsSection);
      }
    });
  } catch (message) {
    console.error(message);
  }
}

/**
 * Render the confirm delete modal window. If the user confirms the action, a DELETE request with the ingredient's id is sent to the backend.
 * Once the confirm takes place, the ingredient list is re-rendered by calling displayAllIngredients again.
 * 
 * @param {Object} ingredient - The ingredient object.
 * @param {HTMLElement} resultsSection - The parent HTML element for the results section.
 * @returns {void}
 */
function generateConfirmDeleteModalWindow(ingredient, resultsSection) {
  const confirmModal = modalRenderer.renderGlobalModal();

  confirmModal.windowTitle.textContent = 'Confirm Delete';
  confirmModal.windowText.textContent = `Delete ${ingredient.name} from the shop?`;

  confirmModal.mainButton.textContent = 'Delete';
  confirmModal.mainButton.onclick = async function () {
    try {
      await ingredientActions.deleteIngredient(ingredient.id);
    } catch (message) {
      console.error(message);
    }

    // Refresh the updated list after deletion
    displayAllIngredients(resultsSection);
  }

  // Add the cancel button
  const cancelButton = buttonFactory.createAndAppendButton('Cancel', 'modal-button', confirmModal.buttonContainer, () => {
    confirmModal.root.remove();
  });
}
