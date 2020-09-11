import { noOpObj } from '../helpers/noOp'
import { getCssSelector } from '../helpers/getCssSelector'
import { isObj, reduceObj, get, set } from '@keg-hub/jsutils'

/**
 * Adds a value to the passed in styleObj at the passed in rulePath
 * @function
 * @param {Object} styleObj - Object to be updated with style
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
 * Calls addRuleToStyles passing props based on the web || styleProps existence
 * @function
 * @param {Object} web - Object that stores web Styles
 * @param {Object} styleProps - Object that stores native Styles and the dataSet object
 * @param {string} rulePath - Path on the object to update
 * @param {string|number} value - Value to set at the rulePath of the styleObj
 *
 * @returns {string} - Hashed version of the string
 */
const buildStyleRules = (current, config, rule, value) => {
  const { web, styleProps, custom } = current
  const cssValue = isObj(custom) && custom[rule] || value

  const selector = getCssSelector(config)
  const rulePath = web ? `style.${selector}.${rule}` : `style.${rule}`

  addRuleToStyles(web || styleProps, rulePath, cssValue)

  return { web, styleProps, selector }
}

/**
 * Adds the dataSet to the styleProps object
 * @function
 * @param {Object} web - Object that stores web Styles
 * @param {Object} styleProps - Object that stores native Styles and the dataSet object
 * @param {string} key - Name of the css rule || child style object
 * @param {string|number} value - Value to set at the rulePath of the styleObj
 *
 * @returns {string} - Hashed version of the string
 */
const addDataSet = (web, styleProps, key, selector, dataSet) => {
  (web && get(web, `style.${selector}`) || get(styleProps, `${key}.style`)) &&
    set(styleProps, `${key}.dataSet`,  dataSet)
}

/**
 * Builds style rules of child style objects
 * @function
 * @param {Object} web - Object that stores web Styles
 * @param {Object} styleProps - Object that stores native Styles and the dataSet object
 * @param {string} rootClass - Root class to build the rules for
 * @param {string} key - Name of the css rule || child style object
 * @param {string|number|Object} value - Value to set at the rulePath of the styleObj
 *
 * @returns {string} - Built child style object
 */
const buildDataSet = (current, config, key, value) => {
  const { web, styleProps } = current
  const custom = isObj(current.custom) && current.custom[key] || noOpObj

  // Build the class name to be used in the dataSet and web
  const selector = `${config.selector}-${key}`

  // Recursively call buildDataSet on each child object of the original styleProps
  const built = generateDataSet(
    web,
    value,
    custom,
    { ...config, selector },
  )

  // Set the sub-styleProps to the key of the parent styleProps
  styleProps[key] = built.styleProps

  addDataSet(web, styleProps, key, built.selector, { class: selector })

  // Merge web style and return web and styleProps
  return { styleProps, web: web && { ...web, ...built.web } }

}

/**
 * Builds the styleProps to be returned to the calling component
 * <br/> The method returns valid component props, which means
 * <br/> The styleProps can and should be applied directly to the component
 * <br/> It builds a dataSet: { class: <dynamic-class> } based on the path to found style rules
 * @example
 * const css = { content: { icon: { color: 'green' }}}
 * const styleProps = buildDataSet(`class`, css)
 * // styleProps === { content: { icon: { style: { color: 'blue' }, dataSet: { class: `class-content-icon` }}}}
 * // dataSet.class === css.content.icon === `class-content-icon`
 * // The class value `styleProps.content.icon.dataSet.class` is built from the cssStyle path to the Icon
 * @function
 * 
 * @param {Object} web - Empty object to hold the style when in on a Web Platform
 * @param {Object} css - CssInJs style object
 * @param {Object} [custom={}] - Custom style to merge with the theme css
 * @param {Object} [config={}] - Config object for building style rules
 * 
 * @returns {Object} - styleProps Object, containing style and dataSet keys
 */
export const generateDataSet = (web, css, custom, config={}) => {

  return reduceObj(css, (key, value, built) => {
    // Check if value is an object
    return isObj(value)
      // If it is, we know the key should be added to the dataSet
      ? buildDataSet(
          built,
          config,
          key,
          value,
        )
      // If it's not an object, it must by style rules
      // So make call to add it to the style object
      : buildStyleRules(
          built,
          config,
          key,
          value,
        )

  }, { styleProps: {}, web, custom })
}
