/** @module boolean */

import { toStr } from '../string/toStr'
import { isBool } from './isBool'

/**
 * Converts a value to a boolean as a string.
 * @function
 * @example
 * convertToStrBool(true)
 * // Returns 'true'
 * @param {*} val - value to convert
 * @return {string} 'true' || 'false' based on passed in value
 */
export const convertToStrBool = val => (
  isBool(val)
    ? toStr(val)
    : !val || val === 'false' || val === '0'
      ? 'false'
      : 'true'
)
