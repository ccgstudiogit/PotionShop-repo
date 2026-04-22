import * as baseView from '../shared/base-view.js';
import * as elementFactory from '../../utils/element-factory.js';
import * as ingredientRenderer from '../../ui/ingredients/ingredient-render.js';
import * as ingredientActions from '../../actions/ingredient-actions.js';

export function renderIngredientsView() {
  baseView.refresh();
  const mainContent = baseView.getMainContent();
  const searchPanel = baseView.renderDynamicPanel(mainContent);
  const resultsPanel = baseView.renderFixedPanel(mainContent);

  displayIngredients(resultsPanel.content);
}

export function renderAddForm() {

}

/**
 * Displays all ingredients in the results section.
 * 
 * @async
 * @param {HTMLElement} parent The parent HTML element for the rendered ingredients
 * @returns {void}
 */
async function displayIngredients(parent) {
  // Fetch the ingredients from the backend via the actions layer, which calls the API layer
  try {
    const ingredients = await ingredientActions.getAllIngredients();
    const sorted = [...ingredients].sort((a, b) => a.name.localeCompare(b.name));
    renderIngredients(sorted, parent);
  } catch (message) {
    console.error(message);
  }
}

/**
 * Fetch the ingredients from the backend, sort them by name, and render them. The ingredients' remove buttons are also added.
 * 
 * @async
 * @param {HTMLElement} parent The parent HTML element for the rendered ingredients
 * @returns {void}
 */
async function renderIngredients(ingredients, parent) {
  ingredients.forEach(async ingredient => {
    const ingredientElement = ingredientRenderer.renderIngredient(ingredient);
    parent.appendChild(ingredientElement.root);
    ingredientElement.removeButton.onclick = async function () {
      //generateConfirmDeletePotionModal(ingredient, parent);
    };
  });
}
