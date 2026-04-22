import * as basePanel from './base-panel.js';
import * as elementFactory from '../../utils/element-factory.js';

/**
 * Get the HTML element that has the id 'main-content' within the DOM.
 * 
 * @returns {HTMLElement} The HTML element that acts as the root for all of the main content.
 */
export function getMainContent() {
  return document.getElementById('main-content');
}

/**
 * Refresh the HTML element with the id 'main-content' by clearing its inner HTML.
 * 
 * @returns {void}
 */
export function refresh() {
  const mainContent = getMainContent();
  mainContent.innerHTML = '';
}

/**
 * Renders a dynamic panel whose height adjusts automatically based on its children. The panel contains a <section> wrapper
 * and an inner <div> with the 'dynamic-content' class.
 *
 * @param {HTMLElement} parent - The element to append the panel to.
 * @returns {{
 *   panel: {
 *     root: HTMLSectionElement,
 *     div: HTMLDivElement
 *   },
 *   content: HTMLDivElement
 * }}
 */
export function renderDynamicPanel(parent) {
  const panel = basePanel.renderPanelBackground(parent);
  const content = elementFactory.createAndAppendElement('div', ['dynamic-content', 'panel-flex-col'], panel.div);

  return {
    panel,
    content
  };
}

/**
 * Renders a fixed-height panel intended for scrollable content. The panel contains a <section> wrapper and an inner <div> with
 * the 'fixed-content' and 'panel-scrollable' classes.
 *
 * @param {HTMLElement} parent - The element to append the panel to.
 * @returns {{
 *   panel: {
 *     root: HTMLSectionElement,
 *     div: HTMLDivElement
 *   },
 *   content: HTMLDivElement
 * }}
 */
export function renderFixedPanel(parent) {
  const panel = basePanel.renderPanelBackground(parent);
  const content = elementFactory.createAndAppendElement('div', ['fixed-content', 'panel-flex-col', 'panel-scrollable'], panel.div);

  return {
    panel,
    content
  };
}