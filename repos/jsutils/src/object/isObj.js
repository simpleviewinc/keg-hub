/** @module object */

/**
 * Checks if data is an object and not an array.
 * @function
 * @param {Object} obj - data to check
 * @returns {boolean}
 */
export const isObj = obj => typeof obj === 'object' && !Array.isArray(obj) && obj !== null
