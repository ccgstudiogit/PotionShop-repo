import * as potionsView from './scripts/ui/potions/potions-view.js';
import * as ingredientsView from './scripts/ui/ingredients/ingredients-view.js';

startApp();

function startApp() {
  const mainContent = document.getElementById('main-content')
  potionsView.renderPotionsView(mainContent);

  const potionsButton = document.getElementById('potions-button');
  potionsButton.addEventListener('click', () => {
    potionsView.renderPotionsView(mainContent);
  });

  const ingredientsButton = document.getElementById('ingredients-button');
  ingredientsButton.addEventListener('click', () => {
    ingredientsView.renderIngredientsView(mainContent);
  });
}
