import { clearAndGenerateSections } from "./panel.js";
import * as buttonFactory from '../utils/button-factory.js';

/**
 * Clear the current panel and display the potions panel.
 */
export function showPotionsPanel() {
  const [panel, options, results] = clearAndGenerateSections();
  createOptions(options);
}

function createOptions(optionsSection) {
  buttonFactory.generateButton("Test", null, optionsSection, () => {console.log('clicked!')});
  buttonFactory.generateButton("Meow", null, optionsSection, () => {console.log('clicked!')});
  buttonFactory.generateButton("Woof", null, optionsSection, () => {console.log('clicked!')});
  buttonFactory.generateButton("HELLO THERE. GENERAL KENOBI", null, optionsSection, () => {console.log('clicked!')});
}