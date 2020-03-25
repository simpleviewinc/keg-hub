/** @module string */

/**
 * Adds an `s` to the end of a string, if one does not exist.
 * @function
 * @param {string} str - string to convert
 * @return {string} string as a plural
 */
export const plural = str => {
  if (!str || !str.length) return str
  return str[str.length - 1] !== 's' ? str + 's' : str
}
