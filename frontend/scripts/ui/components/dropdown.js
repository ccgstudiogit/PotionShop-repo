import * as elementFactory from '../../utils/element-factory.js';

/**
 * Creates the base structure for a dropdown component, which is a wrapper <div> with a <select> element inside.
 *
 * @param {string|string[]|null} divClasses - Classes to apply to the wrapper <div>
 * @param {string|string[]|null} selectClasses - Classes to apply to the <select> element
 * @returns {{root: HTMLElement, selection: HTMLSelectElement}}
 *          An object containing the wrapper element (`root`) and the <select> element (`selection`)
 */
export function createDropdownShell(divClasses, selectClasses) {
  const dropdown = document.createElement('div');

  // Add any classes to the div, which acts as the parent container to the dropdown
  elementFactory.applyClasses(dropdown, divClasses)
  const select = elementFactory.createAndAppendElement('select', selectClasses, dropdown);

  return {
    root: dropdown,
    selection: select
  }
}

/**
 * Creates a dropdown shell and appends it to a parent element. This is a convenience wrapper around `createDropdownShell`
 * that automatically inserts the constructed dropdown into the DOM.
 *
 * @param {string|string[]|null} divClasses - Classes to apply to the wrapper <div>
 * @param {string|string[]|null} selectClasses - Classes to apply to the <select> element
 * @param {HTMLElement} parent - The parent element to append the dropdown to
 * @returns {{root: HTMLElement, selection: HTMLSelectElement}}
 *          The same object returned by `createDropdownShell`, containing both the wrapper and the <select> element
 */
export function createAndAppendDropdownShell(divClasses, selectClasses, parent) {
  const dropdownObject = createDropdownShell(divClasses, selectClasses);
  parent.appendChild(dropdownObject.root);
  return dropdownObject;
}