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

  return element
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