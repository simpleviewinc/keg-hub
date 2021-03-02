/** @module regex */

/**
 * @param {*} val 
 * @return {boolean} true if val is an instance of RegExp
 */
export const isRegex = val => Boolean(
  val && (val instanceof RegExp)
)