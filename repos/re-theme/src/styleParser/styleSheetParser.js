import { isArr, checkCall, isObj } from '@keg-hub/jsutils'
import { validateArguments } from './validate'
import { addToDom } from './addToDom'
import { cssToJs } from './cssToJs'

/**
 * Loops a style sheets rules and looks for matching className selectors
 * @function
 * @param {Object} formatted - Object to hold the parsed styles
 * @param {Object} sheet - Dom StyleSheet Object
 * @param {Array} classNames - Array of className to convert into data-attributes
 * @param {function} callback - Function to call on matching className
 * 
 * @returns {Object|string} - CssInJs object or string of the converted styles
 */
const loopSheetCssRules = (formatted, sheet, classNames, callback) => {
  // Check the rules of each styleSheet for a matching class
  return Array.from(sheet.cssRules)
    .reduce((formatted, cssRule) => {

      if (!cssRule.selectorText || !cssRule.cssText) return formatted

      // Get the rootSelector of the cssRule, any sub-rule definitions will not work
      // .my-class-name => WORKS
      // .root-class-name .my-class-name => DOES NOT WORK
      const rootSelector = cssRule.selectorText.split(' ').shift()

      // Check if the rootSelector is in the classNames
      // If it is, then call the callback
      return classNames.includes(rootSelector)
        ? checkCall(callback, cssRule, rootSelector, formatted, cssToJs)
        : formatted

    }, formatted)
}

/**
 * Loops over the styles sheets currently on the DOM
 * <br/>Searches each one for a matching class within the passed in classNames
 * <br/>If it exists, then it converts it to `data-class-name` attribute
 * @function
 * @param {Array} classNames - Array of className to convert into data-attributes
 * @param {boolean} [toDom=true] - Should the parsed styles be added to the dom
 * 
 * @returns {Object|string} - CssInJs object or string of the converted styles
 */
export const styleSheetParser = (args) => {

  const {
    classNames,
    callback,
    toDom=true,
    valid
  } = validateArguments(args)

  if(valid === false) return {}

  const parsedStyles = isArr(classNames) &&
    // Have to convert all styleSheets form the DOM into an array to loop over them
    Array.from(document.styleSheets).reduce(
      (formatted, sheet) => loopSheetCssRules(formatted, sheet, classNames, callback),
      { asStr: '' }
    )

  toDom &&
    isObj(parsedStyles) &&
    parsedStyles.asStr &&
    addToDom(parsedStyles.asStr)

  return parsedStyles

}
