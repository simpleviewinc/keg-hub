/** @module object */

import { isObj } from './isObj'

/**
 * Returns the first param if correct type of second param.
 * @function
 * @param {Object} obj1 - return if is object
 * @param {Object} obj2 - use if first is not an object
 * @returns {Object}
 */
export const eitherObj = (obj1, obj2) => (
  isObj(obj1) && obj1 || obj2
)
