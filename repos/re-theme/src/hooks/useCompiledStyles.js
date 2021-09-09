import { useMemo } from 'react'
import { noPropArr } from '@keg-hub/jsutils'
import { useDimensions, getMergeSizes, getSize } from '../dimensions'
import { compileStyles } from '../helpers/compileStyles'
import { getTheme } from '../helpers/getTheme'
import { getPlatforms } from '../helpers/getPlatforms'

/**
 * *(useCompiledStyles helper)*
 * @returns {string} size key for current screen width
 */
const useCurrentSize = () => {
  const dimensions = useDimensions()
  const [ activeSizeKey, widthForSize ] = useMemo(
    () => getSize(dimensions.width),
    [dimensions.width]
  )
  return [ activeSizeKey, widthForSize, dimensions ]
}

/**
 * Returns arrays of the active and inactive platforms
 * @returns {Array} [ activePlatforms, inactivePlatforms ]
 */
const usePlatforms = () => useMemo(() => getPlatforms(), [])

/**
 * Takes in dynamic styles and outputs the compiled styles. Used by `reStyle`
 * @param {Object} dynamicStyles - styles object that can contains size and platform keys,
 *  in addition to style rule shortcuts
 * @param {Boolean} withMeta - if true, adds a theme `get()` method and the `RTMeta` property to the returned styles object
 * @returns {Object} the compiled styles object to be passed to a react or DOM element
 */
export const useCompiledStyles = (dynamicStyles, withMeta = false) => {
  const [ platforms, unusedPlatforms ] = usePlatforms()

  const [ activeSizeKey, keyWidth, { width, height }] = useCurrentSize()
  const [ activeSizes, inactiveSizes ] = useMemo(
    () => getMergeSizes(activeSizeKey) || noPropArr,
    [activeSizeKey]
  )

  const keysToIgnore = useMemo(
    () => unusedPlatforms.concat(inactiveSizes),
    [ unusedPlatforms, inactiveSizes ]
  )

  const RTMeta = useMemo(
    () =>
      withMeta
        ? {
            key: activeSizeKey,
            size: keyWidth,
            width,
            height,
          }
        : null,
    [ activeSizeKey, keyWidth, width, height ]
  )

  const compiled = useMemo(
    () =>
      compileStyles(dynamicStyles, {
        platforms,
        sizes: activeSizes,
        omit: keysToIgnore,
      }),
    [ dynamicStyles, platforms, activeSizeKey ]
  )

  if (withMeta) {
    compiled.get = getTheme
    compiled.RTMeta = RTMeta
  }

  return compiled
}
