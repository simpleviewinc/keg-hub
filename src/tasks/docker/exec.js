const docker = require('KegDocCli')
const { isStr, get, checkCall } = require('@ltipton/jsutils')
const { DOCKER } = require('KegConst/docker')
const { buildContainerContext } = require('KegUtils/builders/buildContainerContext')
const { throwRequired, generalError } = require('KegUtils/error')
const { containerSelect } = require('KegUtils/docker/containerSelect')

/**
 * Gets the correct context for the command
 * If no context exists, it asks user to select a container for context
 * @function
 *
 * @returns {Object} - context, and container to exec
 */
const ensureContext = async ({ context, tap, __injected={} }) => {

  // Check if the name already exists from an injected app
  const injectedName = __injected.container || __injected.image

  // Get the container / image from the context
  const name = injectedName
    ? injectedName
    : context === 'tap'
      ? 'tap'
      : !context
        ? false
        : context.includes('keg')
          ? context
          : `keg-${context}`

  // Try to get the container from the context
  let container = name && await docker.container.get(name)

  // If no container, then ask which container to use
  container = container || await containerSelect(containers => {
    return containers.filter(container => !container.status.includes('Exited'))
  })

  // If no context, use the container image to find the context
  const useContext = tap
    ? 'tap'
    : context|| container && container.image.replace('keg', '').split(':')[0]

  return { container, context: useContext }

}

/**
 * Execute a docker command on a running container
 * @function
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 *
 * @returns {void}
 */
const dockerExec = async args => {
  const { params, globalConfig, task, command } = args
  const { cmd, options } = params
  const { context, container } = await ensureContext(params)

  // Ensure we have a content to build the container
  !context && throwRequired(task, 'context', task.options.context)

  // Get the context data for the command to be run
  const {
    cmdContext,
    contextEnvs,
    location,
    prefix,
    tap,
    image
  } = await buildContainerContext({ globalConfig, task, params: { ...params, context } })

  // Get the name of the container to exec
  const containerName = container && container.name || prefix || image

  // Run the command on the container
  await docker.container.exec(
    { cmd, container: containerName, opts: options },
    { options: { env: contextEnvs } },
    location
  )

}

module.exports = {
  exec: {
    name: 'exec',
    alias: [ 'ex', 'attach', 'att' ],
    action: dockerExec,
    description: 'Execute a command on a running docker container',
    example: 'keg docker exec <options>',
    options: {
      context: {
        allowed: DOCKER.IMAGES,
        description: 'Context or name of the container to run the command on',
        example: 'keg docker exec --context core',
        enforced: true,
      },
      cmd: {
        description: 'Docker container command to run. Default ( /bin/sh )',
        example: 'keg docker exec ls -ls',
        default: 'sh'
      },
      options: {
        alias: [ 'opts' ],
        description: 'Extra docker exec command options',
        default: '-it'
      },
      tap: {
        description: 'Tap name when "context" options is set to "tap"',
        example: 'keg docker exec --context tap --tap my-tap',
      }
    }
  }
}