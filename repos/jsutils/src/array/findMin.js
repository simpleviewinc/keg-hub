/** @module array */
import { identity, compareTo } from '../method'
import { findExtrema } from './'

/**
 * @function
 * Returns the minimum element in arr
 * @param {Array<Object>} arr
 * @param {Function?} propSelector - optional property selector for choosing the property to compare with
 * @example
 * const items = [ { num: 1 }, { num: 3 } ]
 * findMax(items, item => item.num) // returns { num: 1 }
 */
export const findMin = (arr = [], propSelector=identity) => findExtrema(
  arr, 
  (x, y) => compareTo(propSelector(y), propSelector(x))
)
