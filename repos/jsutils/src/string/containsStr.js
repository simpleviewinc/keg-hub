/** @module string */

import { isStr } from './isStr'
import { toStr } from './toStr'


/**
 * Checks if a string contains another string.
 * @function
 * @param {string} string - value to be checked
 * @param {string} substring - value to search for
 * @return {boolean} - if the substring exists string
 */
export const containsStr = (str, substring, fromIndex) => {
  str = !isStr(str) && toStr(str) || str
  substring = !isStr(substring) && toStr(substring) || substring

  return str.indexOf(substring, fromIndex) !== -1;
}
