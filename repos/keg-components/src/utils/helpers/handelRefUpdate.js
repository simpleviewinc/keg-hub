import { isObj, checkCall } from '@keg-hub/jsutils'

/**
 * Helper to handel updating a ref based on it's type
 * @param {Object|function} ref - Ref Object to update
 * @param {*} update - Value to update the ref to
 *
 * @returns {Object} - Combined child components
 */
export const handelRefUpdate = (ref, update) => {
  // Update the ref based on it's type
  return isObj(ref) && 'current' in ref
    ? (ref.current = update)
    : checkCall(ref, update)
}