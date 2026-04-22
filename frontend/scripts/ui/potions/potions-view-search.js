import * as baseView from '../shared/base-view.js';
import * as searchViewUtils from '../shared/search-view-utils.js';
import * as elementFactory from '../../utils/element-factory.js';
import * as buttonFactory from '../../utils/button-factory.js';

export function renderSearchPanel() {
  const mainContent = baseView.getMainContent();
  const searchPanel = baseView.renderDynamicPanel(mainContent);

  renderOptions(searchPanel.content);
}

function renderOptions(searchPanel) {
  const searchByNameInput = searchViewUtils.createSearchBar('Search potions by name...', searchPanel);
}
