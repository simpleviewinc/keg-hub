/**
 * Checks arguments for '=' and splits it to key value pair
 * @function
 * @param {string} arg - Option passer from command line to check for '='
 * @param {string} long - Long version of the arg
 * @param {string} short - Short version of the arg
 * @param {string} argument - Current value of the search
 *
 * @returns {string} - Value of the current search
 */
const splitEqualsMatch = (arg, matchTypes, argument) => {
  const [ key, value ] = arg.split('=')
  // Check if the key exists in the matchTypes, and return the value if it does
  return matchTypes.includes(key) ? value : argument
}


module.exports = {
  splitEqualsMatch
}
