import * as baseView from '../shared/base-view.js';
import * as elementFactory from '../../utils/element-factory.js';
import * as buttonFactory from '../../utils/button-factory.js';
import * as ingredientRenderer from '../../ui/ingredients/ingredient-render.js';
import * as ingredientActions from '../../actions/ingredient-actions.js';
import * as modalRenderer from '../components/modal.js';
import * as ingredientsSearch from './ingredients-view-search.js';
import * as ingredientsResults from './ingredients-view-results.js';

/**
 * Renders the Ingredients view by clearing the main content area, creating a dynamic search panel and a fixed scrollable results
 * panel, and then populating the results panel with all ingredients.
 *
 * @returns {void}
 */
export async function renderIngredientsView() {
  baseView.refresh();
  ingredientsSearch.renderSearchPanel();
  ingredientsResults.renderResultsPanel();
}
