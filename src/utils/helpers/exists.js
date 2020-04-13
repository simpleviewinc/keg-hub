
/**
 * Checks if a value exists. NOT undefined || null
 * @function
 * @param {*} value - Item to check if exists
 *
 * @returns {boolean} - If the item exists or not
 */
const exists = value => value !== undefined && value !== null

module.exports = {
  exists
}