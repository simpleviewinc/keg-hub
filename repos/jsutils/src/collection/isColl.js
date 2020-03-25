/** @module collection */

/**
 * Checks if the value is a collection ( object || array ).
 * @example
 * isColl([1,2,3])
 * // Returns true
 * @example
 * isColl({ foo: 'bar' })
 * // Returns true
 * @example
 * isColl(null)
 * // Returns false
 * @function
 * @param {*} val - value to check
 * @return {boolean} T/F if the value is a collection
 */
export const isColl = val => (
  typeof val === 'object' && val !== null
)
