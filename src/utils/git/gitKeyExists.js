const { get } = require('jsutils')
const { DOCKER, GLOBAL_CONFIG_PATHS } = require('KegConst/constants')
const { decrypt } = require('KegCrypto')

/**
 * Gets the git key to allow cloning private repos
 * Pulls from the ENV GIT_KEY or global config
 * @param {Object} globalConfig - Global config object for the Keg CLI
 *
 * @returns {string} - Found git key
 */
const gitKeyExists = globalConfig => {
  return Boolean(
    process.env[ DOCKER.BUILD.CORE.ARGS.GIT_KEY ] ||
      get(globalConfig, `${GLOBAL_CONFIG_PATHS.GIT}.key`)
  )
}

module.exports = {
  gitKeyExists
}