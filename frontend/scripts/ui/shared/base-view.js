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

/**
 * Renders the base layout structure for a search panel. This includes:
 * - A background panel container
 * - A content wrapper with search panel styling
 * - A left-side container for search fields
 * - A vertical separator line
 * - A right-side container for search options or additional controls
 *
 * @param {HTMLElement} parent - The parent element to render the search panel into.
 * @returns {{
 *   content: HTMLDivElement,
 *   searchFieldsContainer: HTMLDivElement,
 *   searchOptionsContainer: HTMLDivElement
 * }} An object containing references to the main content wrapper, the search fields container, and the search options container.
 */
export function renderBaseSearchPanel(parent) {
  const panel = basePanel.renderPanelBackground(parent);
  const content = elementFactory.createAndAppendElement('div', ['dynamic-content', 'search-panel'], panel.div);

  const searchFieldsContainer = elementFactory.createAndAppendElement('div', 'search-panel-fields', content);
  const separatorLine = elementFactory.createAndAppendElement('div', 'line-vertical-full', content);
  const searchOptionsContainer = elementFactory.createAndAppendElement('div', 'search-panel-options', content);

  return {
    content,
    searchFieldsContainer,
    searchOptionsContainer
  }
}
