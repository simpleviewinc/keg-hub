/** @module collection */

import { isFunc } from '../method/isFunc'
import { isColl } from './isColl'
import { isArr } from '../array/isArr'

/**
 * Loops over a collection and calls a passed in function for each one.
 * @example
 * mapColl([1, 2, 3], (key, val, coll) => { console.log(key) })
 * // Will log all keys of the collection
 * @function
 * @param {Array|Object} - collection to loop over
 * @return {Array|Object} returns the same type of collection passed in
 */
export const mapColl = (coll, cb) => (
  isFunc(cb) && isColl(coll)
    ? Object
      .keys(coll)
      .map(key => cb(key, coll[key], coll))
    : isArr(coll)
      ? []
      : {}
)
