/** @module object */

import { isFunc } from '../method/isFunc'
import { isObj } from './isObj'

/**
 * Loop over and objects props and values and reduce to new object.
 * @function
 * @param {Object} obj
 * @return {Object} - updated object
 */
export const reduceObj = (obj, cb, start={}) => (
  (isObj(obj) && isFunc(cb) &&
  Object
    .entries(obj)
    .reduce((data, [ key, value ]) => cb(key, value, data), start)
  ) || start
)
