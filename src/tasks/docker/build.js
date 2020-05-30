const { buildLocationContext } = require('KegUtils/builders')
const { throwRequired, generalError } = require('KegUtils/error')
const { buildDockerCmd } = require('KegDocker')
const { spawnCmd } = require('KegProc')
const { DOCKER } = require('KegConst/docker')

/**
 * Builds a docker container so it can be run
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} args.task - The current task being run
 * @param {Object} args.params - Formatted options as an object
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const dockerBuild = async args => {
  const { globalConfig, options, params, task, tasks } = args
  const { context } = params

  // Ensure we have a content to build the container
  !context && throwRequired(task, 'context', task.options.context)

  // Get the context data for the command to be run
  const { cmdContext, contextEnvs, location, tap } = await buildLocationContext({
    globalConfig,
    task,
    params,
  })

  // If using a tap, and no location is found, throw an error
  cmdContext === 'tap' && tap && !location && generalError(
    `Tap location could not be found for ${ tap }!`,
    `Please ensure the tap path is linked in the global config!`
  )

  // Build the docker build command with options
  const dockerCmd = await buildDockerCmd(globalConfig, {
    ...params,
    location,
    cmd: `build`,
    options: options,
    context: cmdContext,
    ...(tap && { tap }),
  })

  await spawnCmd(dockerCmd, { options: { env: contextEnvs }}, location)

  return docker.image.get(cmdContext)

}

module.exports = {
  build: {
    name: 'build',
    alias: [ 'bld', 'b' ],
    action: dockerBuild,
    description: `Runs docker build command for a container`,
    example: 'keg docker build <options>',
    location_context: DOCKER.LOCATION_CONTEXT.REPO,
    options: {
      context: {
        allowed: DOCKER.IMAGES,
        description: 'Context of the docker container to build',
        enforced: true,
      },
      cache: {
        description: 'Docker will use build cache when building the image',
        default: true
      },
      tap: {
        description: 'Name of the tap to build. Only needed if "context" argument is "tap"',
      },
      tags: {
        description: 'Extra tags to add to the docker image after its build. Uses commas (,) to separate',
        example: 'keg docker build tags=my-tag,local,development'
      }
    }
  }
}
