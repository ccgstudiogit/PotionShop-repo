import { clearAndGenerateSections } from "./panel.js";
import * as buttonFactory from '../utils/button-factory.js';
import * as elementFactory from '../utils/element-factory.js';
import * as potionActions from '../actions/potion-actions.js';

/**
 * Clear the current panel and display the potions panel.
 */
export function showPotionsPanel() {
  const [panel, options, results] = clearAndGenerateSections();
  generateOptionsButtons(options);
  //testResults(results);
}

/**
 * Generates the options buttons for the potions panel.
 * 
 * @param {HTMLElement} optionsSection The parent HTML element for the options section.
 */
function generateOptionsButtons(optionsSection) {
  buttonFactory.createAndAppendButton('Get Potions', 'option-button', optionsSection, () => {
    potionActions.getAllPotions();
  });
  
  buttonFactory.createAndAppendButton('Add Potion', 'option-button', optionsSection, () => {console.log('clicked!')});
  buttonFactory.createAndAppendButton('Search', 'option-button', optionsSection, () => {console.log('clicked!')});
  buttonFactory.createAndAppendButton('Extra Button', 'option-button', optionsSection, () => {console.log('clicked!')});
}

function testResults(resultsSection) {
  const div1 = elementFactory.createAndAppendElement('div', 'result-item', resultsSection);
  div1.textContent = "Test Potion";
  const div2 = elementFactory.createAndAppendElement('div', 'result-item', resultsSection);
  div2.textContent = "Another Potion";
  const div3 = elementFactory.createAndAppendElement('div', 'result-item', resultsSection);
  div3.textContent = "Yet Another Potion";
  const div4 = elementFactory.createAndAppendElement('div', 'result-item', resultsSection);
  div4.textContent = "Final Potion"
  
  const div5 = elementFactory.createAndAppendElement('div', 'result-item', resultsSection);
  div5.textContent = "Last Potion";
  const div6 = elementFactory.createAndAppendElement('div', 'result-item', resultsSection);
  div6.textContent = "One More Potion";
  const div7 = elementFactory.createAndAppendElement('div', 'result-item', resultsSection);
  div7.textContent = "Potion Potion";
  
}