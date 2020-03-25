/** @module Helpers */

/**
 * Checks is passed in date is a valid date.
 * @example
 * isValidDate(new Date())
 * // Returns true
 * @example
 * isValidDate(new Date().toString())
 * // Returns true
 * @example
 * isValidDate('12345678')
 * // Returns false
 * @function
 * @param { date | string } date - value to check
 * @return {boolean} T/F - if passed in date is a valid date
 */
export const isValidDate = date => (
  !isNaN( (date instanceof Date && date || new Date(date)).getTime() )
)
