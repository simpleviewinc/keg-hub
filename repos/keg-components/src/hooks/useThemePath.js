import { useLayoutEffect, useState, useMemo } from 'react'
import { get, deepMerge, reduceObj, logData, jsonEqual } from 'jsutils'
import { useTheme } from '@simpleviewinc/re-theme'

/**
 * Checks it two passed in objects are equal pointers or equal as json strings
 * @param {Object} obj1 - Object to check
 * @param {Object} obj2 - Object to check
 *
 * @returns {boolean} - If objects are equal
 */
const checkEqual = (obj1, obj2) => obj1 === obj2 || jsonEqual(obj1, obj2)

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
    (() => {
      logData(`Could not find ${path} on theme`, theme, `warn`)

      // Replace the last item, with default
      const split = path.split('.')
      split[split.length] = 'default'

      // Try to get the defaults
      return get(theme, split, {})
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
const getStyles = (pathStyles, userStyles) =>
  useMemo(() => {
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
  }, [ pathStyles, userStyles ])

/**
 * Finds a theme object from the passed in path and merges it with the passed in styles object
 * Stores the built styles on the state, and updates when passed in arguments change
 * @param {string} path - Path to the styles on the theme
 * @param {Object} styles - Custom styles to override the theme styles
 *
 * @returns {Array} - Built styles object and function to update the styles
 */
export const useThemePath = (path, styles) => {
  // Get access to the theme
  const theme = useTheme()

  // Get the styles from the passed in path on the theme
  const foundStyles = getStylesFromPath(theme, path)

  // Add the found path styles to the state, so we can compare it later
  const [ pathStyles, setPathStyles ] = useState(foundStyles)

  // Set the default user styles
  const [ userStyles, setUserStyles ] = useState(styles)

  // Create the themeStyles from the passed in userStyles and the theme pathStyles
  const [ themeStyles, setThemeStyles ] = useState(
    getStyles(pathStyles, userStyles)
  )

  // Use the layoutEffect hook to ensure it runs before the dom paint happens
  // This way we don't cause a re-paint when the styles change
  useLayoutEffect(() => {
    // Check if the styles have updated
    const userEqual = checkEqual(styles, userStyles)
    const pathEqual = checkEqual(foundStyles, pathStyles)

    if (userEqual && pathEqual) return

    // If there's a change to the user styles, update them on the state
    !userEqual && setUserStyles(styles)

    // If there's a change to the theme path styles, update them on the state
    !pathEqual && setPathStyles(foundStyles)

    // If there's a change to the userStyles || pathStyles, update the themeStyles
    ;(!userEqual || !pathEqual) &&
      setThemeStyles(getStyles(pathStyles, userStyles))

    // Track changes on the foundStyles ( theme ) and styles ( user ) object
    // If the theme or user styles change we want to re-run the hook to get the updates
  }, [ foundStyles, styles ])

  return [ themeStyles, setThemeStyles ]
}
