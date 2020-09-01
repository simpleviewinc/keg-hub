import { useTheme } from './useTheme'
import { noOpObj } from '../helpers/noOp'
import { jsToCss } from '../styleParser/jsToCss'
import { HeadContext } from '../head/headContext'
import React, { useContext, useMemo } from 'react'
import { getRNPlatform } from '../context/platform'
import { hasDomAccess } from '../helpers/hasDomAccess'
import { generateDataSet } from '../styleParser/generateDataSet'
import { checkCall, get, isStr, isObj, exists, uniqArr, isEmpty } from '@svkeg/jsutils'

/**
 * Cache holder for quick check if we're using web styles or not
 * <br> Can be overridden by passing inline to the useCss hook
 * @object
 */
let __webPlatform


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
      `[ ReTheme ERROR ] - Invalid styleRef`,
      `\n   - useCss hook requires a valid theme reference of type 'Object' || 'string'`,
      `\n   - As string - must be a dot delimited path to a styles object on the global theme`,
      `\n   - As Object - must be a valid CssInJs styles object`,
      `\n`,
      `\n   - A 'root class' of type 'string' is also required`,
      `\n   - It can be a key on the 'styleRef' as '$class' or '$className'`,
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

/**
 * Create a custom hook for adding styles to the Dom in a web context
 * When on native, will return a dataSet and style prop to be applied to the element
 * @example
 * const { cssProps, styleProps } = useCss(styleRef, customStyles, rootClass)
 * <Style {...styleProps} />
 * <View {...cssProps} >My View</View>
 * 
 * @param {Object|string} styleRef - CssInJs style object with a $class || $className key
 *                                   Or a dot separate string path within the main Theme
 * @param {Object} [customStyles={}] - Custom styles to merge with the theme css
 * @param {string} rootClass - Name to use as the root data-class attribute
 * 
 * @returns { Object } - Current theme
 */
export const useCss = (styleRef, customStyles, config={}) => {
  const { rootClass, inline, selector, id } = config
  
  const theme = useTheme()
  const head = useContext(HeadContext)

  // Check if the styleRef is a theme path as a string
  // Or it could be an style object from the theme
  const themeStyles = isStr(styleRef) ? get(theme, styleRef, noOpObj) : (styleRef || noOpObj)
  
  // Ensure the custom styles are an object and not empty
  const custom = isEmpty(customStyles) || !isObj(customStyles) ? noOpObj : customStyles

  return useMemo(() => {
    // Extract the $class and $className from the themeStyles
    const { $class, $className, ...cssStyle } = (themeStyles || noOpObj)
    const className = rootClass || $className || $class || id

    if(!validTheme(themeStyles, className)) return noOpObj

    // Check if we should add the styles to the Dom
    const webContent = checkWebPlatform(inline) && { styles: {}, hash: [] }

    // Builds the dataSet prop dynamically form 
    // The passed in cssStyle object
    const { cssProps, web } = generateDataSet(
      webContent,
      cssStyle,
      custom,
      { className, ...config }
    )

    if(!web) return { cssProps, styleProps: {} }

    // TODO: this it not currently being handled after the refactor
    // Need to update to use the hash based on custom styles
    const hashId = web && uniqArr(web.hash).join('-')

    // When on web, add the styles to a Dom <style> element using React-Helmet
    // This allows using css sudo classes like :hover
    return {
      cssProps,
      styleProps: {
        id: hashId,
        // Only build the styles if the hashId does not all ready exist
        children: head.hasHash(hashId) ? '' : jsToCss(web.styles, hashId),
      }
    }

  }, [ themeStyles, custom, rootClass, inline, selector, id ])
}
