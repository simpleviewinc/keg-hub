/** @module string */

/**
 * Removes a `.` from the start and end of a string.
 * @function
 * @param {string} str - string to convert
 * @return {string} - string without the `.`
 */
export const removeDot = string => {
  const noDot = string.indexOf('.') === 0 ? string.slice(1) : string
  return noDot.indexOf('.') === noDot.length - 1 ? noDot.slice(0, -1) : noDot
}
