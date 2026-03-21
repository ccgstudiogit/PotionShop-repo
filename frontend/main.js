import * as panel from './scripts/panels/panel.js';

startApp();

function startApp() {
  panel.createPanelBackground();

  const potionsButton = document.getElementById('potions-button');
  potionsButton.addEventListener('click', () => {
    //panel.generatePanel(panel.Type.POTIONS);
  });

  const ingredientsButton = document.getElementById('ingredients-button');
  ingredientsButton.addEventListener('click', () => {
    //panel.generatePanel(panel.Type.INGREDIENTS);
  });

  // Generate an empty panel to start off with. Once the user clicks one of the options, the panel for that option
  // will be generated via panel.js
  panel.emptyPanel();
}
