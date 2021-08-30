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
 * @returns {Object} the compiled styles object to be passed to a react or DOM element
 */
export const useCompiledStyles = dynamicStyles => {
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
    () => ({
      key: activeSizeKey,
      size: keyWidth,
      width,
      height,
    }),
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

  compiled.get = getTheme
  compiled.RTMeta = RTMeta
  return compiled
}
