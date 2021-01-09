import { useMemo } from 'react'
import { addStylesToDom, getSelector, filterRules } from './injectHelpers'
import { eitherArr, hyphenator, isArr, isObj, flatArr } from '@keg-hub/jsutils'
import { useTheme } from '../hooks/useTheme'
import {
  prefixStyles,
  flattenStyle,
  createReactDOMStyle,
  createCompileableStyle,
} from './reactNativeWeb'
import { ruleOverrides } from '../constants/ruleOverrides'
import { noOpObj } from '../helpers/noOp'

/**
 * Checks if the rule is enforce and adds !important to it
 * @param {Object} style - Styles rules to be converted to style rules string
 *
 * @returns {string} - Style rules Object converted into a style rules string
 */
const checkImportant = (property, value, important) =>
  important.includes(property) ? `${value} !important` : value

/**
 * Creates a style rules string from a JS object
 * @param {Object} style - Styles rules to be converted to style rules string
 *
 * @returns {string} - Style rules Object converted into a style rules string
 */
export const createBlock = (style, config) => {
  const important = ruleOverrides.important.concat(config?.important)
  const prefixed = prefixStyles(createReactDOMStyle(style))
  const cssString = Object.keys(prefixed)
    .map(property => {
      const value = checkImportant(property, prefixed[property], important)
      const prop = hyphenator(property)

      return isArr(value)
        ? value.map(val => `${prop}:${val}`).join(';')
        : `${prop}:${value}`
    })
    .sort()
    .join(';')

  return `{${cssString}}`
}

/**
 * Converts a JS style object into a style rules string
 * @param {Object} style - Styles rules to be converted to style rules string
 *
 * @returns {string} - Style rules Object converted into a style rules string
 */
export const convertToCss = (style, config) => {
  const stlArr = flatArr(eitherArr(style, [style]))

  return stlArr.reduce(
    (rules, stl) => {
      if (!isObj(stl)) return rules

      const { style: cleanStyle, filtered } = filterRules(stl, config?.filter)
      Object.assign(rules.filtered, filtered)

      const flat = flattenStyle(cleanStyle)
      const compiled = createCompileableStyle(flat)
      rules.blocks.push(createBlock(compiled, config))

      return rules
    },
    { blocks: [], filtered: {} }
  )
}

/**
 * Custom hook to convert a JS style object into a valid css string
 * <br/>After converting it, it appends it to the Dom
 * <br/>It also keeps a hash of all appended styles rules to avoid duplication
 * @param {Object} style - Styles rules to be converted and added to the Dom
 * @param {string|Array<string>} className - Css selector(s) of the style fules
 *
 * @returns {Object} - className Css selector of the added style rules
 */
export const useStyleTag = (style, className = '', config) => {
  // Ensure config is an object
  config = isObj(config) ? config : noOpObj

  const theme = useTheme()
  const themeSize = theme?.RTMeta?.size
  const themeKey = theme?.RTMeta?.key

  return useMemo(() => {
    const { blocks, filtered } = convertToCss(style, config)

    // Create a unique selector based on the className and built blocks
    const { hashClass, selector } = getSelector(
      className,
      blocks.join(''),
      'keg'
    )

    // Adds the css selector ( className ) to each block
    const css = blocks.reduce(
      (css, block) => {
        const fullBlock = `${selector}${block}`
        css.all += fullBlock
        css.rules.push(fullBlock)

        return css
      },
      { all: '', rules: [] }
    )

    addStylesToDom(selector, css, themeKey)
    return {
      css,
      filteredStyle: filtered,
      classList: eitherArr(className, [className]).concat([hashClass]),
    }
  }, [ style, className, themeSize, themeKey, config ])
}
