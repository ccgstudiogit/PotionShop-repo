import * as potionsView from './scripts/ui/potions/potions-view.js';
import * as ingredientsView from './scripts/ui/ingredients/ingredients-view.js';

startApp();

function startApp() {
  potionsView.renderPotionsView();

  const potionsButton = document.getElementById('potions-button');
  potionsButton.addEventListener('click', () => {
    potionsView.renderPotionsView();
  });

  const ingredientsButton = document.getElementById('ingredients-button');
  ingredientsButton.addEventListener('click', () => {
    ingredientsView.renderIngredientsView();
  });
}
