/** @module Helpers */

/**
 * Gets the type of the passed in val.
 * @example
 * typeOf(1)
 * // Returns Number
 * @example
 * typeOf('')
 * // Returns String
 * @function
 * @param {*} val - value to get type for
 * @return {string} type of the value
 */
export const typeOf = val => (
  Object.prototype.toString.call(val).slice(8, -1)
)
