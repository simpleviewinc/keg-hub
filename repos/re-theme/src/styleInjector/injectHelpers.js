import { isArr, isStr, exists } from '@keg-hub/jsutils'
import { hasDomAccess } from '../helpers/hasDomAccess'

/**
 * Cache the current environment
 */
const { NODE_ENV } = process.env
const isProduction = NODE_ENV === 'production'
const domAccess = hasDomAccess()

/**
 * Unique ID for the style tag that holds the injected styles
 */
const KEG_STYLES_TAG_ID = `keg-components-stylesheet`

/**
 * Cache holder to hold the main StyleSheet Dom element
 */
let KegStyleSheet

/**
 * Caches classes already added to the Dom
 */
const classCache = new Set()

/**
 * Checks if a class already exists in the class cache
 * @param {string} className - class to check if already exists
 */
const selectorExists = className => classCache.has(className)

/**
 * External hyphenator helpers, created outside the method to improve performance
 * @Object
 */
const uppercasePattern = /[A-Z]/g
const msPattern = /^ms-/
const hyphenCache = {}
/**
 * Converts a matching style rule to lowercase with hyphen
 * External hyphenator helpers, created outside the method to improve performance
 * @function
 * @param {string} str - camelCase style rule rule
 * 
 * @returns {string} - Lowercase style rule with hyphen at the start
 */
const toHyphenLower = match => ('-' + match.toLowerCase())

/**
 * Converts a camelCase style rule into a hyphenated style rule
 * <br/>Caches the response to make future conversions faster
 * @function
 * @param {string} str - camelCase style rule rule
 *
 * @returns {string} - Hyphenated style rule
 */
export const hyphenator = rule => {
  if (hyphenCache.hasOwnProperty(rule)) return hyphenCache[rule]

  const hRule = rule.replace(uppercasePattern, toHyphenLower)
  return (hyphenCache[rule] = msPattern.test(hRule) ? '-' + hRule : hRule)
}

const getKegSheet = () => {
  KegStyleSheet = KegStyleSheet || document.head.querySelector(KEG_STYLES_TAG_ID)
  return KegStyleSheet
}

/**
 * Creates a hash from a passed in string consistently
 * <br/>Not intended to be secure
 * <br/>Value comes from being a pure function
 * <br/>Given the same input, it will always return the same output
 * <br/>There is no expectation to convert back from the hash to the original string
 * @function
 * @param {string} str - String to be hashed
 * @param {number=} maxLength - Max length of the returned hash
 *
 * @returns {string} - Hashed version of the string
 */
export const hashString = (str, maxLength=0) => {
  if (!isStr(str) || str.length == 0) return 0

  str = str.split('').reverse().join('')

  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash<<5) - hash) + char
    // Convert to positive 32bit integer
    hash = `${ Math.abs(hash & hash) }`
  }

  return maxLength ? hash.slice(0, maxLength) : hash
}

/**
 * Creates a unique selector based on the passed in className and cssString
 * @function
 * @param {string} className - Original className used as a css selector
 * @param {string} cssString - Css rules for the className in string format
 *
 * @returns {string} - Hashed version of the string
 */
export const getSelector = (className, cssString) => {
  const selector = !exists(className)
    ? false
    : isArr(className)
      ? className.filter(cls => cls).join('.').trim()
      : isStr(className) && className.split(' ').join('.').trim()

  return selector
    ? `.${selector.trim()}.keg-${hashString(cssString)}`.trim()
    : `.keg-${hashString(cssString)}`.trim()
}


/**
 * Converts the theme width into media queries
 * @function
 * @param {number} width - Current width of the Theme
 * @param {string} cssString - Css style rules to be wrapped
 *
 * @returns {string} cssString wrapped in a media query
 */
export const wrapWithMedia = (width, cssString) => {
  const KegSheet = getKegSheet()
  KegSheet.setAttribute('data-keg-media', width)
  return `@media (min-width: ${width}px) {${cssString}}`
} 

/**
 * Adds a css string to the KegStyleSheet
 * @param {string} selector - Css selector to add the style rules to
 * @param {string} css - Style rules to be added 
 * 
 * @returns {Void}
 */
export const addStylesToDom = (selector, css) => {
  // skip if these styles are already inserted
  if (!domAccess || !css || selectorExists(selector)) return

  classCache.add(selector)
  const KegSheet = getKegSheet()

  // The insertRule method is a lot faster then append method
  // But it does not allow you to see the styles in the inspector
  // So we only want to use it when in production
  isProduction
    ? css.rules.map(rule => KegSheet = getKegSheet().sheet.insertRule(rule))
    : KegSheet.append(css.all)

}

export const ClearSheet = () => {
  classCache.clear()
  const KegSheet = getKegSheet()
  KegSheet.textContent = ''
}

/**
 * Creates a <style> Element on the dom, is called immediately
 * 
 * @returns {Object} - Found or created style tag with KEG_STYLES_TAG_ID as the id
 */
(() => {

  if(!domAccess) return

  KegStyleSheet = document.head.querySelector(KEG_STYLES_TAG_ID)

  if (KegStyleSheet) return KegStyleSheet

  KegStyleSheet = document.createElement('style')
  KegStyleSheet.id = KEG_STYLES_TAG_ID
  document.head.append(KegStyleSheet)

})()