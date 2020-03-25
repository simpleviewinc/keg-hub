/** @module Helpers */

/**
 * Checks if the passed in values are exactly the same.
 * @example
 * isSame(1, 1)
 * // Returns true
 * @function
 * @param {*} val1 - value to compare
 * @param {*} val2 - value to compare
 * @return {boolean} is the values are the same
 */
export const isSame = (val1, val2) => (
  val1 === val2
    ? val1 !== 0 || 1 / val1 === 1 / val2
    : val1 !== val1 && val2 !== val2
)
