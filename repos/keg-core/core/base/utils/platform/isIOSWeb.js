import { isNative } from './isNative'
import { getWindow } from './getWindow'
import { getNavigator } from './getNavigator'

/**
 * @returns { Boolean } true if current device is running iOS on web
 * @see https://stackoverflow.com/a/9039885/4039256
 */
export const isIOSWeb = () => {
  // if the window or navigator globals are undefined, then we are not on web (probably native)
  if (isNative() || !getWindow() || !getNavigator()) return false

  return (
    /iPad|iPhone|iPod/.test(getNavigator().userAgent) && !getWindow().MSStream
  )
}
