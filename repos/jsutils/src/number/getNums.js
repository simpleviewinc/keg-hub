/** @module number */

import { toStr } from '../string/toStr'

/**
 * Gets numbers and floats (.) from a string.
 * @example
 * getNums('$1.23')
 * // Returns '1.23'
 * @function
 * @param {*} val - value to pull numbers from
 * @return {string} Numbers found in value
 */
export const getNums = val => (
  toStr(val).replace(/([^.\d])/gm,'')
)
