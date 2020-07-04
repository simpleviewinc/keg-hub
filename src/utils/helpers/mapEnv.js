const { reduceObj } = require('@ltipton/jsutils')
const { ENV_MAP } = require('KegConst/constants')

/**
 * Maps the env arg value shortcut to it's actual value
 * @function
 * @param {string} value - Value to map shortcut to full name
 *
 * @returns {string} - Full env value if found or the original value
 */
const mapEnv = value => {
  return reduceObj(ENV_MAP, (environment, shortcuts, foundEnv) => {
    return !foundEnv && shortcuts.indexOf(value) !== -1
      ? environment
      : foundEnv
  }, value)
}


module.exports = {
  mapEnv
}