/** @module object */

import { isFunc } from '../method/isFunc'
import { set } from '../collection/set'
import { isArr } from '../array/isArr'
import { isObj } from './isObj'
import { isEntry } from './isEntry'

/**
 * Returns a new object, each entry of which is the result of applying the cb function to input's corresponding entry 
 * @param {Object | Array} obj - regular object or array
 * @param {Function} cb  - function of form: (key, value) => [nextKey, nextValue]
 *  - the return type here is an array of two elements, key and value, where `key` must be either a string or a number
 *  - if a cb does not return an entry, then the original [key, value] pair that was passed into cb will be used instead
 * @example mapObj({a: 2, b: 3}, (k, v) => [k, v * v]) returns: {a: 4, b: 9}
 * @example mapObj({a: 1}, (k, v) => ['b', v]) returns: {b: 1}
 * @function
 *
 * @returns new object with mapping applied, or the original obj if input was invalid
 */
export const mapEntries = (obj, cb) => {
  if (!isArr(obj) && !isObj(obj)) {
    console.error(obj, `Expected array or object for obj. Found ${typeof obj}`)
    return obj
  }

  if (!isFunc(cb)) {
    console.error(`Expected function for cb. Found ${typeof cb}`)
    return obj
  }

  const entries = Object.entries(obj)

  const initialValue = isArr(obj) ? [] : {}

  return entries.reduce(
    (obj, [key, value]) => {
      const result = cb(key, value)
      if (!isEntry(result)) {
        console.error(`Callback function must return entry. Found: ${result}. Using current entry instead.`)
        return set(obj, key, value)
      } 
      return set(obj, result[0], result[1])
    },
    initialValue
  )
}