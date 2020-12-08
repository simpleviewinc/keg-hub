const { Logger } = require('KegLog')
const { DOCKER } = require('KegConst/docker')
const { spawnCmd } = require('KegProc')
const { logVirtualUrl } = require('KegUtils/log')
const { buildComposeCmd } = require('KegUtils/docker/compose/buildComposeCmd')
const { throwComposeFailed } = require('KegUtils/error/throwComposeFailed')
const { buildContainerContext, buildDockerImage } = require('KegUtils/builders')

/**
 * Runs docker-compose up command for (components | core | tap)
 * @function
 * @param {Object} args - arguments passed from the runTask method
 * @param {Object} args.globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const composeUp = async args => {
  const { envs, globalConfig, __internal, params, task } = args
  const { detached, build, context, log, recreate } = params

  // Get the context data for the command to be run
  const containerContext = await buildContainerContext(args)
  const { location, cmdContext, contextEnvs, tap, image } = containerContext

  // Check if build param is passed, and use the docker build to build container
  // This allow use of BuildKit which is faster, and has better caching
  // Docker compose currently does NOT support BuildKit, so we do it manually
  build && await buildDockerImage(args, cmdContext, tap)
  // Build the docker compose command
  const { dockerCmd, composeData } = await buildComposeCmd({
    cmd: 'up',
    cmdContext,
    contextEnvs,
    globalConfig,
    // Default no-recreate to true, if recreate is not set or false
    params: {
      ...params,
      ...(!recreate && { nocreate: true })
    },
  })

  // Run the docker-compose up command
  const cmdFailed = await spawnCmd(
    dockerCmd,
    { options: { env: contextEnvs }},
    location,
    !Boolean(__internal),
  )

  // Returns 0 if the command is successful, which is falsy
  // So check for truthy value, which means the command failed
  cmdFailed && throwComposeFailed(dockerCmd, location)

  log && Logger.highlight(`Compose service`, `"${ cmdContext }"`, `is up!`)

  // Log the virtual url so users know how to access the running containers
  logVirtualUrl(composeData, contextEnvs.KEG_PROXY_HOST)

  // Return the built context info, so it can be reused if needed
  return containerContext

}

module.exports = {
  up: {
    name: 'up',
    alias: [ 'u' ],
    action: composeUp,
    description: `Run docker-compose up command`,
    example: 'keg docker compose up <options>',
    options: {
      build: {
        description: 'Build the docker containers before starting',
        example: 'keg docker compose up --build true',
        default: false
      },
      context: {
        allowed: DOCKER.IMAGES,
        description: 'Context of docker compose up command (components || core || tap)',
        example: 'keg docker compose up --context core',
        required: true
      },
      recreate: {
        alias: [ 'rec', `create` ],
        description: 'Force recreate all the docker containers for the compose service',
        example: 'keg docker compose up --recreate',
        required: false
      },
      log: {
        description: 'Log the compose command to the terminal',
        example: 'keg docker compose build --log false',
        default: true,
      }
    }
  }
}