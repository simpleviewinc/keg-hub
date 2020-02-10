const { isObj, isStr } = require('jsutils')

/**
 * Validates the required data to create the babel config
 * @param {Object} config - Joined tap and keg configs
 * @param {string} tapPath - Path to the tap root
 * @param {string} kegPath - Path to the keg root
 *
 * @return {void}
 */
const validateBabel = ({ config, tapPath, kegPath }) => {

  if(!tapPath || !isStr(tapPath))
    throw new Error(
      `Tap Resolver requires a tapPath as a valid string. Instead ${tapPath} was received!`
    )

  if(!kegPath || !isStr(kegPath))
    throw new Error(
      `Tap Resolver requires a kegPath as a valid string. Instead ${kegPath} was received!`
    )

  if(!config || !isObj(config))
    throw new Error(
      `Tap Resolver requires a config as a valid object. Instead ${config} was received!`
    )

}

module.exports = {
  validateBabel
}