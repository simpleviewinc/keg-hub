import { hasDomAccess } from './hasDomAccess'
/**
 * Gets the window dimensions object based on access to the window in a browser
 *
 * @returns {Object} - dimensions object
 */
export const getWindow = () => {
  const winAccess = !hasDomAccess()

  return winAccess
    ? {
        devicePixelRatio: undefined,
        innerHeight: undefined,
        innerWidth: undefined,
        screen: {
          height: undefined,
          width: undefined
        }
      }
    : (() => { return window })()
}
