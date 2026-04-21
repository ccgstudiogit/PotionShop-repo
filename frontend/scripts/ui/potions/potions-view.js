import * as viewBase from '../shared/base-view.js';
import * as elementFactory from '../../utils/element-factory.js';
import * as potionRenderer from '../../ui/potions/potion-render.js';
import * as potionActions from '../../actions/potion-actions.js';

export function renderPotionsView(parent) {
  viewBase.refresh(parent);
  const searchPanel = viewBase.renderSearchPanel(parent);
  const resultsPanel = viewBase.renderResultsPanel(parent);

  displayPotions(resultsPanel.content);
}

export function renderAddForm(parent) {
  //TODO: ADD THIS FUNCTION
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
      //editPotionForm(potion, parent);
    };

    // If the remove button is pressed, prompt the user with a confirm delete request. If the user confirms,
    // delete the potion from the database (destructive)
    potionElement.removeButton.onclick = async function () {
      //generateConfirmDeletePotionModal(potion, parent);
    };
  });
}
