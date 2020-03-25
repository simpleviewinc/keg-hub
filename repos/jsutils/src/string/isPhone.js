/** @module string */

import { isStr } from './isStr'

/**
 * Check if string is a phone number.
 * @function
 * @param {string} string to check
 * @return {boolean} - if it's a phone number
 */
export const isPhone = str => {
  if (!str || !isStr(str)) return false
  const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
  return Boolean(regex.test(str)) && str.replace(/\D/g, '').length < 11
}
