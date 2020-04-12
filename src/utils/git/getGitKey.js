const { get } = require('jsutils')
const { DOCKER, GLOBAL_CONFIG_PATHS } = require('KegConst')

/**
 * Gets the git key to allow cloning private repos
 * Pulls from the ENV GIT_KEY or global config
 * @param {Object} globalConfig - Global config object for the Keg CLI
 *
 * @returns {string} - Found git key
 */
const getGitKey = globalConfig => {
  return process.env[ DOCKER.BUILD.ARGS.GIT_KEY ] || get(
    globalConfig,
    `${GLOBAL_CONFIG_PATHS.GIT}.key`
  )
}

module.exports = {
  getGitKey
}