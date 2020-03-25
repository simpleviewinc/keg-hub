/** @module object */

import { isObj } from './isObj'

/**
 * Creates a new object from passed in object with keys defined from array.
 * @function
 * @param {Object} target - object to pull keys from
 * @param {Array} keys - keys to add to new object
 * @return {Object} new object with only keys from passed in keys array
 */
export const pickKeys = (obj = {}, keys = []) => (
  isObj(obj) && keys.reduce((updated, key) => {
    key in obj && (updated[key] = obj[key])

    return updated
  }, {}) || {}
)
