/** @module boolean */

import { isStrBool } from './isStrBool'
import { convertToStrBool } from './convertToStrBool'

/**
 * Converts a value to a boolean.
 * @function
 * @example
 * toBool(null)
 * // Returns false
 * @example
 * toBool('false')
 * // Returns false
 * @example
 * toBool('true')
 * // Returns true
 * @param {*} val - value to convert
 * @return {boolean} true or false based on passed in value.
 */
export const toBool = val => (
  isStrBool(val)
    ? val === 'true'
    : convertToStrBool(val) === 'true'
)