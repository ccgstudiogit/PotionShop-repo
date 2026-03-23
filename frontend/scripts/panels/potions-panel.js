import { clearAndGenerateSections } from "./panel.js";
import * as buttonFactory from '../utils/button-factory.js';

/**
 * Clear the current panel and display the potions panel.
 */
export function showPotionsPanel() {
  const [panel, options, results] = clearAndGenerateSections();
  generateOptionsButtons(options);
}

/**
 * Generates the options buttons for the potions panel.
 * 
 * @param {HTMLElement} optionsSection The parent HTML element for the options section.
 */
function generateOptionsButtons(optionsSection) {
  // optionsSection is the parent html element
  buttonFactory.generateButton("Get Potions", 'option-button', optionsSection, () => {console.log('clicked!')});
  buttonFactory.generateButton("Add Potion", 'option-button', optionsSection, () => {console.log('clicked!')});
  buttonFactory.generateButton("Search", 'option-button', optionsSection, () => {console.log('clicked!')});
  buttonFactory.generateButton("Extra Button", 'option-button', optionsSection, () => {console.log('clicked!')});
}