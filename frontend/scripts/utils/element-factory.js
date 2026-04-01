/**
 * Applies one or more CSS classes to a DOM element.
 *
 * @param {HTMLElement} element - The DOM element to apply classes to
 * @param {string|string[]|null} classes - A class name, an array of class names, or null
 * @returns {HTMLElement} The same element, returned for optional chaining
 */
export function applyClasses(element, classes) {
  if (classes === null) {
    return element;
  }

  if (Array.isArray(classes)) {
    classes.forEach(c => {
      element.classList.add(c);
    });
  } else {
    element.classList.add(classes);
  }

  return element;
}

/**
 * Creates a DOM element with optional CSS classes applied.
 *
 * @param {string} tag - The HTML tag name to create (e.g., 'div', 'p', 'section')
 * @param {string|string[]|null} classes - A single class name, an array of class names, or null if no classes 
 *                                         should be applied
 * @returns {HTMLElement} The newly created DOM element
 */
export function createElement(tag, classes) {
  const element = document.createElement(tag);
  return applyClasses(element, classes);
}

/**
 * Creates a DOM element, applies optional CSS classes, and appends it to a parent element.
 *
 * @param {string} tag - The HTML tag name to create
 * @param {string|string[]|null} classes - A single class name, an array of class names, or null if no classes 
 *                                         should be applied
 * @param {HTMLElement} parent - The parent element to append the new element to
 * @returns {HTMLElement} The appended DOM element
 */
export function createAndAppendElement(tag, classes, parent) {
  const element = createElement(tag, classes);
  return parent.appendChild(element);
}

/**
 * Creates the base structure for a dropdown component, which is a wrapper <div> with a <select> element inside.
 *
 * @param {string|string[]|null} divClasses - Classes to apply to the wrapper <div>
 * @param {string|string[]|null} selectClasses - Classes to apply to the <select> element
 * @returns {{root: HTMLElement, selection: HTMLSelectElement}}
 *          An object containing the wrapper element (`root`) and the
 *          <select> element (`selection`)
 */
export function createDropdownShell(divClasses, selectClasses) {
  const dropdown = document.createElement('div');

  // Add any classes to the div, which acts as the parent container to the dropdown
  applyClasses(dropdown, divClasses)
  const select = createAndAppendElement('select', selectClasses, dropdown);

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
 *          The same object returned by `createDropdownShell`, containing
 *          both the wrapper and the <select> element
 */
export function createAndAppendDropdownShell(divClasses, selectClasses, parent) {
  const dropdownObject = createDropdownShell(divClasses, selectClasses);
  parent.appendChild(dropdownObject.root);
  return dropdownObject;
}