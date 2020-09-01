import { noOpObj } from '../helpers/noOp'
import { stringHasher } from '../helpers/stringHasher'
import { getCssSelector } from '../helpers/getCssSelector'
import { checkCall, isStr, isObj, reduceObj, set } from '@svkeg/jsutils'

/**
 * Adds a value to the passed in styleObj at the passed in rulePath
 * @function
 * @param {Object} styleObj - Object to be updated with styles
 * @param {string} rulePath - Path on the object to update
 * @param {string|number} value - Value to set at the rulePath of the styleObj
 *
 * @returns {string} - Hashed version of the string
 */
const addRuleToStyles = (styleObj, rulePath, value) => {
  set(styleObj, rulePath, value)
  return styleObj
}

/**
 * Calls addRuleToStyles passing props based on the web || cssProps existence
 * @function
 * @param {Object} web - Object that stores web Styles
 * @param {Object} cssProps - Object that stores native Styles and the dataSet object
 * @param {string} rulePath - Path on the object to update
 * @param {string|number} value - Value to set at the rulePath of the styleObj
 *
 * @returns {string} - Hashed version of the string
 */
const buildStyleRules = (web, cssProps, rule, value, config) => {
  const selector = getCssSelector(config)
  const rulePath = web 
    ? `styles.${selector}.${rule}`
    : `style.${rule}`,
  
  addRuleToStyles(web || cssProps, rulePath, value)

  return { web, cssProps, selector }
}

/**
 * Calls addRuleToStyles passing props based on the web || cssProps existence
 * @function
 * @param {Object} web - Object that stores web Styles
 * @param {Object} cssProps - Object that stores native Styles and the dataSet object
 * @param {string} key - Name of the css rule || child style object
 * @param {string|number} value - Value to set at the rulePath of the styleObj
 *
 * @returns {string} - Hashed version of the string
 */
const addDataSet = (web, cssProps, key, selector, className) => {
  web && get(web, `styles.${selector}`) ||
    get(cssProps, `${key}.style`) &&
    set(cssProps, `${key}.dataSet`,  { class: className })
}

/**
 * Builds style rules of child style objects
 * @function
 * @param {Object} web - Object that stores web Styles
 * @param {Object} cssProps - Object that stores native Styles and the dataSet object
 * @param {string} rootClass - Root class to build the rules for
 * @param {string} key - Name of the css rule || child style object
 * @param {string|number|Object} value - Value to set at the rulePath of the styleObj
 *
 * @returns {string} - Built child style object
 */
const createDataSet = (web, cssProps, custom, config, key, value) => {

  // Build the class name to be used in the dataSet and web
  const className = `${config.className}-${key}`

  // Recursively call buildDataSet on each child object of the original cssProps
  const built = buildDataSet(
    web,
    value,
    isObj(custom) && custom[key] || noOpObj,
    { className, ...config },
  )

  // Set the sub-cssProps to the key of the parent cssProps
  cssProps[key] = built.cssProps

  // Merge web styles and return web and cssProps
  return { web: { ...web, ...built.web }, cssProps }

}

/**
 * Builds the cssProps to be returned to the calling component
 * <br/> The method returns valid component props, which means
 * <br/> The cssProps can and should be applied directly to the component
 * <br/> It builds a dataSet: { class: <dynamic-class> } based on the path to found style rules
 * @example
 * const css = { content: { icon: { color: 'green' }}}
 * const cssProps = buildDataSet(`class`, css)
 * // cssProps === { content: { icon: { style: { color: 'blue' }, dataSet: { class: `class-content-icon` }}}}
 * // dataSet.class === css.content.icon === `class-content-icon`
 * // The class value `cssProps.content.icon.dataSet.class` is built from the cssStyle path to the Icon
 * @function
 * 
 * @param {Object} web - Empty object to hold the styles when in on a Web Platform
 * @param {Object} css - CssInJs style object
 * @param {Object} [custom={}] - Custom styles to merge with the theme css
 * @param {Object} [config={}] - Config object for building style rules
 * 
 * @returns {Object} - cssProps Object, containing style and dataSet keys
 */
export const buildDataSet = (web, css, custom, config={}) => {
  return reduceObj(css, (key, value, cssProps) => {

    // Check if value is an object
    return isObj(value)
      // If it is, we know the key should be added to the dataSet
      ? createDataSet(
          web,
          cssProps,
          custom,
          config,
          key,
          value
        )
      // If it's not an object, it must by style rules
      // So make call to add it to the platform Object
      : buildStyleRules(
          web,
          cssProps,
          rule,
          isObj(custom) && custom[rule] || value,
          config
        )

  })
}
