/** @module collection */

import { isFunc } from '../method/isFunc'
import { isColl } from './isColl'
import { isArr } from '../array/isArr'

/**
 * Loops over collection and calls reduce.
 * @example
 * reduceColl([1, 2, 3], (key, val, coll) => { console.log(key) }, {})
 * // Returns what ever is returned from the last iteration of the reduce loop
 * @function
 * @param {Object} obj - object loop over
 * @param {function} path - path that should be created on the object, separated by .
 * @param {*} reduce - starting data passed to reduce method
 * @return {Object} - last returned data from the loop
 */
export const reduceColl = (coll, cb, reduce) => (
  isFunc(cb) && isColl(coll)
    ? Object
      .keys(coll)
      .reduce((data, key) => cb(key, coll[key], coll, data), reduce)
    : isArr(coll)
      ? []
      : {}
)
