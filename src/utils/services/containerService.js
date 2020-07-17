const { get } = require('@ltipton/jsutils')
const { DOCKER } = require('KegConst/docker')
const { spawnCmd } = require('KegProc')
const { logVirtualUrl } = require('KegUtils/log')
const { buildDockerCmd } = require('../docker/buildDockerCmd')
const { getGitPath } = require('../git/getGitPath')
const { getServiceArgs } = require('./getServiceArgs')

/**
 * Starts a docker container for a tap
 * @param {Object} args - arguments passed from the runTask method
 * @param {Object} args.globalConfig - Global config object for the keg-cli
 * @param {Object} args.params - Formatted object of the passed in options 
 * @param {string} container - Name of the container to run ( core / components / tap )
 * @param {string} tap - Name of tap, if container arg value is `tap`
 * @param {string} location - Location where the command should be run
 *
 * @returns {void}
 */
const containerService = (args, argsExt) => {

  // Build the service arguments
  const { globalConfig, params } = getServiceArgs(args, argsExt)
  const { context, container, env, docker, location, mounts, tap, } = params

  const containerCaps = container.toUpperCase()
  location = location || getGitPath(container, tap)
  
  const dockerCmd = buildDockerCmd(globalConfig, {
    tap,
    mounts,
    docker,
    location,
    cmd: `run`,
    env: env || get(DOCKER, `DOCKER_ENV`),
    name: get(DOCKER, `CONTAINERS.${ containerCaps }.ENV.IMAGE`),
    container: get(DOCKER, `CONTAINERS.${ containerCaps }.ENV.CONTAINER_NAME`),
    version: get(DOCKER, `CONTAINERS.${ containerCaps }.ENV.VERSION`),
  })

  logVirtualUrl(context)

  return spawnCmd(dockerCmd, location)

}

module.exports = {
  containerService
}