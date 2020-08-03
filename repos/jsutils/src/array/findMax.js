/** @module array */
import { identity, compareTo } from '../method'
import { findExtrema } from './'

/**
 * @function
 * Returns the maximum element in arr
 * @param {Array<Object>} arr
 * @param {Function?} propSelector - optional property selector for choosing the property to compare with
 * @example
 * const items = [ { num: 1 }, { num: 3 } ]
 * findMax(items, item => item.num) // returns { num: 3 }
 */
export const findMax = (arr = [], propSelector=identity) => findExtrema(
  arr, 
  (x, y) => compareTo(propSelector(x), propSelector(y))
)
