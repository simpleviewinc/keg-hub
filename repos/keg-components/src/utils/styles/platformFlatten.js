import { getPlatform } from 'KegGetPlatform'
import { get, deepMerge, reduceObj, isObj } from 'jsutils'

const allPlatforms = `$all`
const platform = `$` + getPlatform()
const nonPlatform = platform !== `$web` ? `$web` : `$native`

const platforms = [ allPlatforms, platform, nonPlatform ]

/**
 * Merges an object with platform keys with the original object
 * @param {Object} toMerge - Object to merge with it's platform keys
 *
 * @returns {Object} - Merged object w/ the platform keys merged into it's self
 */
const mergePlatforms = toMerge => {
  // Pull out the platform types to get object without platforms
  const { $all, $web, $native, ...otherKeys } = toMerge

  // Loop over the platform types
  return platforms.reduce((merged, plat) => {
    // Check if the platform should be merged
    const platStyles = plat !== nonPlatform && get(toMerge, [plat])

    // deepMerge the styles if needed
    return platStyles ? deepMerge(merged, platStyles) : merged
  }, otherKeys)
}

/**
 * Flattens an object based on the current platform
 * Merges together with any `$all` keys
 * @param {Object} initial
 *
 * @returns {Object} - Platform flattened object
 */
export const platformFlatten = initial => {
  // Check if initial has platform keys in it
  const hasPlatforms = Object.keys(initial).some(
    key => platforms.indexOf(key) !== -1
  )

  // If it does merge the platforms
  const noPlatforms = (hasPlatforms && mergePlatforms(initial)) || {
    ...initial,
  }

  // Loop the object with no platforms, and check it's children for platforms
  return reduceObj(
    noPlatforms,
    (key, value, merged) => {
      // If the value is an object, flatten the platforms
      // Set the value to the key in the merged object
      merged[key] = isObj(value) ? platformFlatten(value) : value

      return merged
    },
    noPlatforms
  )
}
