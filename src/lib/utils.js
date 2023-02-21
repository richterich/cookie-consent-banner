/**
 * Creates HTML element
 * @param {string} tagName HTML tag name
 * @returns {HTMLElement} New HTML Element
*/
export const createNode = tagName => {
  const element = document.createElement(tagName)
  if (tagName === 'button') {
    element.setAttribute('type', tagName)
  }
  return element
}

/**
 * Returns all elements with given data-cc role
 * @param {string} role consent data role
 * @returns {NodeListOf<Element>}
 */
export const getElements = role => {
  return document.querySelectorAll('a[data-cc="' + role + '"], button[data-cc="' + role + '"]')
}
