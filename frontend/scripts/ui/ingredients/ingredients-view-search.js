import * as baseView from '../shared/base-view.js';

export function renderSearchPanel() {
  const mainContent = baseView.getMainContent();
  const searchPanel = baseView.renderDynamicPanel(mainContent);
}