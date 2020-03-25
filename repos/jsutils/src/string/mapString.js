/** @module string */

import { isFunc } from '../method/isFunc'
import { isStr } from './isStr'

/**
 * Maps a string by applying function `charMapper` to each character.
 * @function
 * @param {string} str to be mapped
 * @param {Function} charMapper - function of form (character) => <some character or string>
 * @returns a new string, with each character mapped by charMap. If str is not a string or charMapper not a function, just returns str
 * @example
 *  mapString("hello", c => c === 'h' ? 'x' : c) // returns 'xello'
 */
export const mapString = (str, charMapper) => {
  if (!isStr(str)) return str
  if (!isFunc(charMapper)) return str
  let result = ""
  for (const char of str) {
    result += charMapper(char)
  }
  return result
}