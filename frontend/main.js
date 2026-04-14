import * as panel from './scripts/ui/shared/base-panel.js?v=3';
import { showPotionsPanel } from './scripts/ui/potions/potion-panel.js';
import { showIngredientsPanel } from './scripts/ui/ingredients/ingredient-panel.js';

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
  // will be generated via base-panel.js in scripts/ui/shared
  panel.showEmptyPanel();
}
