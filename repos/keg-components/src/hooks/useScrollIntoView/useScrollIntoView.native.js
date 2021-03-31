import { noPropArr } from '@keg-hub/jsutils'

/**
 * Not yet implemented in native.
 * @param {RefObject} ref - ref to element
 * @param {boolean} shouldScroll - if true, keep ref.current visible
 * @param {boolean|object} scrollOptions - options as defined at
 *    https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView#parameter
 */
export const useScrollIntoView = () => {
  logData(
    'useScrollIntoView is not implemented for native platforms yet.',
    'warn'
  )
  return noPropArr
}
