/**
 * TODO: Remove this once jsutils is updated to the latest version
 * current: 3.2.1
 * Update when >=4.0.0
 */

/**
 * Checks if a value exists. NOT undefined || null
 * @function
 * @param {*} value - Item to check if exists
 *
 * @returns {boolean} - If the item exists or not
 */
export const exists = value =>
  value === value && value !== undefined && value !== null
