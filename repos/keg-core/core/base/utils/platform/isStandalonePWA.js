import { isNative } from './isNative'
import { getWindow } from './getWindow'
import { getNavigator } from './getNavigator'

/**
 * @returns { Boolean } - true if the app is running as a standalone pwa on web
 */
export const isStandalonePWA = () => {
  // if window or navigator are undefined, then we are not on web (probably native)
  if (isNative() || !getWindow() || !getNavigator()) return false

  const query = '(display-mode: standalone)'

  return getNavigator().standalone || getWindow().matchMedia(query).matches
}