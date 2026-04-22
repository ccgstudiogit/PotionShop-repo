import * as baseView from '../shared/base-view.js';
import * as elementFactory from '../../utils/element-factory.js';
import * as buttonFactory from '../../utils/button-factory.js';
import * as ingredientRenderer from '../../ui/ingredients/ingredient-render.js';
import * as ingredientActions from '../../actions/ingredient-actions.js';
import * as modalRenderer from '../components/modal.js';

export async function renderResultsPanel() {
  const mainContent = baseView.getMainContent();
  const resultsPanel = baseView.renderFixedPanel(mainContent);
  await displayIngredients(resultsPanel.content);
  return resultsPanel;
}

/**
 * Displays all ingredients in the results section.
 * 
 * @async
 * @param {HTMLElement} contentSection - The parent HTML element for the rendered ingredients.
 * @returns {void}
 */
async function displayIngredients(contentSection) {
  // Fetch the ingredients from the backend via the actions layer, which calls the API layer
  try {
    const ingredients = await ingredientActions.getAllIngredients();
    if (ingredients.length === 0) {
      const messageContainer = elementFactory.createAndAppendElement('div', 'text-centered', contentSection);
      const message = elementFactory.createAndAppendElement('p', ['text-big-static', 'font-jersey'], messageContainer);
      message.textContent = 'Whoops, no ingredients! Add some using the add form.';
      return;
    }

    const sorted = [...ingredients].sort((a, b) => a.name.localeCompare(b.name));
    renderIngredients(sorted, contentSection);
  } catch (message) {
    console.error(message);
  }
}

/**
 * Fetch the ingredients from the backend, sort them by name, and render them. The ingredients' remove buttons are also added.
 * 
 * @async
 * @param {HTMLElement} contentSection - The parent HTML element for the rendered ingredients.
 * @returns {void}
 */
async function renderIngredients(ingredients, contentSection) {
  ingredients.forEach(async ingredient => {
    const ingredientElement = ingredientRenderer.renderIngredient(ingredient);
    contentSection.appendChild(ingredientElement.root);
    ingredientElement.removeButton.onclick = async function () {
      showConfirmDeleteModal(ingredient, contentSection);
    };
  });
}

/**
 * Render the confirm delete modal window. If the user confirms the action, a DELETE request with the ingredient's id is sent to the backend.
 * Once the confirm takes place, the ingredient list is re-rendered by calling displayAllIngredients again.
 * 
 * @param {Object} ingredient - The ingredient object.
 * @param {HTMLElement} contentSection - The parent HTML element for the results section.
 * @returns {void}
 */
function showConfirmDeleteModal(ingredient, contentSection) {
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
    contentSection.innerHTML = '';
    displayIngredients(contentSection);
  }

  // Add the cancel button
  const cancelButton = buttonFactory.createAndAppendButton('Cancel', 'modal-button', confirmModal.buttonContainer, () => {
    confirmModal.root.remove();
  });
}