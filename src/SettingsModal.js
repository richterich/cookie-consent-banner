import { createNode } from './lib/utils'

/** @typedef {import('./CategoriesStorage').CategoriesStorage} CategoriesStorage */

/**
 * HTML controls of the specific cookie category
 * @typedef {Object} HTMLCategory
 * @property {HTMLElement} expandableBlock
 * @property {HTMLElement} categorySwitcher
 */

/**
 * Description of a particular cookie.
 * It is also used as the header's name in the cookie table
 * @typedef {Object} CookieInfo
 * @property {string} name
 * @property {string} provider
 * @property {string} purpose
 * @property {string} retantion
 */

/**
 * Toggle information of a block.
 * It uses to specify the default settings of a specific category of cookies
 * @typedef {Object} ToggleBlock
 * @property {string} value
 * @property {boolean} enabled
 * @property {boolean} readonly
 */

/**
 * Displayed text on the special settings block.
 * It also contains additional information about the block,
 * such as {@link ToggleBlock|Toggle information of the block}, and {@link CookieInfo|Detailed cookie description}
 * @typedef {Object} SettingsBlocks
 * @property {string} title
 * @property {string} description
 * @property {ToggleBlock} [toggle]
 * @property {Array<CookieInfo>} [cookieTable]
 */

/**
 * Displayed text on the modal cookies settings dialog
 * @typedef {Object} SettingsText
 * @property {string} title
 * @property {string} primaryButton
 * @property {string} secondaryButton
 * @property {string} saveButton
 * @property {string} closeButton
 * @property {CookieInfo} cookieTableHeaders
 * @property {Array<SettingsBlocks>} blocks
 */

/**
 * @class `SettingsModal` represents a modal cookies settings dialog
 */
