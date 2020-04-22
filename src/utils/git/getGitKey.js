const { get } = require('jsutils')
const { DOCKER, GLOBAL_CONFIG_PATHS } = require('KegConst')
const { decrypt } = require('KegCrypto')
const { ask } = require('KegQuestions')

/**
 * Gets the git key to allow cloning private repos
 * Pulls from the ENV GIT_KEY or global config
 * @param {Object} globalConfig - Global config object for the Keg CLI
 *
 * @returns {string} - Found git key
 */
const getGitKey = async globalConfig => {
  if(process.env[ DOCKER.BUILD.ARGS.GIT_KEY ])
    return process.env[ DOCKER.BUILD.ARGS.GIT_KEY ]

  const password = get(globalConfig, `${GLOBAL_CONFIG_PATHS.GIT}.secure`)
    ? await ask.password('Please enter your password')
    : false

  // TODO: Add try / catch for invalid passwords
  return decrypt(get(globalConfig, `${GLOBAL_CONFIG_PATHS.GIT}.key`), password)
}

module.exports = {
  getGitKey
}