import { CategoriesStorage } from './CategoriesStorage'
import { createNode } from './lib/utils'

/**
 * Displayed text on the modal consent banner
 * @typedef {Object} ConsentText
 * @property {string} title
 * @property {string} description
 * @property {string} primaryButton
 * @property {string} secondaryButton
 * @property {string} settingsButton
 */

/**
 * @class `ConsentModal` represents a cookie consent banner
 */
export class ConsentModal {
  /**
   * Creates `ConsentModal` instance to work with a modal consent banner
   * @param {HTMLElement} parent Parent HTML Element
   * @param {ConsentText} text Displayed text on the modal consent banner
   * @param {CategoriesStorage} storage Storage of the allowed user categories
   */
  constructor (parent, text, storage) {
    this.storage = storage
    this.container = createNode('div')
    this.container.id = 'cm'
    this.container.setAttribute('role', 'dialog')
    this.container.setAttribute('aria-modal', 'true')
    this.container.setAttribute('aria-hidden', 'true')
    this.container.setAttribute('aria-labelledby', 'c-ttl')
    this.container.setAttribute('aria-describedby', 'c-txt')
    this.container.classList.add('bar', 'bottom', 'center', 'slide')
    this.container.style.visibility = 'hidden'
    this.inner = createNode('div')
    this.inner.id = 'c-inr-i'
    this.overlay = createNode('div')
    this.overlay.id = 'cm-ov'
    this.overlay.style.visibility = 'hidden'
    this.overlay.style.opacity = '0'
    this.title = createNode('div')
    this.title.id = 'c-ttl'
    this.title.setAttribute('role', 'heading')
    this.title.setAttribute('aria-level', '2')
    this.title.innerText = text.title
    this.description = createNode('div')
    this.description.id = 'c-txt'
    this.description.innerHTML = text.description
    this.primaryButton = createNode('button')
    this.primaryButton.id = 'c-p-bn'
    this.primaryButton.className = 'c-bn'
    this.primaryButton.innerText = text.primaryButton
    this.secondaryButton = createNode('button')
    this.secondaryButton.id = 'c-s-bn'
    this.secondaryButton.className = 'c-bn c_link'
    this.secondaryButton.innerText = text.secondaryButton
    this.settingsButton = createNode('button')
    this.settingsButton.id = 'c-s-bn'
    this.settingsButton.className = 'c-bn c_link'
    this.settingsButton.innerText = text.settingsButton
    this.settingsButton.setAttribute('data-cc', 'c-settings')
    this.settingsButton.setAttribute('aria-haspopup', 'dialog')
    this.innerContainer = createNode('div')
    this.innerContainer.id = 'c-inr'
    this.buttons = createNode('div')
    this.buttons.id = 'c-bns'
    this.buttons.appendChild(this.primaryButton)
    this.buttons.appendChild(this.secondaryButton)
    this.buttons.appendChild(this.settingsButton)
    this.inner.appendChild(this.title)
    this.inner.appendChild(this.description)
    this.innerContainer.appendChild(this.inner)
    this.innerContainer.appendChild(this.buttons)
    this.container.appendChild(this.innerContainer)
    parent?.appendChild(this.container)
    parent?.appendChild(this.overlay)
  }

  /** @type {HTMLElement} */
  container
  /** @type {HTMLElement} */
  innerContainer
  /** @type {HTMLElement} */
  inner
  /** @type {HTMLElement} */
  overlay
  /** @type {HTMLElement} */
  title
  /** @type {HTMLElement} */
  description
  /** @type {HTMLElement} */
  primaryButton
  /** @type {HTMLElement} */
  secondaryButton
  /** @type {HTMLElement} */
  settingsButton
  /** @type {HTMLElement} */
  buttons
  /** @type {CategoriesStorage} */
  storage

  /**
   * Shows a modal consent banner
   * @returns {void}
   */
  show () {
    if (CategoriesStorage.noConsent(this.storage)) {
      document.documentElement.classList.add('show--consent')
      this.container.setAttribute('aria-hidden', 'false')
      this.description.scrollTop = 0
    }
  }

  /**
   * Hides a modal consent banner
   * @returns {void}
   */
  hide () {
    document.documentElement.classList.remove('show--consent')
    this.container.setAttribute('aria-hidden', 'true')
  }
}
