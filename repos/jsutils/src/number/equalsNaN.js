/** @module number */

/**
 * Checks if a value is NaN.
 * @example
 * equalsNaN(NaN)
 * // Returns true
 * @example
 * equalsNaN(1)
 * // Returns false
 * @example
 * equalsNaN('')
 * // Returns false
 * @function
 * @param {number} val - value to check if is NaN
 * @return {boolean} T/F - if value is a number
 */
export const equalsNaN = val => (
  typeof val === 'number' && val != val
)
