/** @module collection */

import { isColl } from './isColl'
import { isArr } from '../array/isArr'

/**
 * Checks if passed in obj || array is empty.
 * @example
 * isEmptyColl({})
 * // Returns true
 * @example
 * isEmptyColl({ foo: 'bar' })
 * // Returns false
 * @example
 * isEmptyColl([])
 * // Returns true
 * @function
 * @param {Object} obj - object to check if empty
 * @return {boolean}  true || false
 */
export const isEmptyColl = obj => (
  isArr(obj)
    ? obj.length === 0
    : isColl(obj) && Object.getOwnPropertyNames(obj).length === 0
)
