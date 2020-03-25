/** @module object */

import { isObj } from './isObj'
import { reduceObj } from './reduceObj'

/**
 * Creates a new object from passed in object with keys not defined from array.
 * @function
 * @param {Object} target - object to pull keys from
 * @param {Array} keys - keys to not add to new object
 * @return {Object} new object with only keys not in array
 */
export const omitKeys = (obj = {}, keys = []) => (
  isObj(obj) && reduceObj(obj, (key, _, updated) => {
      keys.indexOf(key) === -1 && (updated[key] = obj[key])

      return updated
    }, {}) || {}
)
