const docker = require('KegDocCli')
const { DOCKER } = require('KegConst/docker')
const { throwRequired, generalError } = require('KegUtils/error')
const { buildContainerContext } = require('KegUtils/builders/buildContainerContext')

/**
 * Builds a docker container so it can be run
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const dockerRemove = async args => {
  const { command, globalConfig, options, params, task, tasks } = args
  const { context, force, type } = params

  // Ensure we have a content to build the container
  !context && throwRequired(task, 'context', task.options.context)

  // Get the context data for the command to be run
  const { cmdContext, contextEnvs, location, tap, image, name } = await buildContainerContext({
    globalConfig,
    task,
    params,
  })

  await docker.remove({
    type,
    force,
    item: image || name || cmdContext,
  })

}

module.exports = {
  remove: {
    name: 'remove',
    alias: [ 'rm' ],
    action: dockerRemove,
    description: `Runs docker build command for a container`,
    example: 'keg docker build <options>',
    locationContext: DOCKER.LOCATION_CONTEXT.REPO,
    options: {
      context: {
        allowed: DOCKER.IMAGES,
        description: 'Name of the docker container to remove',
        enforced: true,
      },
      type: {
        allowed: [ 'container', 'image' ],
        description: `Type of the item to be remove`
      },
      force: {
        description: `Force remove the docker item`,
        default: false.
      },
    },
  }
}
