import React, { useMemo } from 'react'
import { useTheme } from './useTheme'
import { hasDomAccess } from '../helpers/hasDomAccess'
import { getRNPlatform } from '../context/platform'
import { checkCall, get, isStr, isObj, exists, reduceObj } from '@svkeg/jsutils'
import { noOpObj } from '../helpers/noOp'
import { jsToCss } from '../styleParser/jsToCss'

/**
 * Cache holder for quick check if we're using web styles or not
 * <br> Can be overridden by passing inline to the useCss hook
 * @object
 */
let __webPlatform

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
const hasher = (str, maxLength=0) => {
  if (str.length == 0) return 0
  
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash<<5) - hash) + char
    hash = hash & hash // Convert to 32bit integer
  }

  return maxLength ? hash.slice(0, maxLength) : hash
}

/**
 * Validates the passed in theme style object to ensure the key value pairs are style rules
 * <br/>If style object is not valid, then it will throw!
 * <br/>Should only run in production
 * <br/>Bypassed when in production
 * @function
 * @param {Object} style - CssInJs style object
 * @param {string} className - Root class name for build the sub-data-call attributes
 *
 * @returns {boolean} - If themeStyles is a valid styles object
 */
const validTheme = (themeStyles, className) => {
  return process.env.NODE_ENV === 'production' ||
    Boolean(isObj(themeStyles) && className) ||
    console.error(
      `[ ReTheme ERROR ] - Invalid themeRef`,
      `\n   - useCss hook requires a valid theme reference of type 'Object' || 'string'`,
      `\n   - As string - must be a dot delimited path to a styles object on the global theme`,
      `\n   - As Object - must be a valid CssInJs styles object`,
      `\n`,
      `\n   - A 'root class' of type 'string' is also required`,
      `\n   - It can be a key on the 'themeRef' as '$class' or '$className'`,
      `\n   - Or passed as the third argument to the 'useCss' hook`
    )
}

/**
 * Checks if we should use web css style sheets or inline styles base on inline and platform
 * @function
 * @param {string} inline - Force use inline styles regardless of platform
 * 
 * @returns {boolean} - true if using a web platform, false if not on web || inline === true
 */
const checkWebPlatform = inline => {
  return inline
    ? false
    : exists(__webPlatform)
      ? __webPlatform
      : checkCall(() => {
          const platform = getRNPlatform()
          // Cache the web platform call so we don't have to call this again
          // The Platform doesn't change, so it's not an issue
          __webPlatform = hasDomAccess() && platform.OS === 'web'
            ? true
            : false

          return __webPlatform
        })
}


const buildWebSelector = (selector, config) => {
  const hasRef = selector.indexOf('.') === 0 ||
    selector.indexOf('#') === 0 ||
    selector.indexOf('[') === 0

  return hasRef
    ? selector
    : config.prefix && selector.indexOf(config.prefix) === 0
      ? `${ config.selector.replace('{{selector}}', selector) }`
      : selector

}

/**
 * Builds the cssProps to be returned to the calling component
 * <br/> The method returns valid component props, which means
 * <br/> The cssProps can and should be applied directly to the component
 * <br/> It builds a dataSet: { class: <dynamic-class> } based on the path to found style rules
 * @example
 * const cssStyles = { content: { icon: { color: 'green' }}}
 * const cssProps = buildDataSet(`class`, cssStyles)
 * // cssProps === { content: { icon: { style: { color: 'blue' }, dataSet: { class: `class-content-icon` }}}}
 * // dataSet.class === cssStyles.content.icon === `class-content-icon`
 * // The class value `cssProps.content.icon.dataSet.class` is built from the cssStyle path to the Icon
 * @function
 * 
 * @param {string} rootClass - Name to use as the root data-class attribute
 * @param {Object} cssStyles - CssInJs style object
 * @param {Object} webContent - Empty object to hold the styles when in on a Web Platform
 * @param {Object} [customStyles={}] - Custom styles to merge with the theme css
 * 
 * @returns {Object} - cssProps Object, containing style and dataSet keys
 */
const buildDataSet = (rootClass, cssStyles, webContent, customStyles, config={}) => {
  return reduceObj(cssStyles, (key, value, cssProps) => {

    // Check if value is an object
    // If it is, we know the key should be added to the dataSet
    isObj(value)
      ? checkCall(() => {
          // Build the class name to be used in the dataSet and webContent
          const className = `${rootClass}-${key}`
          // Recursively call buildDataSet on each child object of the original cssProps
          cssProps[key] = buildDataSet(
            className,
            value,
            webContent,
            isObj(customStyles) && customStyles[key] || noOpObj,
            config,
          )

          // If a style or className was added, then add the dataSet too
          const hasStyle = Boolean(cssProps[key].style ||
            (webContent && webContent.styles[buildWebSelector(className, config)]) )
            
          hasStyle && ( cssProps[key].dataSet = { class: className } )

        })
      : checkCall(() => {
          // If it's not an object, it must by style rules
          // So add the styles to the correct object based on platform
          if(webContent){
            const webSelector = webContent && buildWebSelector(rootClass, config)
            // Use the rootCall, because that's the parent of the style object being created
            webContent.styles[webSelector] = webContent[webSelector] || {}
            webContent.styles[webSelector][key] = isObj(customStyles) && customStyles[key] || value
            webContent.hash += `-${hasher(webSelector, 8)}`
          }
          else {
            // Add the style key, to be applied directly to the component in React Native
            cssProps.style = cssProps.style || {}
            cssProps.style[key] = isObj(customStyles) && customStyles[key] || value
          }
        })

    return cssProps
  })
}

/**
 * Create a custom hook for adding styles to the Dom in a web context
 * When on native, will return a dataSet and style prop to be applied to the element
 * @example
 * const { dataSet, style } = useCss(themeRef, customStyles, rootClass)
 * <View dataSet={ dataSet } style={ style } >My View</View>
 * 
 * @param {Object} css - CssInJs style object with a $class || $className key
 * @param {Object} [customStyles={}] - Custom styles to merge with the theme css
 * @param {string} rootClass - Name to use as the root data-class attribute
 * 
 * @returns { Object } - Current theme
 */
export const useCss = (themeRef, customStyles=noOpObj, config={}) => {
  const { rootClass, inline, selector, id } = config
  
  const theme = useTheme()

  // Check if the themeRef is a theme path as a string
  // Or it could be an style object from the theme
  const themeStyles = isStr(themeRef) ? get(theme, themeRef, noOpObj) : (themeRef || noOpObj)

  return useMemo(() => {
    // Extract the $class and $className from the themeStyles
    const { $class, $className, ...cssStyle } = (themeStyles || noOpObj)
    const className = rootClass || $className || $class

    const isValid = validTheme(themeStyles, className)
    if(!validTheme(themeStyles, className)) return noOpObj
    
    config.selector = config.selector.replace(/\s/g, '')
    
    // Check if we should add the styles to the Dom
    const webContent = checkWebPlatform(inline) && { styles: {}, hash: '' }
    const cssProps = buildDataSet(
      className,
      cssStyle,
      webContent,
      customStyles,
      config,
    )

    // When on web, add the styles to a Dom <style> element using React-Helmet
    // This allows using css sudo classes like :hover
    return webContent
      ? { cssProps, children: jsToCss(webContent.styles, webContent.hash), id: webContent.hash }
      : { cssProps, children: '' }

  }, [ themeStyles, customStyles, rootClass, inline, selector, id ])
}
