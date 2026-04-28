import * as baseView from '../shared/base-view.js';
import * as elementFactory from '../../utils/element-factory.js';
import * as buttonFactory from '../../utils/button-factory.js';
import * as ingredientRenderer from '../../ui/ingredients/ingredient-render.js';
import * as ingredientActions from '../../actions/ingredient-actions.js';
import * as ingredientAddForm from './ingredient-add-form.js';
import * as modalRenderer from '../components/modal.js';

let contentSection;

/**
 * Returns the current content section where ingredient results are rendered. This allows other modules (such as the search panel) to access
 * and update the results area without passing the DOM node around manually.
 *
 * @returns {HTMLElement} The DOM element representing the results content section.
 */
export function getContentSection() {
  return contentSection;
}

/**
 * Sets the internal reference to the content section used for rendering ingredient results. This is called when the results panel is first
 * created and ensures that all rendering functions operate on the correct DOM container.
 *
 * @param {HTMLElement} section - The DOM element to use as the results content section.
 * @returns {void}
 */
function setContentSection(section) {
  contentSection = section;
}

/**
 * Renders the fixed results panel and initializes the content section where ingredient results will be displayed. After setting the content
 * section, this function triggers the initial rendering of all ingredients.
 *
 * @returns {void}
 */
export function renderResultsPanel() {
  const mainContent = baseView.getMainContent();
  const resultsPanel = baseView.renderFixedPanel(mainContent);
  setContentSection(resultsPanel.content);
  displayIngredients();
}

/**
 * Displays all ingredients in the results section.
 * 
 * @async
 * @returns {void}
 */
async function displayIngredients() {
  // Fetch the ingredients from the backend via the actions layer, which calls the API layer
  try {
    const ingredients = await ingredientActions.getAllIngredients();
    if (ingredients.length === 0) {
      elementFactory.applyClasses(getContentSection(), 'panel-center-items');
      const message = elementFactory.createAndAppendElement('p', ['text-big-static', 'font-jersey'], getContentSection());
      message.textContent = 'Whoops, no ingredients here!';
      // Since the add button is generated via renderIngredients, still call that function even though there are no ingredients to display
    }

    const sorted = [...ingredients].sort((a, b) => a.name.localeCompare(b.name));
    renderIngredients(sorted, getContentSection());
  } catch (message) {
    console.error(message);
  }
}

/**
 * Fetch the ingredients from the backend, sort them by name, and render them. The ingredients' remove buttons are also added.
 * 
 * @returns {void}
 */
export function renderIngredients(ingredients) {
  // Make sure the list is always refreshed when rendering ingredients
  getContentSection().innerHTML = '';

  ingredients.forEach(ingredient => {
    const ingredientElement = ingredientRenderer.renderIngredient(ingredient);
    getContentSection().appendChild(ingredientElement.root);
    ingredientElement.removeButton.onclick = async function () {
      showConfirmDeleteModal(ingredient, getContentSection());
    };
  });

  // Add the add ingredient button at the end of the list of rendered ingredients
  buttonFactory.createAndAppendButton('Add Ingredient', 'add-item-button', getContentSection(), () => renderAddForm());
}

/**
 * Render the confirm delete modal window. If the user confirms the action, a DELETE request with the ingredient's id is sent to the backend.
 * Once the confirm takes place, the ingredient list is re-rendered by calling displayAllIngredients again.
 * 
 * @param {Object} ingredient - The ingredient object.
 * @returns {void}
 */
function showConfirmDeleteModal(ingredient) {
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

    displayIngredients();
  }

  // Add the cancel button
  const cancelButton = buttonFactory.createAndAppendButton('Cancel', 'modal-button', confirmModal.buttonContainer, () => {
    confirmModal.root.remove();
  });
}

/**
 * Renders the "Add Ingredient" form by clearing the main content area and creating a new dynamic panel. The add ingredient form is then injected
 * into this panel.
 *
 * @returns {void}
 */
function renderAddForm() {
  baseView.refresh();
  const mainContent = baseView.getMainContent();
  const panel = baseView.renderDynamicPanel(mainContent);

  ingredientAddForm.createAddIngredientForm(panel.content);
}
