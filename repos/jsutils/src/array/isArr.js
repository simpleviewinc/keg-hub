/** @module array */

/**
 * Checks if passed in value is an array.
 * @function
 * @example
 * isArr([1,2,3])
 * // Returns true
 * @param {any} value - value to be check if is an array
 * @return {boolean} - T/F value is an array
 */
export const isArr = value => (
  Array.isArray(value)
)