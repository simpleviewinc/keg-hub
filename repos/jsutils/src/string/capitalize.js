/** @module string */

import { isStr } from './isStr'

/**
 * Converts first letter of a string to be capitalized.
 * @function
 * @param {string} string
 * @return {string} - Passed in string, but capitalized
 */
export const capitalize = str => (
  isStr(str) && str[0] && `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}` || str
)
