/** @module string */

import { isStr } from './isStr'

/**
 * Check if string is a uuid.
 * @function
 * @param {string} string to check
 * @return {boolean} - if it's a uuid
 */
export const isUuid = str => {
  if (!str || !isStr(str)) return false
  const regex = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
  return Boolean(regex.test(str))
}
