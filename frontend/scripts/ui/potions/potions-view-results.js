import * as baseView from '../shared/base-view.js';
import * as elementFactory from '../../utils/element-factory.js';
import * as buttonFactory from '../../utils/button-factory.js';
import * as potionRenderer from './potion-render.js';
import * as potionEditForm from './potion-edit-form.js';
import * as potionActions from '../../actions/potion-actions.js';
import * as modalRenderer from '../components/modal.js';

export function renderResultsPanel() {
  const mainContent = baseView.getMainContent();
  const resultsPanel = baseView.renderFixedPanel(mainContent);
  displayPotions(resultsPanel.content);
}

/**
 * Fetches all potions from the backend via the API layer and renders the potions under the input parent element.
 * 
 * @param {HTMLElement} contentSection - The parent HTML element for the rendered potions.
 * @returns {void}
 */
async function displayPotions(contentSection) {
  // Fetch the potions from the backend via the actions layer, which calls the API layer
  try {
    const potions = await potionActions.getAllPotionsWithIngredients();
    if (potions.length === 0) {
      elementFactory.applyClasses(contentSection, 'panel-center-items');
      const message = elementFactory.createAndAppendElement('p', ['text-big-static', 'font-jersey'], contentSection);
      message.textContent = 'Whoops, no potions here!';
      // Since the add button is generated via renderPotions, still call that function even though there are no potions to display
    }

    const sorted = [...potions].sort((a, b) => a.name.localeCompare(b.name));
    renderPotions(sorted, contentSection);
  } catch (message) {
    console.error(message);
  }
}

/**
 * Fetch the potions from the backend, sort them by name, and render them. The potions' edit and remove buttons are also configured.
 * 
 * @param {HTMLElement} contentSection - The parent HTML element for the rendered potions.
 * @returns {void}
 */
function renderPotions(potions, contentSection) {
  potions.forEach(potion => {
    const potionElement = potionRenderer.renderPotion(potion);
    contentSection.appendChild(potionElement.root);

    // If the edit button is pressed, open the edit potion form with that potion's information
    potionElement.editButton.onclick = function () {
      renderEditForm(potion);
    };

    // If the remove button is pressed, prompt the user with a confirm delete request. If the user confirms,
    // delete the potion from the database (destructive)
    potionElement.removeButton.onclick = async function () {
      showConfirmDeleteModal(potion, contentSection);
    };
  });

  // Add the add potion button at the end of the list of rendered potions
  buttonFactory.createAndAppendButton('Add Potion', 'add-item-button', contentSection, () => renderAddForm());
}

/**
 * Renders the edit potion form by clearing the main content area, creating a dynamic panel, and injecting the edit form for the
 * specified potion into that panel.
 *
 * @param {Object} potion - The potion object to edit.
 * @returns {void}
 */
async function renderEditForm(potion) {
  baseView.refresh();
  const panel = baseView.renderDynamicPanel(baseView.getMainContent());

  potionEditForm.createEditPotionForm(potion, panel.content);
}

/**
 * Render the confirm delete modal window. If the user confirms the action, a DELETE request with the potion's id is sent to the
 * backend. Once the confirm takes place, the potion list is re-rendered by calling displayAllPotions again.
 * 
 * @param {Object} potion - The potion object.
 * @param {HTMLElement} contentSection - The parent HTML element for the results section.
 * @returns {void}
 */
function showConfirmDeleteModal(potion, contentSection) {
  const confirmModal = modalRenderer.renderGlobalModal();

  confirmModal.windowTitle.textContent = 'Confirm Delete';
  confirmModal.windowText.textContent = `Delete ${potion.name} from the shop?`;

  confirmModal.mainButton.textContent = 'Delete';
  confirmModal.mainButton.onclick = async function () {
    try {
      await potionActions.deletePotion(potion.id);
    } catch (message) {
      console.error(message);
    }

    // Refresh the updated list after deletion
    contentSection.innerHTML = '';
    displayPotions(contentSection);
  };

  // Add the cancel button
  const cancelButton = buttonFactory.createAndAppendButton('Cancel', 'modal-button', confirmModal.buttonContainer, () => {
    confirmModal.root.remove();
  });
}

function renderAddForm() {
  baseView.refresh();
  const mainContent = baseView.getMainContent();
  const panel = baseView.renderDynamicPanel(mainContent);

  potionAddForm.createAddPotionForm(panel.content, 3);
}
