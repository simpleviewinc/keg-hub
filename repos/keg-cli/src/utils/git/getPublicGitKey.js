const { get } = require('@svkeg/jsutils')
const { decrypt } = require('KegCrypto')
const { GLOBAL_CONFIG_PATHS } = require('KegConst/constants')

/**
 * Gets the public git key from the container envs
 * @param {Object} globalConfig - Global config object for the Keg CLI
 *
 * @returns {string} found public git key or empty string
 */
const getPublicGitKey = (globalConfig, password) => {
  const token = process.env.PUBLIC_GIT_KEY || process.env.GIT_KEY ||
    get(globalConfig, `${GLOBAL_CONFIG_PATHS.GIT}.publicToken`, '')

  try {
    return token ||  decrypt(
      get(globalConfig, `${GLOBAL_CONFIG_PATHS.GIT}.publicToken`, ''),
      password
    )
  }
  catch(err){
    return token || ''
  }

}

module.exports = {
  getPublicGitKey
}
