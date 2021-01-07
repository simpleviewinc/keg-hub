/** @module string */

import { isStr } from './isStr'

/**
 * Creates a hash from a passed in string consistently
 * <br/> Not intended to be secure
 * <br/> Value comes from being a pure function
 * <br/> Given the same input, it will always return the same output
 * <br/> There is no expectation to convert back from the hash to the original string
 * @function
 * @param {string} str - String to be hashed
 * @param {number=} maxLength - Max length of the returned hash
 *
 * @returns {string} - Hashed version of the string
 */
export const hashString = (str, maxLength=0) => {
  if (!isStr(str) || str.length == 0) return 0

  str = str.split('').reverse().join('')

  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash<<5) - hash) + char
    // Convert to positive 32bit integer
    hash = `${ Math.abs(hash & hash) }`
  }

  return maxLength ? hash.slice(0, maxLength) : hash
}