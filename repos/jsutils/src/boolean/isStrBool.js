/** @module boolean */

/**
 * Checks is value is a boolean as a string.
 * @function
 * @example
 * isStrBool("true")
 * // Returns true
 * @example
 * isStrBool(true)
 * // Returns false
 * @param {*} val - value to check if boolean as a string
 * @return {boolean} T/F - if value is a boolean
 */
export const isStrBool = val => (
  val === 'false' || val === 'true'
)

