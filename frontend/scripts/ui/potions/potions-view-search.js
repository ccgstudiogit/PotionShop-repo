import * as baseView from '../shared/base-view.js';
import * as searchViewUtils from '../shared/search-view-utils.js';
import * as elementFactory from '../../utils/element-factory.js';
import * as buttonFactory from '../../utils/button-factory.js';
import * as potionActions from '../../actions/potion-actions.js';
import * as resultsView from './potions-view-results.js';

export function renderSearchPanel() {
  const mainContent = baseView.getMainContent();
  const searchPanel = baseView.renderBaseSearchPanel(mainContent);

  renderSearchFields(searchPanel.searchFieldsContainer);
}

async function renderSearchFields(searchPanel) {
  try {
    // Searching by name field
    const nameInput = searchViewUtils.createSearchBar('Search potions by name...', searchPanel);

    // Selecting by types
    const typeDropdown = searchViewUtils.createEmptyDropdownFilter(searchPanel);
    typeDropdown.title.textContent = 'Type(s):';
    typeDropdown.dropdownSelection.multiple = true; // Users must use 'CTRL' + click to select multiple options
    typeDropdown.dropdownSelection.size = 4;

    const multiSelectTip = elementFactory.createAndAppendElement('p', ['search-panel-tip-text', 'font-jersey'], typeDropdown.root);
    multiSelectTip.textContent = '(hold CTRL to select multiple)';

    const potionTypes = await potionActions.getPotionTypes();
    potionTypes.forEach(type => {
      const option = elementFactory.createAndAppendElement('option', null, typeDropdown.dropdownSelection);
      option.value = type;
      option.textContent = type;
    });

    const searchButton = searchViewUtils.createSearchButton(searchPanel);
    searchButton.addEventListener('click', async () => {
      searchButton.disabled = true;
      await search(nameInput, typeDropdown);
      searchButton.disabled = false;
    });
  } catch (message) {
    console.error(message);
  }
}

async function search(nameInput, typeDropdown) {
  const name = nameInput.input.value;

  const types = [];
  for (let i = 0; i < typeDropdown.dropdownSelection.options.length; i++) {
    const type = typeDropdown.dropdownSelection.options[i];
    if (type.selected) {
      types.push(type.value);
    }
  }

  try {
    const potions = await potionActions.getPotionsWithFilters(name, types);
    const sorted = [...potions].sort((a, b) => a.name.localeCompare(b.name));
    resultsView.renderPotions(sorted);
  } catch (message) {
    console.error(message);
  }
}
