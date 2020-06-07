const { buildLocationContext } = require('KegUtils/builders')
const { throwRequired, generalError } = require('KegUtils/error')
const { isStr, get } = require('jsutils')
const docker = require('KegDocCli')
const { DOCKER } = require('KegConst/docker')

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
  const { params, globalConfig, task } = args
  const { context, cmd, options } = params

  // Ensure we have a content to build the container
  !context && throwRequired(task, 'context', task.options.context)

  // Get the context data for the command to be run
  const { cmdContext, contextEnvs, location, tap } = await buildLocationContext({
    globalConfig,
    task,
    params,
  })

  // Run the command on the container
  await docker.container.exec({
    cmd,
    opts: options,
    container: cmdContext,
  })

}

module.exports = {
  exec: {
    name: 'exec',
    alias: [ 'ex', 'att' ],
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
        default: '/bin/sh'
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