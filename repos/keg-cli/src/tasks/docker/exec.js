const docker = require('KegDocCli')
const { buildContainerContext } = require('KegUtils/builders/buildContainerContext')
const { throwRequired } = require('KegUtils/error')
const { containerSelect } = require('KegUtils/docker/containerSelect')
const { KEG_DOCKER_EXEC, KEG_EXEC_OPTS } = require('KegConst/constants')

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
  const { cmd, detach, options, workdir, context } = params

  // Ensure we have a content to build the container
  !context && throwRequired(task, 'context', task.options.context)

  // Get the context data for the command to be run
  const execContext = await buildContainerContext({
    ...args,
    task,
    __internal,
    params: { ...params, context }
  })

  const { contextEnvs, location, prefix, image, container, id:containerId } = execContext

  // Get the name of the container to run the docker exec cmd on
  const containerName = containerId || container && container.name || prefix || image

  const execArgs = { cmd, container: containerName, opts: options, location }
  workdir && (execArgs.workdir = workdir)
  detach && (execArgs.detach = detach)

  // Run the exec command on the container
  await docker.container
    .exec(execArgs, { options: { env: {
      // Add the default KEG_DOCKER_EXEC ENV
      [KEG_DOCKER_EXEC]: KEG_EXEC_OPTS.dockerExec,
      // contextEnvs should already have the KEG_DOCKER_EXEC set to override it if needed
      ...contextEnvs
    }}})

  return execContext

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
        example: 'keg docker exec --no-privileged',
        default: true,
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
