/** @module object */

import { isFunc } from '../method/isFunc'
import { isObj } from './isObj'
import { reduceObj } from './reduceObj'

/**
 * Returns a new object, consisting of every key-value pair from obj that, when passed into the predicate, returned true
 * @function
 * @param {*} obj - regular object
 * @param {*} predicate  - function of form: (key, value) => Boolean
 * @returns object consisting of a subset of the entries from obj
 * @example: filterObj({a: 2, b: 3}, (k, v) => (v > 2)) returns: {b: 3}
 */
export const filterObj = (obj, predicate) => {
  if (!obj) return obj

  if (!isObj(obj)) {
    console.error(`Object ${obj} was not an object. It must be for filterObject`)
    return obj
  }

  if (!isFunc(predicate)) {
    console.error(`Argument 'predicate' passed into filterObject must a function. Found: ${predicate}`)
    return obj
  } 

  return reduceObj(
    obj,
    (key, value, data) => {
      if (predicate(key, value))
        data[key] = value
      return data
    },
    {}
  )
}
