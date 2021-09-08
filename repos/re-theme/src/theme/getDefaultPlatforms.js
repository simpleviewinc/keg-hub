/** @module theme */
'use strict'

import { Constants } from '../constants'
import { getRNPlatform } from 'RePlatform'
import { get } from '@keg-hub/jsutils'

// Default platforms to use when restructuring the theme
// Use array, so we don't lose the order
export const getDefaultPlatforms = () => {
  const Platform = getRNPlatform()

  const osPlatform = get(Platform, 'OS')

  // Rules for the OS platform ( web || ios || android )
  const stylePlatforms = []

  // If it's not a web platform, then add the $native platform
  if (osPlatform !== 'web') stylePlatforms.push('$native')

  // push current platform
  stylePlatforms.push('$' + osPlatform)

  // Rules for all platforms and os's
  return [Constants.PLATFORM.ALL].concat(stylePlatforms)
}
