/**
 * @class `CategoriesStorage` represents a storage of user allowed categories of the cookies
 */
export class CategoriesStorage {
  /**
   * Creates `CategoriesStorage` instance to work with a session cookie
   * @param {string} key Session cookie name
   * @param {Array<string>} necessary Names of the necessary categories of the cookies
   */
  constructor (key = 'consent', necessary = ['necessary']) {
    this.key = key
    this.necessary = necessary
  }

  /** @type {string} */
  key
  /** @type {Array<string>} */
  necessary

  /**
   * @param {CategoriesStorage} categoriesStorage Instantiated storage object
   * @returns {boolean} Returns `True` if storage hasn't a consent session cookie, `Else` otherwise
   */
  static noConsent (categoriesStorage) {
    const cookies = document.cookie.split(';').map(cookie => cookie.trim())
    const storage = new Map()
    cookies.forEach(cookie => {
      const pair = cookie.split('=')
      if (pair) storage.set(pair[0], pair[1])
    })
    return !storage.has(categoriesStorage.key)
  }

  /**
   * Gets the user allowed categories of the cookies from the session cookie
   * @returns {Array<string>} Allowed categories of the cookies
   */
  get () {
    const storage = new Map()
    const cookies = document
      .cookie
      .split(';')
      .map(cookie => cookie.trim())
    cookies.forEach(cookie => {
      const pair = cookie.split('=')
      if (pair) storage.set(pair[0], pair[1])
    })
    if (storage.has(this.key)) {
      const categories = JSON.parse(storage.get(this.key))
      return categories
    }
    return this.necessary
  }

  /**
   * Sets the user allowed categories of the cookies to the session cookie
   * @param {Array<string>} categories Allowed categories of the cookies
   * @returns {void}
   */
  set (categories) {
    if (Array.isArray(categories)) {
      const jsonCategories = JSON.stringify(categories)
      const namespaceCount = 2
      let rootDomain = location.hostname
      const namespaces = rootDomain.split('.')
      if (namespaces.length > namespaceCount) {
        rootDomain = namespaces
          .slice(namespaces.length - namespaceCount)
          .join('.')
      }
      document.cookie = `${this.key}=${jsonCategories}; Domain=${rootDomain};`
    }
  }
}
