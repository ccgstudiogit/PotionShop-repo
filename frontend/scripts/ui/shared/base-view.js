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
 * Renders the full structural layout for a search panel, including:
 * - A header row with section titles ("Search Filters" and "Actions")
 * - A content row containing:
 *    - A left-side container for search fields
 *    - A vertical separator
 *    - A right-side container for action buttons or additional controls
 *
 * This function provides the foundational UI structure that feature-specific search panels (such as the Potions search panel) build upon.
 *
 * @param {HTMLElement} parent - The parent element to render the search panel into.
 * @returns {{
 *   root: HTMLDivElement,
 *   header: HTMLDivElement,
 *   searchFieldsTitle: HTMLParagraphElement,
 *   searchOptionsTitle: HTMLParagraphElement,
 *   content: HTMLDivElement,
 *   searchFieldsContainer: HTMLDivElement,
 *   searchOptionsContainer: HTMLDivElement
 * }} An object containing references to all major structural elements of the panel.
 */
export function renderBaseSearchPanel(parent) {
  const panel = basePanel.renderPanelBackground(parent);
  const container = elementFactory.createAndAppendElement('div', ['dynamic-content', 'search-panel'], panel.div);

  // Header
  const header = elementFactory.createAndAppendElement('div', 'search-panel-header', container);
  const searchFieldsTitleContainer = elementFactory.createAndAppendElement('div', 'search-panel-fields-header', header);
  const searchFieldsTitle = elementFactory.createAndAppendElement('p', ['search-panel-header-title', 'font-jersey'], searchFieldsTitleContainer);
  searchFieldsTitle.textContent = 'Search Filters';

  const headerSeparatorLine = elementFactory.createAndAppendElement('div', 'line-vertical-full', header);

  const searchActionsTitleContainer = elementFactory.createAndAppendElement('div', 'search-panel-actions-header', header);
  const searchActionsTitle = elementFactory.createAndAppendElement('p', ['search-panel-header-title', 'font-jersey'], searchActionsTitleContainer);
  searchActionsTitle.textContent = 'Actions';

  // Content
  const content = elementFactory.createAndAppendElement('div', 'search-panel-content', container);
  const searchFieldsContainer = elementFactory.createAndAppendElement('div', 'search-panel-fields', content);
  const separatorLine = elementFactory.createAndAppendElement('div', 'line-vertical-full', content);
  const searchActionsContainer = elementFactory.createAndAppendElement('div', 'search-panel-actions', content);

  return {
    root: container,
    header,
    searchFieldsTitle,
    searchActionsTitle,
    content,
    searchFieldsContainer,
    searchActionsContainer
  }
}
