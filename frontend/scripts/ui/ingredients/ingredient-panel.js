import { clearAndGenerateSections } from "../shared/base-panel.js";
import * as buttonFactory from '../../utils/button-factory.js';
import * as ingredientActions from '../../actions/ingredient-actions.js';
import * as ingredientRenderer from './ingredient-render.js';

/**
 * Clear the current panel and display the ingredients panel.
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
 * @param {HTMLElement} optionsSection The parent HTML element for the options section
 * @param {HTMLElement} resultsSection The parent HTML element for the results section
 */
function generateAndLinkOptionsButtons(optionsSection, resultsSection) {
  buttonFactory.createAndAppendButton('Get Ingredients', 'option-button', optionsSection, () => {
    displayAllIngredients(resultsSection);
  });
}

/**
 * Displays all ingredients in the results section.
 * 
 * @param {HTMLElement} resultsSection The parent HTML element for the results section
 */
async function displayAllIngredients(resultsSection) {
  // Clear the results section before displaying the new results
  resultsSection.innerHTML = '';

  // Fetch the ingredients from the backend via the actions layer, which calls the API layer
  const ingredients = await ingredientActions.getAllIngredients();

  if (ingredients) {
    ingredients.forEach(ingredient => {
      const ingredientObject = ingredientRenderer.renderIngredient(ingredient);
      resultsSection.appendChild(ingredientObject.root);
    });
  }
}
