/** @module object */

import { isFunc } from '../method/isFunc'

/**
 * Recursively freezes and object.
 * @function
 * @param {Object} obj
 * @return {Object} - frozen Object
 */
export const deepFreeze = obj => {
  Object.freeze(obj)
  Object
    .getOwnPropertyNames(obj)
    .map(prop => {
      obj.hasOwnProperty(prop)
        && obj[prop] !== null
        && (typeof obj[prop] === 'object' || isFunc(obj[prop]))
        && !Object.isFrozen(obj[prop])
        && deepFreeze(obj[prop])
    })

  return obj
}
