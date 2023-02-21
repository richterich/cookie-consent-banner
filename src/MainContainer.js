import { createNode, getElements } from './lib/utils'
import { ConsentModal } from './ConsentModal'
import { SettingsModal } from './SettingsModal'
import { CategoriesStorage } from './CategoriesStorage'

/** @typedef {import('./ConsentModal').ConsentText} ConsentText */
/** @typedef {import('./SettingsModal').SettingsText} SettingsText */

/**
 * Main config of the cookie consent banner.
 * Contains both {@link ConsentText|Modal Consent Banner}, and {@link SettingsText|Modal Settings Dialog} configurations
 * @typedef {Object} MainConfig
 * @property {ConsentText} consent
 * @property {SettingsText} settings
 */

/**
 * Callback interface to handle consent banner event
 * @callback ConsentEvent
 * @param {Array<string>} acceptedCategories
 * @returns {void}
 */

/**
 * Set of callbacks to handle consent banner event
 * @typedef {Object} Delegates
 * @property {ConsentEvent} acceptAll
 * @property {ConsentEvent} rejectAll
 * @property {ConsentEvent} applySettings
 */

/**
 * @class `MainContainer` which represents a container to hold both consent banner and settings dialog
 */
export class MainContainer {
  /**
   * Creates `MainContainer` instance to work with both consent banner and settings diaolg
   * @param {HTMLElement} parent Parent HTML Element
   * @param {MainConfig} config Main config contains both consent & settings texts
   * @param {Delegates} delegates Functions to handle consent banner events such as 'accept all', 'reject all' & 'apply settings'
   */
  constructor (parent, config, delegates) {
    this.children = new Map()
    this.container = createNode('div')
    this.container.id = 'cc--main'
    this.container.style.position = 'fixed'
    this.container.style.zIndex = '2147483647'
    this.container.classList.add('c--anim')
    this.modals = createNode('div')
    this.modals.id = 'cc_div'
    this.modals.classList.add('cc_div')
    this.container.appendChild(this.modals)
    parent?.appendChild(this.container)
    this.storage = new CategoriesStorage()
    this.children.set('consent', new ConsentModal(this.modals, config.consent, this.storage))
    this.children.set('settings', new SettingsModal(this.modals, config.settings, this.storage))
    this.acceptAll = delegates.acceptAll
    this.rejectAll = delegates.rejectAll
    this.applySettings = delegates.applySettings
  }

  /** @type {HTMLElement} */
  container
  /** @type {HTMLElement} */
  modals
  /** @type {Map<string, any>} */
  children
  /** @type {CategoriesStorage} */
  storage
  /** @type {ConsentEvent} */
  acceptAll
  /** @type {ConsentEvent} */
  rejectAll
  /** @type {ConsentEvent} */
  applySettings

  /**
   * Shows the cookie consent banner
   * @param {number} delay delay in milliseconds
   * @returns {void}
   */
  showConsent (delay = 0) {
    const timeout = setTimeout(() => {
      this.children.get('consent').show()
      clearTimeout(timeout)
    }, delay)
  }

  /**
   * Subscribes for consent banner events
   * @returns {void}
   */
  subscribeListeners () {
    /** @type {ConsentModal} */
    const consentModal = this.children.get('consent')
    /** @type {SettingsModal} */
    const settingsModal = this.children.get('settings')
    // Buttons to show settings dialog
    const settingsButtonList = getElements('c-settings')
    for (let i = 0; i < settingsButtonList.length; ++i) {
      settingsButtonList[i].setAttribute('aria-haspopup', 'dialog')
      settingsButtonList[i].addEventListener('click', () => {
        settingsModal.show()
      })
    }
    // Buttons on consent dialog
    consentModal.primaryButton.addEventListener('click', () => {
      consentModal.hide()
      const categories = settingsModal.allCategories()
      this.storage.set(categories)
      this.acceptAll(categories)
    })
    consentModal.secondaryButton.addEventListener('click', () => {
      consentModal.hide()
      const categories = settingsModal.necessaryCategories()
      this.storage.set(categories)
      this.rejectAll(categories)
    })
    // Buttons on settings dialog
    settingsModal.primaryButton.addEventListener('click', () => {
      settingsModal.hide()
      consentModal.hide()
      const categories = settingsModal.allCategories()
      this.storage.set(categories)
      this.acceptAll(categories)
    })
    settingsModal.secondaryButton.addEventListener('click', () => {
      settingsModal.hide()
      consentModal.hide()
      const categories = settingsModal.necessaryCategories()
      this.storage.set(categories)
      this.rejectAll(categories)
    })
    settingsModal.saveButton.addEventListener('click', () => {
      settingsModal.hide()
      consentModal.hide()
      const categories = settingsModal.acceptedCategories()
      this.storage.set(categories)
      this.applySettings(categories)
    })
    settingsModal.closeButton.addEventListener('click', () => {
      settingsModal.hide()
    })
  }
}
