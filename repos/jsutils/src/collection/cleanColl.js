/** @module collection */

import { isObj } from '../object/isObj'
import { isColl } from './isColl'

/**
 * Cleans a collection by creating a new collection
 * With the null and undefined values removed
 * @function
 * @param {Object|Array} coll - Collection to remove empty values from
 * @param {boolean} [recursive=true] - Should recursively clean child values
 *
 * @returns {Object|Array} - Cleaned collection
 */
export const cleanColl = (coll, recursive=true) => {
  return isColl(coll)
    ? Object.keys(coll)
      .reduce((cleaned, key) => {
        const value = coll[key]
        if(value === null || value === undefined) return cleaned

        cleaned[key] = recursive && isColl(value)
          ? cleanColl(value)
          : value

        return cleaned
      }, isObj(coll) && {} || [])
    : console.error(`cleanColl requires a collection as the first argument`) || coll
}