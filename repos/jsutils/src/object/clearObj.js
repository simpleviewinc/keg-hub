/** @module object */

/**
 * Removes all properties from an object.
 * @function
 * @param {Object} obj - object to remove properties from
 * @param {Array} filter - list of keys to not remove
 * @returns { null }
 */
export const clearObj = (obj, filter) => {
  obj && Object
    .entries(obj)
    .map(([key, value]) => {
      if(filter && filter.indexOf(key) !== -1) return
      if(typeof value === 'object') clearObj(value)
      obj[key] = undefined
      delete obj[key]
    })
}
