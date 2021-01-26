import { getPlatform } from 'KegGetPlatform'
const isWeb = getPlatform() === 'web'

const defLayout = { top: 0, left: 0 }

/**
 * Helper to get a normalize layout location of the passed in element
 * @param {Object} el - Dom Element to get the layout for
 *
 * @returns {Object} - Layout of the passed in Dom Element
 */
export const getElementLayout = el => {
  // If not on a web platform, we should not try to access the window / document objects
  if (!isWeb) return defLayout

  const rect = el.getBoundingClientRect()
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop

  return {
    top: rect.top + scrollTop,
    left: rect.left + scrollLeft,
  }
}
