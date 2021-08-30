import { getDefaultPlatforms } from '../theme/restructureTheme'
import { Constants } from '../constants'
const PLATFORM = Constants.PLATFORM

/**
 * Returns arrays of the active and inactive platforms
 * @returns {Array} [ activePlatforms, inactivePlatforms ]
 */
export const getPlatforms = () => {
  const active = getDefaultPlatforms()
  const inactive = Object.values(PLATFORM).filter(key => !active.includes(key))

  return [ active, inactive ]
}
