import { useMemo } from 'react'
import { noPropArr } from '@keg-hub/jsutils'
import { getDefaultPlatforms } from '../theme/restructureTheme'
import { Constants } from '../constants'
import { 
  useDimensions, 
  getMergeSizes, 
  getSize 
} from '../dimensions'
import { compileStyles } from '../helpers/compileStyles'

const PLATFORM = Constants.PLATFORM

/**
 * *(useCompiledStyles helper)*
 * @returns {string} size key for current screen width
 */
const useCurrentSize = () => {
  const { width } = useDimensions()
  const [ activeSizeKey ] = useMemo(() => getSize(width), [ width ])
  return activeSizeKey
}

/**
 * Returns arrays of the active and inactive platforms
 * @returns {Array} [ activePlatforms, inactivePlatforms ]
 */
const usePlatforms = () => {
 return useMemo(() => {
    const active = getDefaultPlatforms()
    const inactive = Object
      .values(PLATFORM)
      .filter(key => !active.includes(key))

    return [ active, inactive ]
  }, [])
}

/**
 * Takes in dynamic styles and outputs the compiled styles. Used by `reStyle`
 * @param {Object} dynamicStyles - styles object that can contains size and platform keys, 
 *  in addition to style rule shortcuts
 * @returns {Object} the compiled styles object to be passed to a react or DOM element 
 */
 export const useCompiledStyles = dynamicStyles => {
  const [ platforms, unusedPlatforms ] = usePlatforms()

  const activeSizeKey = useCurrentSize()
  const [ activeSizes, inactiveSizes ] = useMemo(
    () => getMergeSizes(activeSizeKey) || noPropArr,
    [ activeSizeKey ]
  )

  const keysToIgnore = useMemo(
    () => unusedPlatforms.concat(inactiveSizes),
    [ unusedPlatforms, inactiveSizes ]
  )

  return useMemo(
    () => compileStyles(dynamicStyles, { 
      platforms, 
      sizes: activeSizes, 
      omit: keysToIgnore
    }),
    [ dynamicStyles, platforms, activeSizeKey, keysToIgnore ]
  )
}

