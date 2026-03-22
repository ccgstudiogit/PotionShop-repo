import * as panel from './scripts/panels/panel.js';
import { showPotionsPanel } from './scripts/panels/potions-panel.js';
import { showIngredientsPanel } from './scripts/panels/ingredients-panel.js';

startApp();

function startApp() {
  panel.createPanelBackground();

  const potionsButton = document.getElementById('potions-button');
  potionsButton.addEventListener('click', () => {
    showPotionsPanel();
  });

  const ingredientsButton = document.getElementById('ingredients-button');
  ingredientsButton.addEventListener('click', () => {
    showIngredientsPanel();
  });

  // Generate an empty panel to start off with. Once the user clicks one of the options, the panel for that option
  // will be generated via panel.js
  panel.showEmptyPanel();
}
