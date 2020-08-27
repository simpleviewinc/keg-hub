const docker = require('KegDocCli')
const { buildContainerContext } = require('KegUtils/builders/buildContainerContext')
const { throwRequired } = require('KegUtils/error')
const { containerSelect } = require('KegUtils/docker/containerSelect')

/**
 * Gets the correct context for the command
 * If no context exists, it asks user to select a container for context
 * @function
 *
 * @returns {Object} - context, and container to exec
 */
const ensureContainerAndContext = async ({ context, tap, __injected={} }, { containerContext={} }) => {

  // Check if the name already exists from an injected app
  const injectedName = __injected.container || __injected.image

  // Get the container / image from the context
  const name = containerContext.id
    ? containerContext.id
      : injectedName
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
  const useContext = __injected.context
    ? __injected.context
    : tap
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
  const { params, task, __internal={} } = args
  const { cmd, detach, options, workdir } = params
  const { context, container } = await ensureContainerAndContext(params, __internal)

  // Ensure we have a content to build the container
  !context && throwRequired(task, 'context', task.options.context)

  // Get the context data for the command to be run
  const {
    contextEnvs,
    location,
    prefix,
    tap,
    image
  } = await buildContainerContext({
    ...args,
    task,
    __internal,
    params: { ...params, context }
  })

  // Get the name of the container to exec
  const containerName = container && container.name || prefix || image

  // Run the command on the container
  await docker.container.exec(
    { cmd, container: containerName, opts: options, workdir, detach },
    { options: { env: { ...contextEnvs, KEG_EXEC: true } } },
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
        description: 'Context or name of the container to run the command on',
        example: 'keg docker exec --context core',
        enforced: true,
      },
      cmd: {
        alias: [ 'entry', 'command' ],
        description: 'Docker container command to run. Default ( /bin/bash )',
        example: 'keg docker exec --cmd "ls"',
        default: '/bin/bash'
      },
      workdir: {
        alias: [  'location', 'loc', 'dir', 'd' ],
        description: 'Directory in the docker container where the command should be run',
        example: 'keg docker exec --workdir /app',
      },
      detach: {
        alias: [ 'detached' ],
        description: 'Run the docker exec task in detached mode',
        example: 'keg docker exec --detach',
        default: false,
      },
      privileged: {
        alias: [ 'priv', 'pri' ],
        description: 'Run the docker exec task in privileged mode',
        example: 'keg docker exec --privileged',
        default: false,
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
