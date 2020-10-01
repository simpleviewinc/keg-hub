/** @module string */

import { isStr } from './isStr'

/**
 * Converts first letter of a string to be capitalized.
 * @function
 * @param {string} string
 * @param {boolean} lowercaseTail - if true, will also lowercase the all characters except the first
 * @return {string} - Passed in string, but capitalized
 */
export const capitalize = (str, lowercaseTail=true) => {
  if (!isStr(str) || !str[0]) return str
  const tail = lowercaseTail
    ? str.slice(1).toLowerCase()
    : str.slice(1)
  return `${str[0].toUpperCase()}${tail}`
}
