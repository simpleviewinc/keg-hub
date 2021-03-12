/** @module string */
import { isStr } from './isStr'

/**
 * Reverses string
 * @function
 * @param {string} str - string to reverse
 * @return {string} reversed str
 * @example
 * reverseStr('foo') // 'oof'
 */
export const reverseStr = str => {
  if (!isStr(str)) return undefined
  let reversed = ''
  for (let char of str) {
    reversed = char + reversed
  }
  return reversed
}

