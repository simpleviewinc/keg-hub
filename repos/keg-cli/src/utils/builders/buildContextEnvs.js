const { buildTapContext } = require('./buildTapContext')
const { getSetting } = require('../globalConfig/getSetting')
const { getPublicGitKey } = require('../git/getPublicGitKey')
const { getContainerConst } = require('../docker/getContainerConst')
const { convertParamsToEnvs } = require('../task/convertParamsToEnvs')

/**
 * Builds the ENVs for the passed in cmdContext
 * @function
 * @param {string} cmdContext - Context to run the docker container in
 * @param {Object} envs - Custom ENVs passed to the task from the cmd line
 * @param {Object} globalConfig - Global config object for the keg-cli
 * @param {string} params - Parameters passed to the task from the cmd line
 * @param {string} tap - Name of the tap to get the context ENVs for
 *
 * @returns {Object} - Flat object containing the ENVs for the cmdContext
 */
const buildContextEnvs = async (args) => {

  const { cmdContext, envs={}, globalConfig, params={}, tap } = args
  const containerEnvs = getContainerConst(cmdContext, 'env', {})

  // Get the ENV vars for the command context and merge with any passed in envs
  return {

    // Get the ENV context for the command
    ...containerEnvs,

    // Add the passed in custom ENVS to override any of the defaults
    ...envs,

    // Experimental docker builds. Makes docker faster and cleaner
    ...(getSetting('docker.buildKit') ? { DOCKER_BUILDKIT: 1, COMPOSE_DOCKER_CLI_BUILD: 1 } : {}),

    // Get the ENVs for the Tap context if it exists
    ...( tap && tap !== 'tap' && await buildTapContext({
        globalConfig,
        cmdContext,
        tap,
        envs
      })),

    // Add the git key so we can call github within the image / container
    PUBLIC_GIT_KEY: await getPublicGitKey(globalConfig),

    // Get any params that should be converted into ENVs passed to docker
    ...convertParamsToEnvs(params, containerEnvs.KEG_COPY_LOCAL),

    // Set the project name to allow linking services if needed
    COMPOSE_PROJECT_NAME: containerEnvs.COMPOSE_PROJECT_NAME || cmdContext,
  }

}

module.exports = {
  buildContextEnvs
}
