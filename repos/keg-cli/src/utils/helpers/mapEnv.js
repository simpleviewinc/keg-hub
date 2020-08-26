const { reduceObj } = require('@svkeg/jsutils')
const { ENV_MAP } = require('KegConst/constants')

/**
 * Maps the env arg value shortcut to it's actual value
 * @function
 * @param {string} value - Value to map shortcut to full name
 * @param {Object} meta - env option meta-data
 *
 * @returns {string} - Full env value if found or the original value
 */
const mapEnv = (value, meta) => {
  let foundEnv
  return reduceObj(ENV_MAP, (environment, shortcuts, defaultEnv) => {
    !foundEnv &&
      shortcuts.includes(value) &&
      ( foundEnv = environment.toLowerCase() )
      
    return foundEnv || defaultEnv

  }, value || meta.default)
}

module.exports = {
  mapEnv
}