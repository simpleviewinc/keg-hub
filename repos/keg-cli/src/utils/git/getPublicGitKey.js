const { decrypt } = require('KegCrypto')
const { get } = require('@keg-hub/jsutils')
const { GLOBAL_CONFIG_PATHS } = require('KegConst/constants')
const { throwWrongPassword } = require('../error/throwWrongPassword')

/**
 * Gets a path from the global config, and decrypts it with the passed in password
 * @param {Object} globalConfig - Global config object for the Keg CLI
 * @param {string} configPath - Path in the global config
 * @param {string} password - Password to decrypt the token
 * @param {boolean} shouldThrow - Should an error be thrown if the token can not be decrypted
 *
 * @returns {string} found public git key or empty string
 */
const getKeyAndDecrypt = (globalConfig, configPath, password, shouldThrow) => {
  try {
    return decrypt(get(globalConfig, configPath), password)
  }
  catch(err){
    shouldThrow && throwWrongPassword()
  }
}

/**
 * Gets the public git key from the container envs
 * @param {Object} globalConfig - Global config object for the Keg CLI
 *
 * @returns {string} found public git key or empty string
 */
const getPublicGitKey = (globalConfig, password) => {
  return process.env.PUBLIC_GIT_KEY ||
    // Try the environment
    process.env.GIT_KEY ||
    // Try for the public token
    getKeyAndDecrypt(globalConfig, `${GLOBAL_CONFIG_PATHS.GIT}.publicToken`, password, false) ||
    // Try for the default token key
    getKeyAndDecrypt(globalConfig, `${GLOBAL_CONFIG_PATHS.GIT}.key`, password, true)
}

module.exports = {
  getPublicGitKey
}
