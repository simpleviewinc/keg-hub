/** @module collection */

import { get } from './get'
import { isArr } from '../array/isArr'
import { isNum } from '../number/isNum'
import { isStr } from '../string/isStr'
import { isColl } from './isColl'

/**
 * Compares a collection's keys / values with another collections keys / values
 * @example
 * shallowEqual({ foo: 'bar' }, { foo: 'bar' })
 * // Returns true
 * @example
 * shallowEqual({ foo: 'bar', baz: {} }, { foo: 'bar', baz: {} })
 * // Returns false, because the baz values are different objects
 * @example
 * // Works with array too
 * shallowEqual([ 1, 2 ], [ 1, 2 ])
 * // Returns true
 * @example
 * shallowEqual([{ foo: 'bar' }], [{ foo: 'bar' }])
 * // Returns false, because the objects in index 0 are different
 * @example
 * // Pass a path to compare instead of the root
 * shallowEqual({ foo: { bar: { baz: 'biz' }}}, { foo: { bar: { baz: 'biz' }}}, 'foo.bar')
 * // Returns true, because the bar object is compared
 * @function
 * @param {Object|Array} col1 - Collection to compare
 * @param {Object|Array} col2 - Collection to compare
 * @param {Array|string} path - path of object to compare. Uses the get method to find the path
 *
 * @returns {boolean} - true or false if the objects keys values are equal
 */
export const shallowEqual = (col1, col2, path) => {

  // If a path is passed in, update the collections to be that path
  if(path && (isArr(path) || isStr(path))){
    col1 = get(col1, path)
    col2 = get(col2, path)
  }
  
  // If the objects are the same, so return true
  if(col1 === col2) return true

  // Ensure the objects exist, and they have keys we can compare
  if (!col1 || !isColl(col1) || !col2 || !isColl(col2))
    return false

  // If they have different key lengths, then they are not equal
  if (Object.keys(col1).length !== Object.keys(col2).length) return false
  
  // Loop the keys, and ensure the other collection has the key and it's value is the same
  for (const key in col1)
    if (col1[key] !== col2[key]) return false

  // Keys and values are equal, so return true
  return true
}