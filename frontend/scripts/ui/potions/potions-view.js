import * as baseView from '../shared/base-view.js';
import * as elementFactory from '../../utils/element-factory.js';
import * as buttonFactory from '../../utils/button-factory.js';
import * as potionAddForm from './potion-add-form.js';
import * as potionSearch from './potions-view-search.js';
import * as potionsResults from './potions-view-results.js';

/**
 * Renders the Potions view by clearing the main content area, creating a dynamic search panel and a fixed scrollable results panel,
 * and then populating the results panel with all potions.
 *
 * @returns {void}
 */
export function renderPotionsView() {
  baseView.refresh();
  potionSearch.renderSearchPanel();
  potionsResults.renderResultsPanel();
}

/*
export function renderAddForm() {
  baseView.refresh();
  const mainContent = baseView.getMainContent();
  const panel = baseView.renderDynamicPanel(mainContent);

  potionAddForm.createAddPotionForm(panel.content, 3);
}
*/
