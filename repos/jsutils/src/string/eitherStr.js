/** @module string */

import { isStr } from './isStr'

/**
 * Checks if the first param is a string, and returns it.
 * <br> If it's not a string, the second param is returned
 * @function
 * @param {string} str1 - return if is string
 * @param {string} str2 - use if first is not a string
 * @returns {string}
 */
export const eitherStr = (str1, str2) => (
  isStr(str1) && str1 || str2
)
