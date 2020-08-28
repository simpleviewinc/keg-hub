import { useMemo } from 'react'
import { getRNPlatform } from '../context/platform'
import { checkCall, get, isStr, isObj, isArr, reduceObj } from '@svkeg/jsutils'
import { useTheme } from './useTheme'

const noOp = {}

const addStylesToHelmet = ($class, cssStyle, dataSet, style) => {
  return { dataSet, style }
}

/**
 * Validates the passed in object to ensure the key value pairs are style rules
 * <br/>If style object is not valid, then it will throw!
 * <br/>Should only run in production
 * @function
 * @param {Object} style - CssInJs style object
 *
 * @returns {Object} - Validate object
 */
// Validate our cssStyles when not in production mode
// process.env.NODE_ENV !== 'production' && validateCss(cssStyle)
const validateCss = (style) => {
  
}


// TODO:
// See styleSheet parser about dataClass lookup
// Add check to first and second prop to see if they are a string
// If they are, use them to look them up in the theme to get the styles
// That way the styles don't have to be passed around to each component
// Example of using the className as a ref
// Should not store the data in eventsForce,
// Would be better to put in RTMeta
// const ref = get(theme, `eventsForce.dataClasses.objRef.${className}`)
// const styles = get(theme, `eventsForce.dataClasses.asObj.${ref}`)
// console.log(`---------- styles ----------`)
// console.log(styles)

/*

SessionTime.dataSet = {
  main: { class: 'ef-sessions-date-time main' },
  content: {
    main: { class: 'ef-sessions-date-time content main' },
    icon: { class: 'ef-sessions-date-time content icon' },
    text: { class: 'ef-sessions-date-time content text' },
  }
}


*/

const buildDataSet = (rootClass, cssStyles, customStyles, isWeb) => {
  return reduceObj(cssStyles, (key, value, styles) => {
    styles = styles.content || styles
    // Check if value is an object
    // If it is, we know the key should be added to the dataSet
    if(isObj(value)){

      const className = `${rootClass}-${key}`
      // Recursively call buildDataSet on each child object of the original styles
      const { content, web } = buildDataSet(
        className,
        value,
        isObj(customStyles) && customStyles[key],
        isWeb
      )

      styles[key] = content
      

      // If the style key was added, then add that dataSet too
      styles[key].style && ( styles[key].dataSet = { class: className } )

    }
    else {
      
      // If it's not an object, it must by style rules
      // So set the current class name to equal
      styles.style = styles.style || {}
      styles.style[key] = customStyles[key] || value
    }

    return { content: styles, web: styles.style }

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
export const useCss = (themeRef, customStyles, rootClass) => {

  const theme = useTheme()

  // Check if the themeRef is a theme path as a string
  // Or it could be an style object from the theme
  const themeStyles = isStr(themeRef) ? get(theme, themeRef, noOp) : (themeRef || noOp)

  return useMemo(() => {
    isObj(themeStyles)
  
    // Extract the $class and $className from the themeStyles
    const { $class, $className, ...cssStyle } = themeStyles

    const platform = getRNPlatform()
    const { content:dataSet } = buildDataSet(
      rootClass || $className || $class,
      cssStyle,
      customStyles,
      platform.OS === 'web'
    )

    console.log(`---------- dataSet ----------`)
    console.log(dataSet)

    // When on web, add the styles to a Dom <style> element using React-Helmet
    // This allows using css sudo classes like :hover
    platform.OS === 'web' && addStylesToHelmet(dataSet)


    return dataSet

  }, [ themeStyles, customStyles, rootClass ])
}
