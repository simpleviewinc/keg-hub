/** @module string */

import { isStr } from './isStr'
import { mapString } from './mapString'
import { isLowerCase } from './isLowerCase'
import { isUpperCase } from './isUpperCase'

/**
 * @function
 * @returns a new string with the specified delimiter delimiting each word
 * @param {String} str - string of any casing
 * @param {String} delimiter - e.g. '_'
 * @param {Array} delimiters - optional. An array of delimiter characters on which this function searches and breaks. Defaults to checking -, _, and space
 * @example delimitString('fooBar', '_') // 'foo_Bar'
 */
export const delimitString = (str, delimiter, delimiters=['-', '_', ' ']) => {
  if (!isStr(str)) return str
  const isDelimiter = c => delimiters.some(del => del === c)
  let prevChar = '_'
  return mapString(str, char => {
    if (isDelimiter(char)) {
      prevChar = delimiter 
      return delimiter 
    }

    if (isUpperCase(char) && isLowerCase(prevChar) && !isDelimiter(prevChar)) {
      prevChar = char
      return delimiter + char
    }

    prevChar = char
    return char
  })
}
