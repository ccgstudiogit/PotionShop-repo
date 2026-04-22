import * as basePanel from './base-panel.js';
import * as elementFactory from '../../utils/element-factory.js';

export function getMainContent() {
  return document.getElementById('main-content');
}

export function refresh() {
  const mainContent = getMainContent();
  mainContent.innerHTML = '';
}

export function renderDynamicPanel(parent) {
  const panel = basePanel.renderPanelBackground(parent);
  const content = elementFactory.createAndAppendElement('div', ['dynamic-content', 'panel-flex-col'], panel.div);

  return {
    panel,
    content
  };
}

export function renderFixedPanel(parent) {
  const panel = basePanel.renderPanelBackground(parent);
  const content = elementFactory.createAndAppendElement('div', ['fixed-content', 'panel-flex-col', 'panel-scrollable'], panel.div);

  return {
    panel,
    content
  };
}