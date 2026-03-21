import * as panel from './scripts/panels/panel.js';

startApp();

function startApp() {
  const potionsButton = document.getElementById('potions-button');
  potionsButton.addEventListener('click', () => {
    alert("potions!");
  });

  const ingredientsButton = document.getElementById('ingredients-button');
  ingredientsButton.addEventListener('click', () => {
    alert("ingredients!");
  });

  panel.generatePanel(panel.Type.EMPTY);
}
