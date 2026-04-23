import * as baseView from '../shared/base-view.js';
import * as searchViewUtils from '../shared/search-view-utils.js';
import * as elementFactory from '../../utils/element-factory.js';
import * as buttonFactory from '../../utils/button-factory.js';
import * as potionActions from '../../actions/potion-actions.js';

export function renderSearchPanel() {
  const mainContent = baseView.getMainContent();
  const searchPanel = baseView.renderBaseSearchPanel(mainContent);

  renderSearchFields(searchPanel.searchFieldsContainer);
}

async function renderSearchFields(searchPanel) {
  const searchByNameInput = searchViewUtils.createSearchBar('Search potions by name...', searchPanel);

  try {
    const typeDropdown = searchViewUtils.createEmptyDropdownFilter(searchPanel);
    typeDropdown.title.textContent = 'Type(s):';
    typeDropdown.dropdownSelection.multiple = true; // Users must use 'CTRL' + click to select multiple options
    typeDropdown.dropdownSelection.size = 4;

    const multiSelectTip = elementFactory.createAndAppendElement('p', ['search-panel-tip-text', 'font-jersey'], typeDropdown.root);
    multiSelectTip.textContent = '(hold CTRL to select multiple)';

    // Default option
    const anyOption = elementFactory.createAndAppendElement('option', null, typeDropdown.dropdownSelection);
    anyOption.value = 'Any';
    anyOption.textContent = 'Any';

    const potionTypes = await potionActions.getPotionTypes();
    potionTypes.forEach(type => {
      const option = elementFactory.createAndAppendElement('option', null, typeDropdown.dropdownSelection);
      option.value = type;
      option.textContent = type;
    });
  } catch (message) {
    console.error(message);
  }

  const searchButton = searchViewUtils.createSearchButton(searchPanel);
  searchButton.addEventListener('click', () => {
    console.log('searching!');
  });
}
