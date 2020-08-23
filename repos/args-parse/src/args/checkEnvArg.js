const { reduceObj } = require('@svkeg/jsutils')
const { getConfig } = require('../utils/getConfig')

/**
 * Maps the env arg value shortcut to it's actual value
 * @function
 * @param {string} value - Value to map shortcut to full name
 * @param {Object} defaultEnv - default environment
 *
 * @returns {string} - Full env value if found or the original value
 */
const mapEnv = (value, defaultEnv) => {
  const { environment } = getConfig()
  
  let foundEnv
  return reduceObj(environment.map, (env, shortcuts, defaultEnv) => {
    !foundEnv &&
      shortcuts.includes(value) &&
      ( foundEnv = env )

    return foundEnv || defaultEnv

  }, value || defaultEnv)
}


/**
 * Checks if the key is an env, and maps the value for shortcuts
 * @function
 * @param {string} key - Key to check for environment
 * @param {string} value - Value to check for string bool
 * @param {Object} defaultEnv - default environment
 *
 * @returns {string} - The original value or mapped environment value
 */
const checkEnvArg = (key, value, defaultEnv) => {
  const { environment } = getConfig()
  
  // Check if the arg is environment, and map it from the environment shortcuts
  return !environment.options.includes(key) 
    ? value
    : mapEnv(value, defaultEnv)
}

module.exports = {
  checkEnvArg,
  mapEnv
}
