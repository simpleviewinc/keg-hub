import { isArr, isStr, exists, omitKeys, pickKeys } from '@keg-hub/jsutils'
import { hasDomAccess } from '../helpers/hasDomAccess'
import { addThemeEvent } from '../theme/themeEvent'
import { Constants } from '../constants'
import { ruleOverrides } from '../constants/ruleOverrides'

/**
 * Cache the current environment
 */
const { NODE_ENV } = process.env
const isProduction = NODE_ENV === 'production'
const domAccess = hasDomAccess()

/**
 * Cache holder to hold the main StyleSheet Dom element
 */
let KegStyleSheet

/**
 * Caches selectors already added to the Dom
 */
const selectorCache = new Set()

/**
 * Checks if a selector already exists in the selector cache
 * @param {string} selector - selector to check if already exists
 * @param {string} sizeKey - Current size being rendered
 * 
 * @return {Boolean} - If the selector has already been cached
 */
const selectorExists = selector => selectorCache.has(selector)

/**
 * Gets the cached style sheet, or finds it on the DOM
 * @function
 * 
 * @returns {Object} - Keg Style sheet
 */
const getKegSheet = () => {
  KegStyleSheet = KegStyleSheet || document.head.querySelector(Constants.KEG_STYLES_TAG_ID)
  return KegStyleSheet
}

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
 * Filters out styles that require extra help to convert to CSS
 * <br/>In these cases, we let react-native-web handel through the style attribute
 * @function
 * @param {Object} style - Object containing style rules
 * @param {Array} filter - Custom style rules to filter out
 *
 * @returns {Object} - Contains separated objects with filtered styles, non-filtered styles
 */
export const filterRules = (style, filter) => {
  const toFilter = isArr(filter) ? ruleOverrides.filter.concat(filter) : ruleOverrides.filter
  return {
    style: omitKeys(style, toFilter),
    filtered: pickKeys(style, toFilter)
  }
}

/**
 * Creates a unique selector based on the passed in className and cssString
 * @function
 * @param {string|Array<string>} className - Original className(s) used as a css selector
 * @param {string} cssString - Css rules for the className in string format
 * @param {string=} filterPrefix - optional prefix to filter by
 * 
 * @returns {{hashClass:string, selector:string}} - returns selector string and hashClass string
 */
export const getSelector = (className, cssString, filterPrefix) => {

  // filter by prefix if passed in
  const filterWithPrefix = cls => {
    return cls && filterPrefix
      ? cls.startsWith(filterPrefix)
      : cls
  }

  const selector = !exists(className)
    ? false
    : isArr(className)
      ? className.filter(filterWithPrefix).pop()
      : isStr(className) && className.split(' ').filter(filterWithPrefix).pop()

  const hashClass = `keg-${hashString(cssString)}`
  return {
    hashClass,
    selector: selector
      ? `.${selector.trim()}.${hashClass}`.trim()
      : `.${hashClass}`.trim()
  } 
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

  // Cache the selector with the size
  // So next time we can look up if the size changed
  selectorCache.add(selector)
  
  const KegSheet = getKegSheet()
  // The insertRule method is a lot faster then append method
  // But it does not allow you to see the styles in the inspector
  // So we only want to use it when in production
  // We have to wrap it in @media all selector
  // This is due to the limitations of insertRule requiring the css to be wrapped
  isProduction
    ? KegSheet.sheet.insertRule(`@media all {${css.all}}`)
    : KegSheet.append(css.all)

}

/**
 * Removes any keys stored in the selectorCache
 * <br/>Removes all styles applied to the Dom
 * @function
 * 
 * @returns {Void}
 */
const clearStyleSheet = () => {
  selectorCache.clear()
  const KegSheet = getKegSheet()
  KegSheet.textContent = ''
}

/**
 * Add an event listener to the Theme Build event
 * Any time the theme rebuilds, we want to reset the styles added to the dom
 */
addThemeEvent(Constants.BUILD_EVENT, clearStyleSheet)

/**
 * Creates a <style> Element on the dom, is called immediately
 * 
 * @returns {Object} - finds or creates style tag with Constants.KEG_STYLES_TAG_ID as the id
 */
;(() => {

  if(!domAccess) return

  KegStyleSheet = document.head.querySelector(Constants.KEG_STYLES_TAG_ID)

  if (KegStyleSheet) return KegStyleSheet

  KegStyleSheet = document.createElement('style')
  KegStyleSheet.id = Constants.KEG_STYLES_TAG_ID
  document.head.append(KegStyleSheet)

})()