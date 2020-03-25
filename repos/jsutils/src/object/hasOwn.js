/** @module object */

/**
 * Checks if prop exists on the object.
 * @function
 * @param {Object} obj - data to check
 * @param {string} prop - prop to check for
 * @returns {boolean} T/F if the prop exists
 */
export const hasOwn = (obj, prop) => (
  Object.prototype.hasOwnProperty.call(obj, prop)
)
