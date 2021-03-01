/** @module string */
import { isStr } from './isStr'

/**
 * Checks if the string contains quoted text
 * @function
 * @param {string} str 
 * @return {boolean} true if `str` is a quoted string
 * @example
 * isQuoted('foo') // false
 * @example
 * isQuoted('"foo"') // true
 */
export const isQuoted = str => {
  return isStr(str) && 
    str.startsWith('"') &&
    str.endsWith('"')
}