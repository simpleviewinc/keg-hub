const { get, isStr } = require('jsutils')
const docker = require('KegDocCli')
const { Logger } = require('KegLog')
const { exists } = require('KegUtils/helpers')
const { generalError } = require('KegUtils/error')
const { dockerLog } = require('KegUtils/log/dockerLog')
const { CONTAINERS } = require('KegConst/docker/containers')
const { getSetting } = require('KegUtils/globalConfig/getSetting')
const { containerSelect } = require('KegUtils/docker/containerSelect')
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
  const { params, __internal={} } = args
  const { context } = params

  const force = exists(params.force) ? params.force : getSetting(`docker.force`)

  // Ensure we have an container to remove by checking for a mapped context, or use original
  let containerRef = context && getContainerConst(context, `env.image`)
  containerRef = containerRef || await containerSelect()

  !containerRef && generalError(`The docker "container remove" command requires a context argument!`)

  // Get the container meta data
  const container = isStr(containerRef)
    ? await docker.container.get(containerRef)
    : containerRef

  // Ensure we have the container meta data, and try to remove by containerId
  // __internal.skipThrow is an internal argument, so it's not documented
  if(!container || !container.id)
    return __internal.skipThrow !== true &&
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
