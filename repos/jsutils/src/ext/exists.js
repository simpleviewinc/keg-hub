/** @module Helpers */

/**
 * Checks if a value exists. NOT undefined || null
 * @function
 * @example
 * exists(0)
 * // Returns true
 * @example
 * exists(null)
 * // Returns false
 * exists('')
 * // Returns true
 * exists(NaN)
 * // Returns false
 * @param {*} value - Item to check if exists
 *
 * @returns {boolean} - If the item exists or not
 */
export const exists = value => value === value && value !== undefined && value !== null
