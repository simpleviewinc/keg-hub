import { useMemo } from 'react'
import { getRNPlatform } from '../context/platform'


const addStylesToHelmet = ($class, cssStyle, dataSet, style) => {

  return { dataSet, style }
}

/*
// theme/sessionTime.js
export const sessionTime = {
  main: {
    $class: 'session-time-main',
    // ....other styles
  }
}
*/

/**
 * Validates the passed in object to ensure the key value pairs are style rules
 * <br/>If style object is not valid, then it will throw!
 * <br/>Should only run in production
 * @function
 * @param {Object} style - CssInJs style object
 * 
 * @returns {Object} - Validate object
 */
const validateCss = (style) => {
  
}

/**
 * Create a custom hook for adding styles to the Dom in a web context
 * When on native, will return a dataSet and style prop to be applied to the elemnt
 * @example
 * const { dataSet, style } = useCss(css, style)
 * <View dataSet={ dataSet } style={ style } >My View</View>
 * 
 * @param {Object} css - CssInJs style object with a $class || $className key
 * @param {Object} [style={}] - Custom styles to merge with the theme css
 * 
 * @returns { Object } - Current theme
 */
export const useCss = (css, style) => {
  return useMemo(() => {

    // Validate our cssStyles when not in production mode
    process.env.NODE_ENV !== 'production' && validateCss(cssStyle)

    // Extract the $class and $className from the css object
    const { $class, $className, ...cssStyle } = css
    const platform = getRNPlatform()

    // Dynamically create our dataSet object for RN and RN-Web
    const className = $className || $class
    const dataSet = className ? { class: className } : {}

    return platform.OS !== 'web'

      // If not on web, return an object compatible for React-Native
      ? { dataSet, style: [ cssStyle, style ] }

      // When on web, add the styles to a Dom <style> element using React-Helmet
      // This allows using css sudo classes like :hover
      : checkCall(() => {
          addStylesToHelmet($class, cssStyle, style)

          return { dataSet, style: [] }
        })

  }, [css, style])
}
