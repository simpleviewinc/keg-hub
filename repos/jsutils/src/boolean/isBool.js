/** @module boolean */

/**
 * Checks is value is a boolean.
 * @function
 * @example
 * isBool([1,2,3])
 * // Returns false
 * @example
 * isBool(true)
 * // Returns true
 * @param {*} val - value to check if is a number
 * @return {boolean} T/F - if value is a boolean
 */
export const isBool = val => (
  typeof val === 'boolean'
)
