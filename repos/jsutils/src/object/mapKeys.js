/** @module object */


import { isObj } from './isObj'
import { isFunc } from '../method/isFunc'
import { mapEntries } from './mapEntries'

/**
 * Shortcut helper for mapping just the keys of an object.
 * @function
 * @param {Object} obj 
 * @param {Function} keyMapper: (key) => nextKey
 * @returns the new object with each key mapped
 */
export const mapKeys = (obj, keyMapper) => {
  if (!isObj(obj) || !isFunc(keyMapper)) 
    return obj

  return mapEntries(
    obj,
    (key, value) => [keyMapper(key), value]
  )
}
