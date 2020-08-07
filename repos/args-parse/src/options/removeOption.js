/**
 * Removes an option from the options array
 * @function
 * @param {Array} options - Arguments passed in from the terminal
 * @param {string} opt - Item to remove from the array
 *
 * @returns {Array} - Updated options array
 */
const removeOption = (options, opt) => {
  options.splice(options.indexOf(opt), 1)

  return options
}


module.exports = {
  removeOption
}
