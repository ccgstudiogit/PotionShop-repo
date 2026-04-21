import * as panelBase from '../shared/base-panel.js';
import * as elementFactory from '../../utils/element-factory.js';
import * as potionRenderer from '../../ui/potions/potion-render.js';
import * as potionActions from '../../actions/potion-actions.js';

export function renderPotionsView(parent) {
  renderSearchPanel(parent);
  renderResultsPanel(parent);
}

export function renderSearchPanel(parent) {
  const panel = panelBase.renderPanelBackground(parent);
  const content = elementFactory.createAndAppendElement('div', ['potions-search-content', 'panel-flex-col'], panel.div);
}

export function renderResultsPanel(parent) {
  const panel = panelBase.renderPanelBackground(parent);
  const content = elementFactory.createAndAppendElement('div', ['potions-results-content', 'panel-flex-col', 'panel-scrollable'], panel.div);

  displayPotions(content);
}

export function renderAddForm(parent) {
  
}

/**
 * Fetches all potions from the backend via the API layer and renders the potions under the input parent element.
 * 
 * @param {HTMLElement} parent The parent HTML element for the rendered potions
 * @returns {void}
 */
async function displayPotions(parent) {
  // Fetch the potions from the backend via the actions layer, which calls the API layer
  try {
    const potions = await potionActions.getAllPotionsWithIngredients();
    const sorted = [...potions].sort((a, b) => a.name.localeCompare(b.name));
    renderPotions(sorted, parent);
  } catch (message) {
    console.error(message);
  }
}

/**
 * Fetch the potions from the backend, sort them by name, and render them. The potions' edit and remove buttons are also configured.
 * 
 * @async
 * @param {HTMLElement} parent The parent HTML element for the rendered potions
 * @returns {void}
 */
async function renderPotions(potions, parent) {
  potions.forEach(async potion => {
    const potionElement = potionRenderer.renderPotion(potion);
    parent.appendChild(potionElement.root);

    // If the edit button is pressed, open the edit potion form with that potion's information
    potionElement.editButton.onclick = function () {
      editPotionForm(potion, parent);
    };

    // If the remove button is pressed, prompt the user with a confirm delete request. If the user confirms,
    // delete the potion from the database (destructive)
    potionElement.removeButton.onclick = async function () {
      generateConfirmDeletePotionModal(potion, parent);
    };
  });
}
