/** @module method */

import { isStr } from '../string'
import { isOrderable } from './isOrderable'
import { validate } from '../validation'

/**
 * @function
 * Generic compare to method that works for strings, numbers, and booleans
 * @param {string | number | boolean} x 
 * @param {string | number | boolean} y 
 * @return { number | null } - returns a value < 0 if x is less than y, 0 if they are equal, and a value greater than 0 if x is greater than y. Returns null if the args are not comparable.
 */
export const compareTo = (x, y) => {
  const [ valid ] = validate({ x, y }, { $default: isOrderable }) 
  if (!valid) return null
  return isStr(x)
    ? (x.localeCompare(y))
    : (x - y)
}