export class SettingsModal {
  /**
   * Creates `SettingsModal` instance to work with a modal cookies settings dialog
   * @param {HTMLElement} parent Parent HTML Element
   * @param {SettingsText} text Displayed text on the modal cookies settings dialog
   * @param {CategoriesStorage} storage Storage of the allowed user categories
   */
  constructor (parent, text, storage) {
    this.storage = storage
    this.container = createNode('div')
    this.container.id = 's-cnt'
    this.container.setAttribute('role', 'dialog')
    this.container.setAttribute('aria-modal', 'true')
    this.container.setAttribute('aria-hidden', 'true')
    this.container.setAttribute('aria-labelledby', 's-ttl')
    this.valign = createNode('div')
    this.valign.id = 'c-vln'
    this.settings = createNode('div')
    this.settings.id = 'cs'
    this.innerContainer = createNode('div')
    this.innerContainer.id = 'c-s-in'
    this.inner = createNode('div')
    this.inner.id = 's-inr'
    this.inner.className = 'bns-t'
    this.title = createNode('div')
    this.title.id = 's-ttl'
    this.title.setAttribute('role', 'heading')
    this.title.innerText = text.title
    this.header = createNode('div')
    this.header.id = 's-hdr'
    this.closeButtonContainer = createNode('div')
    this.closeButtonContainer.id = 's-c-bnc'
    this.closeButton = createNode('button')
    this.closeButton.id = 's-c-bn'
    this.closeButton.setAttribute('aria-label', text.closeButton)
    this.closeButton.className = 'c-bn'
    this.blocks = createNode('div')
    this.blocks.id = 's-bl'
    this.categories = new Map()
    for (let i = 0; i < text.blocks.length; ++i) {
      const title = text.blocks[i].title
      const description = text.blocks[i].description
      const toggle = text.blocks[i].toggle
      const cookieTable = text.blocks[i].cookieTable || []
      const htmlSection = createNode('div')
      htmlSection.className = 'c-bl'
      const htmlTable = createNode('div')
      htmlTable.className = 'desc'
      const htmlTitle = createNode('div')
      htmlTitle.className = 'title'
      const htmlDescription = createNode('div')
      htmlDescription.className = 'p'
      htmlDescription.insertAdjacentHTML('beforeend', description)

      if (toggle) {
        const accordionId = 'c-ac-' + i
        const titleButton = createNode('button')
        const switchLabel = createNode('label')
        const blockSwitch = createNode('input')
        const switchSpan = createNode('span')
        const labelText = createNode('span')
        const switchOnIcon = createNode('span')
        const switchOffIcon = createNode('span')

        titleButton.className = 'b-tl exp'
        switchLabel.className = 'b-tg'
        blockSwitch.className = 'c-tgl'
        switchOnIcon.className = 'on-i'
        switchOffIcon.className = 'off-i'
        switchSpan.className = 'c-tg'
        labelText.className = 't-lb'

        titleButton.setAttribute('aria-expanded', 'false')
        titleButton.setAttribute('aria-controls', accordionId)

        blockSwitch.setAttribute('type', 'checkbox')
        blockSwitch.setAttribute('value', toggle.value)
        switchSpan.setAttribute('aria-hidden', 'true')

        labelText.textContent = title
        titleButton.insertAdjacentHTML('beforeend', title)

        htmlTitle.appendChild(titleButton)
        switchSpan.appendChild(switchOnIcon)
        switchSpan.appendChild(switchOffIcon)

        if (toggle.readonly) {
          switchSpan.classList.add('c-ro')
          blockSwitch.setAttribute('disabled', '')
        }
        // @ts-ignore
        if (toggle.enabled) blockSwitch.checked = true
        const necessary = toggle.readonly && toggle.enabled
        blockSwitch.dataset.necessary = necessary ? 'true' : 'false'

        htmlTable.classList.add('b-acc')
        htmlTitle.classList.add('b-bn')
        htmlSection.classList.add('b-ex')

        htmlTable.id = accordionId
        htmlTable.setAttribute('aria-hidden', 'true')

        switchLabel.appendChild(blockSwitch)
        switchLabel.appendChild(switchSpan)
        switchLabel.appendChild(labelText)
        titleButton.appendChild(switchLabel)

        titleButton.addEventListener('click', e => {
          // @ts-ignore
          if (e.target?.classList.contains('exp')) {
            htmlSection.classList.toggle('act')
            titleButton.setAttribute('aria-expanded', `${htmlSection.classList.contains('act')}`)
            htmlTable.setAttribute('aria-hidden', `${!htmlSection.classList.contains('act')}`)
          }
        })
        htmlTable.appendChild(htmlDescription)

        const fragment = document.createDocumentFragment()
        const headers = Object.keys(text.cookieTableHeaders)
        for (let h = 0; h < headers.length; ++h) {
          const headerName = headers[h]
          const tableHeader = createNode('th')
          tableHeader.setAttribute('scope', 'col')
          // @ts-ignore
          tableHeader.textContent = text.cookieTableHeaders[headerName]
          fragment.appendChild(tableHeader)
        }

        const headRow = createNode('tr')
        headRow.appendChild(fragment)

        const tableHead = createNode('thead')
        tableHead.appendChild(headRow)

        const blockTable = createNode('table')
        blockTable.appendChild(tableHead)

        const tableBody = document.createDocumentFragment()
        for (let c = 0; c < cookieTable.length; ++c) {
          const tableRow = createNode('tr')
          for (let h = 0; h < headers.length; ++h) {
            const headerName = headers[h]
            const tableData = createNode('td')
            // @ts-ignore
            tableData.insertAdjacentText('beforeend', cookieTable[c][headerName])
            // @ts-ignore
            tableData.setAttribute('data-column', text.cookieTableHeaders[headerName])
            tableRow.appendChild(tableData)
          }
          tableBody.appendChild(tableRow)
        }
        const tbody = createNode('tbody')
        tbody.appendChild(tableBody)
        blockTable.appendChild(tbody)
        htmlTable.appendChild(blockTable)
        const categoryControls = { expandableBlock: htmlSection, categorySwitcher: blockSwitch }
        this.categories.set(toggle.value, categoryControls)
      } else {
        const blockTitle = createNode('div')
        blockTitle.className = 'b-tl'
        blockTitle.setAttribute('role', 'heading')
        blockTitle.setAttribute('aria-level', '3')
        blockTitle.insertAdjacentHTML('beforeend', title)
        htmlTitle.appendChild(blockTitle)
        htmlTable.appendChild(htmlDescription)
        htmlSection.classList.add('bl')
      }
      htmlSection.appendChild(htmlTitle)
      htmlSection.appendChild(htmlTable)
      this.blocks.appendChild(htmlSection)
    }
    this.buttons = createNode('div')
    this.buttons.id = 's-bns'
    this.primaryButton = createNode('button')
    this.primaryButton.id = 's-all-bn'
    this.primaryButton.className = 'c-bn'
    this.primaryButton.innerText = text.primaryButton
    this.secondaryButton = createNode('button')
    this.secondaryButton.id = 's-rall-bn'
    this.secondaryButton.className = 'c-bn'
    this.secondaryButton.innerText = text.secondaryButton
    this.saveButton = createNode('button')
    this.saveButton.id = 's-sv-bn'
    this.saveButton.className = 'c-bn'
    this.saveButton.innerText = text.saveButton
    this.overlay = createNode('div')
    this.overlay.id = 'cs-ov'
    this.overlay.style.visibility = 'hidden'
    this.overlay.style.opacity = '0'
    this.closeButtonContainer.appendChild(this.closeButton)
    this.header.appendChild(this.title)
    this.header.appendChild(this.closeButtonContainer)
    this.buttons.appendChild(this.primaryButton)
    this.buttons.appendChild(this.secondaryButton)
    this.buttons.appendChild(this.saveButton)
    this.inner.appendChild(this.header)
    this.inner.appendChild(this.blocks)
    this.inner.appendChild(this.buttons)
    this.innerContainer.appendChild(this.inner)
    this.settings.appendChild(this.innerContainer)
    this.valign.appendChild(this.settings)
    this.container.appendChild(this.valign)
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
  valign
  /** @type {HTMLElement} */
  settings
  /** @type {HTMLElement} */
  title
  /** @type {HTMLElement} */
  header
  /** @type {HTMLElement} */
  overlay
  /** @type {HTMLElement} */
  closeButtonContainer
  /** @type {HTMLElement} */
  closeButton
  /** @type {HTMLElement} */
  blocks
  /** @type {HTMLElement} */
  primaryButton
  /** @type {HTMLElement} */
  secondaryButton
  /** @type {HTMLElement} */
  saveButton
  /** @type {HTMLElement} */
  buttons
  /** @type {Map<string, HTMLCategory>} */
  categories
  /** @type {CategoriesStorage} */
  storage

  /**
   * Shows a cookies settings dialog
   * @returns {void}
   */
  show () {
    const consentCategories = this.storage.get()
    this.blocks.scrollTop = 0
    this.categories.forEach((controls, category) => {
      controls.expandableBlock.classList.add('stop')
      controls.expandableBlock.classList.remove('act')
      // @ts-ignore
      controls.categorySwitcher.checked = consentCategories.includes(category)
    })
    document.documentElement.classList.add('show--settings')
    this.container.setAttribute('aria-hidden', 'false')
    this.container.addEventListener('transitionend', () => {
      this.categories.forEach(controls => controls.expandableBlock.classList.remove('stop'))
    }, { once: true })
  }

  /**
   * Hides a cookies settings dialog
   * @returns {void}
   */
  hide () {
    document.documentElement.classList.remove('show--settings')
    this.container.setAttribute('aria-hidden', 'true')
  }

  /**
   * Returns user accepted categories of the cookies as an array of strings
   * @returns {Array<string>}
   */
  acceptedCategories () {
    /** @type {Array<string>} */
    const accepted = []
    this.categories.forEach((controls, category) => {
      // @ts-ignore
      if (controls.categorySwitcher.checked) {
        accepted.push(category)
      }
    })
    return accepted
  }

  /**
   * Returns all categories of the cookies as an array of strings
   * @returns {Array<string>}
   */
  allCategories () {
    /** @type {Array<string>} */
    const all = []
    this.categories.forEach((_controls, category) => {
      all.push(category)
    })
    return all
  }

  /**
   * Returns necessary categories of the cookies as an array of strings
   * @returns {Array<string>}
   */
  necessaryCategories () {
    /** @type {Array<string>} */
    const necessary = []
    this.categories.forEach((controls, category) => {
      if (controls.categorySwitcher.dataset.necessary === 'true') {
        necessary.push(category)
      }
    })
    return necessary
  }
}
