const { get } = require('jsutils')
const { generalError } = require('KegUtils/error')
const { CONTAINERS } = require('KegConst/docker/containers')
const docker = require('KegDocCli')
const { Logger } = require('KegLog')
const { dockerLog } = require('KegUtils/log/dockerLog')
const { getContainerConst } = require('KegUtils/docker/getContainerConst')

/**
 * Run a docker container command
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const removeContainer = async args => {
  const { params, __skipThrow } = args
  const { context, force } = params

  // Ensure we have an container to remove by checking for a mapped context, or use original
  const containerRef = getContainerConst(context, `env.image`, context)
  !containerRef && generalError(`The docker "container remove" command requires a context argument!`)

  // Get the container meta data
  const container = await docker.container.get(containerRef)

  // Ensure we have the container meta data, and try to remove by containerId
  // __skipThrow is an internal argument, so it's not documented
  if(!container || !container.id)
    return __skipThrow !== true &&
      generalError(`The docker container "${ containerRef }" does not exist!`)

  const res = await docker.container.remove({ item: container.id, force })

  // Log the output of the command
  dockerLog(res, 'container remove')

}

module.exports = {
  remove: {
    name: 'remove',
    alias: [ 'rm', 'rmc' ],
    action: removeContainer,
    description: `Remove docker container by name`,
    example: 'keg docker container remove <options>',
    options: {
      context: {
        alias: [ 'name' ],
        description: 'Name of the container to remove',
        example: 'keg docker container remove --name core',
      },
      force: {
        description: 'Add the force argument to the docker command',
        example: 'keg docker container remove --force ',
      },
    },
  }
}
