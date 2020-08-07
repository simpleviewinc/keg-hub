const { hasKeyIdentifier } = require('../utils/hasKeyIdentifier')

/**
 * Loops over the options and checks if each one has a key identifier
 * @function
 * @param {Array} options - Options to check for identifiers
 *
 * @returns {boolean} - T/F if an option has a key identifier
 */
const optionsHasIdentifiers = (options=[]) => {
  return options
    .map(option => hasKeyIdentifier(option))
    .indexOf(true) !== -1
}

module.exports = {
  optionsHasIdentifiers,
}
