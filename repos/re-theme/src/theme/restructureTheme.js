/** @module theme */
'use strict'

import { ruleHelpers } from '../constants/ruleHelpers'
import { getSizeMap } from '../dimensions'
import { Constants } from '../constants'
import { getRNPlatform } from '../context/platform'
import {
  isObj,
  deepMerge,
  reduceObj,
  isEmpty,
  unset,
  get,
} from '@keg-hub/jsutils'

// Default platforms to use when restructuring the theme
// Use array, so we don't lose the order
const getDefaultPlatforms = () => {
  const Platform = getRNPlatform()
  // Rules for the OS platform ( web || ios || android )
  const stylePlatforms = ['$' + get(Platform, 'OS')]

  // If it's not a web platform, then add the $native platform
  if (get(Platform, 'OS') !== 'web') stylePlatforms.push('$native')

  // Rules for all platforms and os's
  return stylePlatforms.concat([Constants.PLATFORM.ALL])
}

/**
 * Joins the passed in user platform with the default platforms array
 * @param {Object} usrPlatforms - use defined platforms to use when building the theme
 *
 * @returns {Array} - Contains platforms to use when building the theme
 */
const buildPlatforms = usrPlatforms => {
  const platsToUse = Object.keys(usrPlatforms).filter(key => usrPlatforms[key])

  return getDefaultPlatforms().reduce((platforms, plat) => {
    usrPlatforms[plat] !== false &&
      platforms.indexOf(plat) === -1 &&
      platforms.unshift(plat)

    return platforms
  }, platsToUse)
}

/**
 * Searches the theme object for keys that match the passed in size
 * <br/> Maps any found size key objects to the sizedTheme object
 * @function
 * @param {Object} theme - Contains theme style rules
 * @param {Object} sizedTheme - Holds the theme styles for the current size
 * @param {string} size - Current size to search the theme for
 *
 * @returns {Object} theme with the sizes moved to the root level
 */
const buildSizedThemes = (theme, sizedTheme, size) => {
  return reduceObj(
    theme,
    (name, value, sizedTheme) => {
      // Check if the name is a shortcut
      if (ruleHelpers[name]) {
        unset(theme, name)
        theme[ruleHelpers[name]] = value
      }

      // If value is not an object, just return the sizedTheme
      if (!isObj(value)) return sizedTheme

      // If we find the size in the theme, join it with the current sizedTheme
      if (name === size) {
        // Merge the current sizedTheme, with the value for this size
        const mergedSize = deepMerge(sizedTheme, value)

        // Remove the size from the theme
        // Because it gets moved to the size theme section
        unset(theme, [size])

        // Return the merged size
        return mergedSize
      }

      // Call buildSizedThemes for the values object to look for  sizes in child objects
      const subSized = buildSizedThemes(value, sizedTheme[name] || {}, size)

      // If the subSized contains keys, then it has size data
      // So set it to the name for this size
      if (!isEmpty(subSized)) sizedTheme[name] = subSized

      // Return the updated sized theme
      return sizedTheme
    },
    sizedTheme
  )
}

/**
 * Merges styles of any that exist within the platforms object and the theme
 * <br/> If no platforms exists, just return the theme
 * @function
 * @param {Object} theme - Current theme object that holds the style rules
 * @param {boolean} platforms - Platforms to use when building the theme
 *
 * @returns - Merged platform theme rules, or the passed in theme if no rules exist
 */
const mergePlatformOS = (theme, platforms) => {
  const sizeMap = getSizeMap()

  const toMerge = []
  // Loop the platforms and check if they are allowed and the platform exist on theme
  // If is a valid platform add to the toMerge array
  const mergeTheme = Object.keys(theme).reduce((cleanTheme, key) => {
    key[0] === '$' && !sizeMap.hash[key]
      ? platforms.indexOf(key) !== -1 && toMerge.push(theme[key])
      : (cleanTheme[key] = theme[key])

    return cleanTheme
  }, {})

  // If any of the platform theme object exist, then merge them together
  // Otherwise just return the passed in theme object
  return toMerge.length ? deepMerge(...toMerge) : mergeTheme
}

const updatePlatformTheme = (platforms, Platform, themeData) => {
  // If the themeData is not an object, then just return it
  // Because we've hit the rules for this tree in the theme
  if (!isObj(themeData)) return themeData

  // Extract the class && className
  const { $class, $className, ...cleanTheme } = themeData

  const mergedPlatform = getPlatformTheme(
    mergePlatformOS(cleanTheme, platforms),
    platforms,
    Platform
  )

  const className = $className || $class
  className && (mergedPlatform.$class = className)

  return mergedPlatform
}

/**
 * Traverse through the theme to find any keys matching the current platform
 * <br/> Once a platform key is found, any sub-keys of that object are not searched
 * @function
 * @example:
 * # If platform is web
 * const theme = { font: { web: { size: 12, native: {} }, native: { size: 10 } } }
 * const platformTheme = getPlatformTheme(theme)
 * # returns { font: { size: 12, native: {} }}
 *
 * @param {Object} themes - each theme module, keys are names and values are the theme rules
 * @param {boolean} platforms - Platforms to use when building the theme
 *
 * @returns {Object} - Update theme object with platform keys updated
 */
const getPlatformTheme = (theme, platforms, Platform = {}) => {
  if (!theme) return theme

  return reduceObj(
    theme,
    (key, value, platformTheme) => {
      // Update the current get correct value for the platform key
      platformTheme[key] = updatePlatformTheme(platforms, Platform, value)

      // Return the update platformTheme object
      return platformTheme

      // Use the theme as the original platformTheme to return
    },
    theme
  )
}

/**
 * Traverse through the theme to find any size objects matching this size
 * <br/> Adds them to the root size object, and removes from the default paht
 * @function
 * @example:
 * const meetings = { fontSize: 12, small: { fontSize: 10 } }
 * restructureTheme({ meetings })
 * # returns => { small: { meetings: { fontSize: 10 }, meetings: { fontSize: 12 } }
 *
 * @param {Object} themes - each theme module, keys are names and values are the theme rules
 * @param {boolean} usrPlatform - Use a custom user theme Platform
 *
 * @returns {Object} - sized theme object with sizes moved to root size object
 */
export const restructureTheme = (theme, usrPlatform = {}) => {
  const Platform = getRNPlatform()

  // Use the theme based on the platform if it exists
  // Pass in the response after the sizes are set
  // Loop over the size map hash keys
  return Object.keys(getSizeMap().hash).reduce((updatedTheme, size) => {
    // traverse through the theme to find any size objects matching this size
    const builtSize = buildSizedThemes(theme, theme[size] || {}, size)

    // If builtSize is not empty, then size data was found, so set it to the updatedTheme object
    if (!isEmpty(builtSize)) updatedTheme[size] = builtSize

    return updatedTheme
  }, getPlatformTheme(theme, buildPlatforms(usrPlatform), Platform))
}
