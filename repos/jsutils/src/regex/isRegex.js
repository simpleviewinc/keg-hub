/** @module regex */

/**
 * Checks if value is an instance of regex
 * @function
 * @param {*} val 
 * @return {boolean} true if val is an instance of RegExp
 * @example
 * isRegex(new RegExp('a')) // true
 * isRegex(/a/) // true
 * isRegex('a') // false
 */
export const isRegex = val => Boolean(
  val && (val instanceof RegExp)
)