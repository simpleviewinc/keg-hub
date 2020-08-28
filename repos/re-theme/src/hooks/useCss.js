import { useMemo } from 'react'
import { getRNPlatform } from '../context/platform'
import { checkCall, get } from '@svkeg/jsutils'
import { useTheme } from './useTheme'

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

// TODO:
// See styleSheet parser about dataClass lookup
// Add check to first and second prop to see if they are a string
// If they are, use them to look them up in the theme to get the styles
// That way the styles don't have to be passed around to each component



/**
 * Create a custom hook for adding styles to the Dom in a web context
 * When on native, will return a dataSet and style prop to be applied to the element
 * @example
 * const { dataSet, style } = useCss(css, style)
 * <View dataSet={ dataSet } style={ style } >My View</View>
 * 
 * @param {Object} css - CssInJs style object with a $class || $className key
 * @param {Object} [style={}] - Custom styles to merge with the theme css
 * @param {string} dataClassName - Name to use as the data-class attribute
 * 
 * @returns { Object } - Current theme
 */
export const useCss = (css, style, dataClassName) => {
  const theme = useTheme()
  
  
  return useMemo(() => {
    // Validate our cssStyles when not in production mode
    process.env.NODE_ENV !== 'production' && validateCss(cssStyle)


    // Extract the $class and $className from the css object
    const { $class, $className, ...cssStyle } = css
    const platform = getRNPlatform()

    // Dynamically create our dataSet object for RN and RN-Web
    const className = dataClassName || $className || $class
    
    // Example of using the className as a ref
    // Should not store the data in eventsForce,
    // Would be better to put in RTMeta
    // const ref = get(theme, `eventsForce.dataClasses.objRef.${className}`)
    // const styles = get(theme, `eventsForce.dataClasses.asObj.${ref}`)
    // console.log(`---------- styles ----------`)
    // console.log(styles)
    
    const dataSet = className ? { class: className } : {}

    return platform.OS !== 'web'

      // If not on web, return an object compatible for React-Native
      ? { dataSet, style: [ cssStyle, style ] }

      // When on web, add the styles to a Dom <style> element using React-Helmet
      // This allows using css sudo classes like :hover
      : checkCall(() => {
          addStylesToHelmet($class, cssStyle, style)

          return { dataSet, style: [ cssStyle, style ] }
        })

  }, [css, style, dataClassName, theme ])
}
