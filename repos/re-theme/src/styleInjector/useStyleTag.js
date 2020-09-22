import { useMemo } from 'react'
import { addStylesToDom, getSelector, hyphenator } from './injectHelpers'
import { isArr, eitherArr, isObj } from '@keg-hub/jsutils'
import { useTheme } from '../hooks/useTheme'
import {
  prefixStyles,
  flattenArray,
  flattenStyle,
  createReactDOMStyle,
  createCompileableStyle,
} from './reactNativeWeb'

/**
 * Creates a style rules string from a JS object
 * @param {Object} style - Styles rules to be converted to style rules string
 * 
 * @returns {string} - Style rules Object converted into a style rules string
 */
export const createBlock = style => {
  const prefixed = prefixStyles(createReactDOMStyle(style))
  const cssString = Object.keys(prefixed)
    .map(property => {
      const value = prefixed[property]
      const prop = hyphenator(property)

      return isArr(value)
        ? value.map(val => (`${prop}:${val}`)).join(';')
        : `${prop}:${value}`
    })
    .sort().join(';')

  return `{${cssString}}`
}

/**
 * Converts a JS style object into a style rules string
 * @param {Object} style - Styles rules to be converted to style rules string
 * 
 * @returns {string} - Style rules Object converted into a style rules string
 */
export const convertToCss = style => {

  const stlArr = flattenArray(eitherArr(style, [style]))

  return stlArr.reduce((rules, stl) => {
    if(!isObj(stl)) return rules

    const flat = flattenStyle(stl)
    const compiled = createCompileableStyle(flat)
    rules.blocks.push(createBlock(compiled))

    return rules
  }, { blocks: [] })

}

/**
 * Custom hook to convert a JS style object into a valid css string
 * <br/>After converting it, it appends it to the Dom
 * <br/>It also keeps a hash of all appended styles rules to avoid duplication
 * @param {Object} style - Styles rules to be converted and added to the Dom
 * @param {string|Array[string]} className - Css selector of the style fules
 * 
 * @returns {string} - className Css selector of the added style rules
 */
export const useStyleTag = (style, className='') => {

  const theme = useTheme()
  const themeSize = theme?.RTMeta?.size
  const themeKey = theme?.RTMeta?.key

  const { selector } = useMemo(() => {
    const { blocks } = convertToCss(style, selector)

    // Create a unique selector based on the className and built blocks
    const selector = getSelector(className, blocks.join(''))

    // Adds the css selector ( className ) to each block
    const css = blocks.reduce((css, block) => {
      const fullBlock = `${selector}${block}`
      css.all += fullBlock
      css.rules.push(fullBlock)

      return css
    }, { all: '', rules: [] })

    addStylesToDom(selector, css, themeKey)

    return {
      css,
      selector: selector.split('.').filter(cls => cls)
    }
  }, [style, className, themeSize, themeKey])

  return selector
}
