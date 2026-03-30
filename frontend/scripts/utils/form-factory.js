import * as elementFactory from './element-factory.js';

export function addForm(parentElement) {
  const formContainer = elementFactory.createAndAppendElement('div', 'add-form-container', parentElement);
  const test = elementFactory.createAndAppendElement('p', null, formContainer);
  test.textContent = "This is where the form will go.";
}