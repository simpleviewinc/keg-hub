const { DOCKER } = require('KegConst/docker')
const { throwNoConfigPath } = require('../error')
const { getPathFromConfig } = require('../globalConfig')
const { getTapPath } = require('../globalConfig/getTapPath')
const { getContainerConst } = require('../docker/getContainerConst')
const { LOCATION_CONTEXT } = DOCKER

/**
 * Gets the location where a docker command should be executed
 * @function
 * @param {Object} globalConfig - Global config object for the keg-cli
 * @param {Object} task - Current task being run
 * @param {string} context - Context to run the docker container in
 * @param {string} tap - Name of a linked tap in the globalConfig
 *
 * @returns {string} - The location where a command should be executed
 */
const getLocationContext = ({ context, globalConfig, __injected={}, tap, task }) => {
  // If there's an injectedLocation, use that as the location
  const location = __injected.location
    ? task.name ==='build'
      // If we are building the external app, we want to use the injectionPath
      ? __injected.injectPath
      // Otherwise use the default path when calling docker-compose cmds
      : __injected.location
    : Boolean(task.locationContext !== LOCATION_CONTEXT.REPO)
      // For the docker-compose commands, The context to be the keg-cli/containers folder
      ? `${ getPathFromConfig(globalConfig, 'containers') }/${ context }`
      // If it's a repoContext, then get the location for the repo from the context
      : context !== 'tap'
        ? getContainerConst(context, `env.keg_context_path`)
        : getTapPath(globalConfig, tap)

  // Return the location, or throw because no location could be found
  return location || throwNoConfigPath(globalConfig, tap || context)

}

module.exports = {
  getLocationContext
}