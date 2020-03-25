/** @module object */

import { isFunc } from '../method/isFunc'
import { isObj } from './isObj'

/**
 * Map over and objects props and values.
 * @function
 * @param {Object} obj
 * @return {Array} -  returned values from callback
 */
export const mapObj = (obj, cb) => (
  (isObj(obj) && isFunc(cb) &&
  Object
    .entries(obj)
    .map(([ key, value ]) => cb(key, value))
  ) || obj
)
