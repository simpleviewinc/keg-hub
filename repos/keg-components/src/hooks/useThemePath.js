import { useMemo } from 'react'
import { useTheme } from '@keg-hub/re-theme'
import {
  deepMerge,
  get,
  isEmptyColl,
  reduceObj,
  noPropObj,
} from '@keg-hub/jsutils'

/**
 * Checks if the styles object is not a valid styles object
 * @param {Object} styles - styles object to be tested
 *
 * @returns {boolean} - false if the styles object is not valid
 */
const validateStyles = styles =>
  !Boolean(!styles || styles === noPropObj || isEmptyColl(styles))

/**
 * Gets the styles from the theme object based on passed in path
 * <br/>If path does not exist, log an error and return the noPropObj
 * @param {Object} theme - App Theme
 * @param {string|Array} path - Path to the styles in the theme
 *
 * @returns {Object} - Found theme styles
 */
const getStylesFromPath = (theme, path) => {
  return (
    (path && get(theme, path)) ||
    (() => {
      process.env.NODE_ENV === 'development' &&
        console.warn(`Could not find path "${path}" on theme`, path, theme)
    })()
  )
}

/**
 * Memorizes building styles object by merging the theme path and user styles
 * If not userStyles, returns the theme pathStyles
 * @param {Object} pathStyles
 * @param {Object} userStyles
 *
 * @returns {Object} - Merged styles object
 */
const mergeStyles = (pathStyles, userStyles) => {
  // If no user styles, just return the pathStyles
  if (!userStyles || userStyles === noPropObj) return pathStyles

  // Get the keys of both to try and find the level of the userStyles
  const pathKeys = Object.keys(pathStyles)
  const userKeys = Object.keys(userStyles)

  // Check if the userKeys has a key at the same level as the pathKeys
  return !userKeys.length
    ? pathStyles
    : pathKeys.indexOf(userKeys[0]) !== -1
      ? // If there is a match, then merge the objects at the top level
      // Example => pathStyles.default && userStyles.default both exist
        deepMerge(pathStyles, userStyles)
      : // Otherwise the userStyles are expected to be one level deeper
      // So add the user styles to each key of the path styles
      // Example => pathStyles.default.main && userStyles.main both exist
      reduceObj(
        pathStyles,
        (key, value, updated) => {
          updated[key] = deepMerge(value, userStyles)
          return updated
        },
        {}
      )
}

/**
 * Finds a theme object from the passed in path and merges it with the passed in styles object
 * Stores the built styles on the state, and updates when passed in arguments change
 * @param {string} path - Path to the styles on the theme
 * @param {Object} styles - Custom styles to override the theme styles
 *
 * @returns {Object} - Built styles object and function to update the styles
 */
export const useThemePath = (path, styles = noPropObj) => {
  // Get access to the theme
  const theme = useTheme()

  return useMemo(() => {
    // Get the styles from the themePath
    const pathStyles = getStylesFromPath(theme, path)

    // Ensure styles is a collection and it's not empty
    const validStyles = validateStyles(styles)

    // If valid custom styles merge with the theme and return it
    // Otherwise if no valid styles or pathStyles just return noPropObj
    return validStyles
      ? mergeStyles(pathStyles, styles)
      : pathStyles || noPropObj
  }, [ theme, path, styles ])
}
