import * as panelBase from './base-panel.js';
import * as elementFactory from '../../utils/element-factory.js';

export function refresh(contentRoot) {
  contentRoot.innerHTML = '';
}

export function renderSearchPanel(parent) {
  const panel = panelBase.renderPanelBackground(parent);
  const content = elementFactory.createAndAppendElement('div', ['search-content', 'panel-flex-col'], panel.div);

  return {
    panel,
    content
  };
}

export function renderResultsPanel(parent) {
  const panel = panelBase.renderPanelBackground(parent);
  const content = elementFactory.createAndAppendElement('div', ['results-content', 'panel-flex-col', 'panel-scrollable'], panel.div);

  return {
    panel,
    content
  };
}