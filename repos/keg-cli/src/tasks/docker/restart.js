const docker = require('KegDocCli')
const { Logger } = require('KegLog')
const { DOCKER } = require('KegConst/docker')
const { throwRequired, generalError } = require('KegUtils/error')
const { buildContainerContext } = require('KegUtils/builders/buildContainerContext')
const { containerSelect } = require('KegUtils/docker/containerSelect')
const { getSetting } = require('KegUtils/globalConfig/getSetting')

/**
 * Builds a docker container so it can be run
 * @function
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} args.task - The current task being run
 * @param {Object} args.params - Formatted options as an object
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {Object} - Build image as a json object
 */
const dockerRestart = async args => {
  const { globalConfig, options, params, task, tasks } = args
  const { context } = params

  // If no context is passed, ask the user which container to use
  const { id, name } = !context ? await containerSelect() : { id: context }

  // Use the id returned from containerSelect || the context as an id
  // to try and get the container
  const contRef = !name && await docker.container.get(id)
  
  // Ensure we have a context or container ref to restart
  !context && !contRef && throwRequired(task, 'context', task.options.context)

  // Use the found contRef or get the context data for the command to be run
  const containerContext = contRef || await buildContainerContext({ globalConfig, task, params })
  const { id:contextId, image, name:contextName  } = containerContext

  // Get a container reference from one of the keys that can be used to restart the container
  let containerRef = contextId || contextName || image

  // Ensure there if a container ref.
  // If none, then check if we should ask for the container
  // Otherwise throw that container ref could not be found
  containerRef = containerRef
    ? containerRef
    : getSetting(`task.optionsAsk`)
      ? await containerSelect()
      : generalError(`Could not find container with context "${ containerRef }"!`)

  Logger.info(`Restarting docker container "${ name || context || containerRef }" ...`)

  // Run the restart docker command
  await docker.container.restart({
    item: containerRef,
  })

  // Return the restarted container context
  return containerContext

}

module.exports = {
  restart: {
    name: 'restart',
    alias: [ 'rst', 'rs', 'dr' ],
    action: dockerRestart,
    description: `Restarts a docker container`,
    example: 'keg docker restart <options>',
    locationContext: DOCKER.LOCATION_CONTEXT.REPO,
    options: {
      context: {
        description: 'Context, name, or Id of the docker container to restart',
        enforced: true,
      },
    }
  }
}
