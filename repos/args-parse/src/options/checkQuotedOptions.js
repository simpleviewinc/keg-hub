
const { removeOption } = require('./removeOption')

/**
 * Checks the current argument for a starting "
 * If found, adds all other options until and end " is found
 * @param {string} argument - Found argument to check for starting "
 * @param {Array} options - Items to search for the end "
 * @param {number} index - Location in the options array to start looking for an end "
 *
 * @returns {string} - Built quoted string
 */
const checkQuotedOptions = (argument, options, index) => {
  // Check if the current option has a quote
  if(argument[0] !== '"') return argument

  // flag for when then end quote is found
  let foundEnd

  // Get all passed in options after the current option
  const slicedOpts = options.slice(index)
  return slicedOpts.reduce((joined, opt) => {
    // If foundEnd is true, just return and don't add anymore options,
    if(foundEnd) return joined

    // Remove the current option from the options array
    options = removeOption(options, opt)

    if(opt[opt.length -1] === '"'){
      foundEnd = true
      return `${joined.substring(1)} ${opt.slice(0, -1)}`
    }

    return `${joined} ${opt}`

  }, argument)
}

module.exports = {
  checkQuotedOptions
}
