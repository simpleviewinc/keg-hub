import { exists, camelCase, isArr } from '@keg-hub/jsutils'

/**
 * Matches all content between `{}`
 * @example
 * getStyleContent(".my-class { color: blue }") === " color: blue "
 * @function
 * @param {string} styleStr - Css styles in string format
 * 
 * @returns {string} - Content inbetween the {} of the passed in string
 */
const getStyleContent = styleStr => {
  const matches = [ ...styleStr.matchAll(/\{(.+?)\}/gi) ]
  return isArr(matches) && isArr(matches[0]) ? matches[0][1] : ''
}

/**
 * Converts from css formatted name to js Object format
 * @example
 * cssToJs("{ color: blue; font-size: 12px; }") === { color: 'blue', fontSize: '12px' }
 * @function
 * @param {string} styleStr - Css styles in string format
 * @param {Object} styleObj - Holds the converted styles
 *
 * @returns {Object} - Passed in styleObj, with the styleStr added in object format
 */
export const cssToJs = (styleStr, styleObj={}) => {
  
  const styles = getStyleContent(styleStr).trim().split(';')

  return styles.reduce((parsed, styleRule) => {
    if(styleRule.indexOf(':') === -1) return parsed

    let [ name, value ] = styleRule.split(':')
    name = camelCase(name.trim())
    value = value.trim()

    return !exists(name) || !exists(value) || name === '' || value === ''
      ? parsed
      : { ...parsed, [name]: value }

  }, styleObj)

}
