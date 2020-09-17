import { useMemo } from 'react'
import hyphenateStyleName from 'hyphenate-style-name'
import { isArr, eitherArr, isObj, isStr, exists } from '@keg-hub/jsutils'
import prefixStyles from 'react-native-web/dist/cjs/modules/prefixStyles'
import flattenArray from 'react-native-web/dist/cjs/modules/flattenArray'
import flattenStyle from 'react-native-web/dist/cjs/exports/StyleSheet/flattenStyle'
import createReactDOMStyle from 'react-native-web/dist/cjs/exports/StyleSheet/createReactDOMStyle'
import createCompileableStyle from 'react-native-web/dist/cjs/exports/StyleSheet/createCompileableStyle'

/**
 * Cache the current environment
 */
const { NODE_ENV } = process.env
const isProduction = NODE_ENV === 'production'

/**
 * Unique ID for the style tag that holds the injected styles
 */
const KEG_STYLES_TAG_ID = `keg-injected-styles`

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
const hashString = (str, maxLength=0) => {
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

const createBlock = style => {
  const prefixed = prefixStyles(createReactDOMStyle(style))
  const cssString = Object.keys(prefixed)
    .map(property => {
      const value = prefixed[property]
      const prop = hyphenateStyleName(property)

      return isArr(value)
        ? value.map(val => (`${prop}:${val}`)).join(';')
        : `${prop}:${value}`
    })
    .sort().join(';')

  return `{${cssString}}`
}

const convertToCss = style => {

  const stlArr = flattenArray(eitherArr(style, [style]))

  return stlArr.reduce((rules, stl) => {
    if(!isObj(stl)) return rules

    const flat = flattenStyle(stl)
    const compiled = createCompileableStyle(flat)
    rules.blocks.push(createBlock(compiled))

    return rules
  }, { blocks: [] })

}

const getSelector = (className, cssString) => {
  const selector = !exists(className)
    ? false
    : isArr(className)
      ? className.filter(cls => cls).join('.').trim()
      : isStr(className) && className.split(' ').join('.').trim()

  return selector
    ? `.${selector.trim()}.keg-${hashString(cssString)}`.trim()
    : `.keg-${hashString(cssString)}`.trim()
}

const addCssToStyleTag = (selector, css) => {
  // skip if these styles are already inserted
  if (!css || selectorExists(selector)) return

  classCache.add(selector)
  KegStyleSheet = KegStyleSheet || document.head.querySelector(KEG_STYLES_TAG_ID)

  // The insertRule method is a lot faster then append method
  // But it does not allow you to see the styles in the inspector
  // So we only want to use it when in production
  isProduction
    ? css.rules.map(rule => KegStyleSheet.sheet.insertRule(rule))
    : KegStyleSheet.append(css.all)

}

export const useStyleTag = (style, className='') => {

  const { selector } = useMemo(() => {
    const { blocks } = convertToCss(style, selector)

    // Create a unique selector based on the className and built blocks
    const selector = getSelector(className, blocks.join(''))

    // Adds the css selector ( className ) to each block
    const css = blocks.reduce((css, block) => {
      css.all += `${selector}${block}`
      css.rules.push(`${selector}${block}`)

      return css
    }, { all: '', rules: [] })

    addCssToStyleTag(selector, css)

    return {
      css,
      selector: selector.split('.').filter(cls => cls)
    }
  }, [style, className])

  return selector
}


/**
 * Creates a <style> Element on the dom, is called immediately
 */
;(() => {

  KegStyleSheet = document.head.querySelector(KEG_STYLES_TAG_ID)
  if (KegStyleSheet) return 

  KegStyleSheet = document.createElement('style')
  KegStyleSheet.id = KEG_STYLES_TAG_ID
  document.head.append(KegStyleSheet)

})()