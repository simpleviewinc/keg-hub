import { useLayoutEffect, useState } from 'react'
import { useTheme } from '@svkeg/re-theme'
import {
  get,
  deepMerge,
  reduceObj,
  logData,
  checkCall,
  isEmptyColl,
  jsonEqual,
} from '@svkeg/jsutils'

/**
 * Checks if two style object are valid and the same
 * @param {Object} current - Current styles object being used
 * @param {string|Array} updates - Updated styles object to validate agains
 *
 * @returns {boolean} - If the style objects are equal to each other
 */
const stylesEqual = (current, updates) => {
  return (current && !updates) || (!current && updates)
    ? false
    : Boolean(
      (!current && !updates) ||
          (isEmptyColl(current) && isEmptyColl(updates)) ||
          jsonEqual(current, updates)
    )
}

/**
 * Gets the styles from the theme object based on passed in path
 * @param {Object} theme - App Theme
 * @param {string|Array} path - Path to the styles in the theme
 *
 * @returns {Object} - Found theme styles
 */
const getStylesFromPath = (theme, path) => {
  // Get the styles from the passed in path on the theme
  // If they don't exist, then try to get the default
  return (
    get(theme, path) ||
    checkCall(() => {
      logData(`Could not find ${path} on theme`, theme, `warn`)

      // Replace the last item, with default
      const split = path.split('.')
      split[split.length] = 'default'

      // Try to get the defaults
      return get(theme, split, {})
    })
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
  if (!userStyles) return pathStyles

  // Get the keys of both to try and find the level of the userStyles
  const pathKeys = Object.keys(pathStyles)
  const userKeys = Object.keys(userStyles)

  // Check if the userKeys has a key at the same level as the pathKeys
  return pathKeys.indexOf(userKeys[0]) !== -1
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
 * Builds the theme styles by getting the styles from the path, and merging with the styles
 * @param {Object} theme - App Theme
 * @param {string|Array} path - Path to the styles in the theme
 * @param {Object} styles - Custom user styles
 *
 * @returns {Object} - Merged theme styles
 */
const buildTheme = (theme, path, styles) => {
  return mergeStyles(getStylesFromPath(theme, path), styles)
}

/**
 * Finds a theme object from the passed in path and merges it with the passed in styles object
 * Stores the built styles on the state, and updates when passed in arguments change
 * @param {string} path - Path to the styles on the theme
 * @param {Object} styles - Custom styles to override the theme styles
 *
 * @returns {Array} - Built styles object and function to update the styles
 */
export const useThemePath = (path, styles) => {
  // Ensure styles is a collection and it's not empty
  const [ userStyles, setUserStyles ] = useState(styles)
  const customEqual = stylesEqual(styles, userStyles)

  // Get access to the theme
  const theme = useTheme()

  // Create the themeStyles from the passed in styles and the theme pathStyles
  const [ themeStyles, setThemeStyles ] = useState(
    buildTheme(theme, path, styles)
  )

  // Use the layoutEffect hook to ensure it runs before the dom paint happens
  useLayoutEffect(() => {
    // Build the theme styles
    const updatedStyles = buildTheme(theme, path, styles)

    // Check the current themeStyles with the updatedStyles
    if (stylesEqual(themeStyles, updatedStyles)) return

    // If user styles are not equal to the passed in styles then update them
    !customEqual && setUserStyles(styles)

    // If the current themeStyles are not equal the updateTheme styles, update them
    setThemeStyles(updatedStyles)

    // Track changes on the foundStyles ( theme ) and styles ( user ) object
    // If the theme or user styles change we want to re-run the hook to get the updates
  }, [ theme, path, customEqual ])

  return [ themeStyles, setThemeStyles ]
}
