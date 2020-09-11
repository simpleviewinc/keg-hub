/*
  It's not straight forward or clear from this code whats happening
  This is mostly related to how react hooks work, It goes like this =>

## useCss Hook

### useMemo section
  1. When useCss is called
    * The styles are built, and converted to a style tree JS object
  2. (web only) - The style tree is then converted into a valid CSS style string
    * The CSS style string is then used to create a hash ID
  3. (web only) - setCssHash is called to check if the hash ID already exists
    * If it does not, setCssHash will add it to the cssHashes Map, and return it
    * If it does, setCssHash will return undefined
  4. After the useMemo hook finishes, it spits out a props object
    * (web only) - the props object contains
      * The hash ID
      * The a flat style object
    * (native only) -  the props object contains
      * A styles object
  5. The props object should be applied directly to the consuming component

### useEffect
  6. A useEffect hook is then set to track the props object returned from the useMemo hook
    * Anytime the useMemo hook returns a new props object, then the useEffect hook runs
    * The useEffect hook clears out all stored hash IDs created in the useMemo section
  7. By design, useEffect hooks do not run until after the component has rendered
    * This means, the hash IDs is not cleared immediately
    * React waits until the entire render cycle has finished ( all components rendered )
    * useEffect essentially gets queued to be called, but is not actually called
  8. It follows this flow =>
    1. React calls Component
    2. Component calls useCss
    3. useCss calls setCssHash
      * setCssHash creates and adds a hash ID if it does not already exist
    4. useEffect gets queued up to clear out the hash IDs
      * But does not run until after the React render cycle
  9. This flow means if two Components call useCss with the same styles
    * Only ONE of the Components will get a hash ID returned
    * The other Component will get undefined
  
  ### headComponents => headElement
  10. Each of the /head/headComponents is just a wrapper for /head/headElement
    * They all work the same way, and expect the hash ID returned from useCss as a prop
  11. /head/headElement Component checks the hash ID
    * If it's defined, it renders the styles to the head
    * If it's undefined, it just returns null
  12. This means only 1 instance of the styles are rendered
    * When two components have the same styles, only 1 gets a hash ID
    * So only 1 of them will have their styles applied to the Dom
  13. After the React render cycle is finished, the useEffect hooks are run
    * Which clear out the hash IDs so the process can start over again on the next render
*/

import { useTheme } from './useTheme'
import { noOpObj } from '../helpers/noOp'
import { useEffect, useMemo } from 'react'
import { jsToCss } from '../styleParser/jsToCss'
import { getRNPlatform } from '../context/platform'
import { stringHasher } from '../helpers/stringHasher'
import { hasDomAccess } from '../helpers/hasDomAccess'
import { generateDataSet } from '../styleParser/generateDataSet'
import { checkCall, get, isStr, isObj, exists, isEmptyColl } from '@keg-hub/jsutils'

/**
 * Cache holder for quick check if we're using web styles or not
 * <br/> Can be overridden by passing inline to the useCss hook
 * @object
 */
let __webPlatform

/**
 * Cache holder for hash IDs
 * @object
 */
const cssHashes = new Map()

/**
 * Converts the passed in children to a hash ID
 * <br/>Then checks if that hash ID already exists
 * <br/>If not, then it save the hash ID to the cssHashes and returns the hash ID
 * <br/>If it does exist, then undefined is returned
 * @function
 * @param {string} children - CssInJs style object
 *
 * @returns {string|undefined} - The hash ID if it does not already exist
 */
const setCssHash = children => {
  const hash = isStr(children) && stringHasher(children)
  if(!hash || cssHashes.has(hash)) return undefined

  cssHashes.set(hash, 1)

  return hash
}

/**
 * Validates the passed in theme style object to ensure the key value pairs are style rules
 * <br/>If style object is not valid, then it will throw!
 * <br/>Should only run in production
 * <br/>Bypassed when in production
 * @function
 * @param {Object} style - CssInJs style object
 * @param {string} selector - Root class name for build the sub-data-call attributes
 *
 * @returns {boolean} - If themeStyles is a valid styles object
 */
const validTheme = (themeStyles, selector) => {
  return process.env.NODE_ENV === 'production' ||
    Boolean(isObj(themeStyles) && selector) ||
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
 * Custom hook for adding styles to the Dom in a web context
 * When on native, will return a dataSet and style prop to be applied to the element
 * @example
 * const { cssProps, styleProps } = useCss(styleRef, customStyles, config)
 * <Style {...cssProps} />
 * <View {...styleProps} >My View</View>
 * 
 * @param {Object|string} styleRef - CssInJs style object with a $class || $className key
 *                                   Or a dot separate string path within the main Theme
 * @param {Object} [customStyles={}] - Custom styles to merge with the theme css
 * @param {Object} config - Defines how the hook should build the dataSet and styles
 * @param {boolean} [config.inline=false] - Always return inline styles
 * @param {string} [config.selector=styleRef.$class] - Root css selector to use for all dataSet props overrides $class in theme
 * @param {string} config.prefix - Filters only theme objects that start with this prefix
 * @param {string|function} config.format - Template for building the css selector
 * 
 * @returns { Object } - Current theme
 */
export const useCss = (styleRef, customStyles, config={}) => {
  const { rootClass, inline, selector, id } = config

  const theme = useTheme()
 
  // Check if the styleRef is a theme path as a string
  // Or it could be an style object from the theme
  const themeStyles = useMemo(() => {
    return isStr(styleRef) ? get(theme, styleRef, noOpObj) : (styleRef || noOpObj)
  }, [ styleRef, theme ])
  
  // Ensure the custom styles are an object and not empty
  const custom = !customStyles || !isObj(customStyles) || isEmptyColl(customStyles)
    ? noOpObj
    : customStyles

  const props = useMemo(() => {
    // Extract the $class and $className from the themeStyles
    const { $class, $className, ...cssStyle } = (themeStyles || noOpObj)
    const selector = rootClass || $className || $class || id

    if(!validTheme(themeStyles, selector)) return noOpObj

    // Check if we should add the styles to the Dom
    const webContent = checkWebPlatform(inline) && { style: {} }

    // Builds the dataSet prop dynamically form 
    // The passed in cssStyle object
    const { styleProps, web } = generateDataSet(
      webContent,
      cssStyle,
      custom,
      { selector, ...config }
    )

    if(!web) return styleProps

    // If on the web built the hash ID for the styles
    // TODO: convert the web.style object into a css string
    web && (web.hash = setCssHash(`.test-class { margin: 10px; }`))

    // When on web, add the styles to a Dom <style> element
    return web

  }, [ themeStyles, custom, rootClass, inline, selector, id ])


  useEffect(() => {
    cssHashes.size && cssHashes.clear()
  }, [ props ])

  return props
}
