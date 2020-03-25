/** @module string */

import { delimitString } from './delimitString'

/**
 * Converts a string to snake_case.
 * @function
 * @param {string} str to be converted
 * @example
 *  snakeCase('fooBar') // returns 'foo_bar'
 * @returns the string in snake_case, or the input if it is not a string
 */
export const snakeCase = (str) => {
  const underscored = delimitString(str, '_')
  return underscored.toLowerCase()
}
