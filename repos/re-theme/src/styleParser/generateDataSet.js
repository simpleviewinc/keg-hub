import { noOpObj } from '../helpers/noOp'
import { stringHasher } from '../helpers/stringHasher'
import { getCssSelector } from '../helpers/getCssSelector'
import { isObj, reduceObj, get, set } from '@keg-hub/jsutils'

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
const buildStyleRules = (current, config, rule, value) => {
  const { web, cssProps, custom } = current
  const cssValue = isObj(custom) && custom[rule] || value

  const selector = getCssSelector(config)
  const rulePath = web ? `styles.${selector}.${rule}` : `style.${rule}`

  addRuleToStyles(web || cssProps, rulePath, cssValue)

  return { web, cssProps, selector }
}

/**
 * Adds the dataSet to the cssProps object
 * @function
 * @param {Object} web - Object that stores web Styles
 * @param {Object} cssProps - Object that stores native Styles and the dataSet object
 * @param {string} key - Name of the css rule || child style object
 * @param {string|number} value - Value to set at the rulePath of the styleObj
 *
 * @returns {string} - Hashed version of the string
 */
const addDataSet = (web, cssProps, key, selector, dataSet) => {
  (web && get(web, `styles.${selector}`) || get(cssProps, `${key}.style`)) &&
    set(cssProps, `${key}.dataSet`,  dataSet)
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
const buildDataSet = (current, config, key, value) => {
  const { web, cssProps } = current
  const custom = isObj(current.custom) && current.custom[key] || noOpObj

  // Build the class name to be used in the dataSet and web
  const selector = `${config.selector}-${key}`

  // Recursively call buildDataSet on each child object of the original cssProps
  const built = generateDataSet(
    web,
    value,
    custom,
    { ...config, selector },
  )

  // Set the sub-cssProps to the key of the parent cssProps
  cssProps[key] = built.cssProps

  addDataSet(web, cssProps, key, built.selector, { class: selector })

  // Create a hash of the selector to identify it later in in the HeadProvider
  web && web.hash.push(stringHasher(selector))

  // Merge web styles and return web and cssProps
  return { cssProps, web: web && { ...web, ...built.web } }

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
      // So make call to add it to the styles object
      : buildStyleRules(
          built,
          config,
          key,
          value,
        )

  }, { cssProps: {}, web, custom })
}
