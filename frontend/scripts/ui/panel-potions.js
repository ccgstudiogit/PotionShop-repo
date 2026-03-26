import { clearAndGenerateSections } from "./panel.js";
import * as buttonFactory from '../utils/button-factory.js';
import * as elementFactory from '../utils/element-factory.js';
import * as potionActions from '../actions/potion-actions.js';

/**
 * Clear the current panel and display the potions panel.
 */
export function showPotionsPanel() {
  const [panel, options, results] = clearAndGenerateSections();

  // results section is passed in as an argument to the functions that generate the options buttons so that when the buttons are clicked,
  // the buttons can manipulate the results section to display the output of the respective button's function
  generateAndLinkOptionsButtons(options, results);
}

/**
 * Generates the options buttons for the potions panel and links them to their respective functions so the output is displayed in results.
 * 
 * @param {HTMLElement} optionsSection The parent HTML element for the options section.
 * @param {HTMLElement} resultsSection The parent HTML element for the results section.
 */
function generateAndLinkOptionsButtons(optionsSection, resultsSection) {
  buttonFactory.createAndAppendButton('Get Potions', 'option-button', optionsSection, () => {
    displayAllPotions(resultsSection);
  });

  buttonFactory.createAndAppendButton('Add Potion', 'option-button', optionsSection, () => {console.log('clicked!')});
  buttonFactory.createAndAppendButton('Search', 'option-button', optionsSection, () => {console.log('clicked!')});
  buttonFactory.createAndAppendButton('Extra Button', 'option-button', optionsSection, () => {console.log('clicked!')});
}

/**
 * Displays all potions in the results section.
 * 
 * @param {HTMLElement} resultsSection The parent HTML element for the results section.
 */
async function displayAllPotions(resultsSection) {
  // Clear the results section before displaying the new results
  resultsSection.innerHTML = '';

  // Fetch the potions from the backend via the actions layer, which calls the API layer
  const potions = await potionActions.getAllPotions();

  if (potions) {
    potions.forEach(potion => {
      // The parent containers
      const parentContainer = elementFactory.createAndAppendElement('div', 'item', resultsSection);
      const displayContainer = elementFactory.createAndAppendElement('div', 'item-display', parentContainer);

      // For displaying a potion's ingredients
      const extra = elementFactory.createAndAppendElement('div', 'item-extra', parentContainer);

      // Potion image
      const image = elementFactory.createAndAppendElement('img', 'item-icon', displayContainer);
      image.src = '../icons/test-icon.png';

      // Potion info, including name, type, effect, etc.
      const infoContainer = elementFactory.createAndAppendElement('div', 'item-info', displayContainer);

      // Potion name, type, and cost
      const infoHeader = elementFactory.createAndAppendElement('p', 'item-info-header', infoContainer);
      const potionName = elementFactory.createAndAppendElement('p', ['potion-name', 'font-jersey'], infoHeader);
      potionName.textContent = potion.name;
      const potionType = elementFactory.createAndAppendElement('p', ['potion-type', 'font-jersey'], infoHeader);
      potionType.textContent = potion.type;
      const infoPriceContainer = elementFactory.createAndAppendElement('div', 'potion-price-container', infoHeader);
      const infoPriceIcon = elementFactory.createAndAppendElement('img', 'potion-price-icon', infoPriceContainer);
      infoPriceIcon.src = '../icons/coin-icon.png';
      const potionPrice = elementFactory.createAndAppendElement('p', ['potion-price', 'font-jersey'], infoPriceContainer);
      potionPrice.textContent = potion.price;

      // Potion effect
      const infoBody = elementFactory.createAndAppendElement('div', 'item-info-body', infoContainer);
      const potionEffect = elementFactory.createAndAppendElement('p', ['potion-effect', 'font-jersey'], infoBody);
      potionEffect.textContent = potion.effect;
    });
  }
}
