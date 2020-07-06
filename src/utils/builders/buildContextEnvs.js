const { getGitKey } = require('../git/getGitKey')
const { buildTapContext } = require('./buildTapContext')
const { getSetting } = require('../globalConfig/getSetting')
const { getContainerConst } = require('../docker/getContainerConst')


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
const buildContextEnvs = async ({ cmdContext, envs={}, globalConfig, params={}, tap }) => {

  // Get the ENV vars for the command context and merge with any passed in envs
  return {
    // Experimental docker builds. Makes docker faster and cleaner
    ...(getSetting('docker.buildKit') ? { DOCKER_BUILDKIT: 1, COMPOSE_DOCKER_CLI_BUILD: 1 } : {}),

    // Get the ENV context for the command
    ...getContainerConst(cmdContext, 'env', {}),

    // Get the ENVs for the Tap context if it exists
    ...( tap && tap !== 'tap' && await buildTapContext({
        globalConfig,
        cmdContext,
        tap,
        envs
      })),

    // Check if the copy local env should be set
    // This will copy the local repo into the docker container on image build
    ...(params.local ? { KEG_COPY_LOCAL: true } : {}),

    // Add the git key so we can call github within the image / container
    GIT_KEY: await getGitKey(globalConfig),
    
    // Add the passed in custom ENVS to override any of the defaults
    ...envs

  }

}

module.exports = {
  buildContextEnvs
}