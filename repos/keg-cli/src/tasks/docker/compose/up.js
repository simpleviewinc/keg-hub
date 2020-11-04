const { Logger } = require('KegLog')
const { DOCKER } = require('KegConst/docker')
const { spawnCmd } = require('KegProc')
const { logVirtualUrl } = require('KegUtils/log')
const { buildComposeCmd } = require('KegUtils/docker/compose')
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
  const { detached, build, context, log } = params

  // Get the context data for the command to be run
  const containerContext = await buildContainerContext({
    envs,
    task,
    params,
    __internal,
    globalConfig,
  })
  const { location, cmdContext, contextEnvs, tap, image } = containerContext

  // Check if build param is passed, and use the docker build to build container
  // This allow use of BuildKit which is faster, and has better caching
  // Docker compose currently does NOT support BuildKit, so we do it manually
  build && await buildDockerImage(args, cmdContext, tap)

  // Build the docker compose command
  const { dockerCmd, composeData } = await buildComposeCmd({
    params,
    cmd: 'up',
    cmdContext,
    contextEnvs,
    globalConfig,
  })

  // Run the docker-compose up command
  await spawnCmd(
    dockerCmd,
    { options: { env: contextEnvs }},
    location,
    !Boolean(__internal),
  )

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
      log: {
        description: 'Log the compose command to the terminal',
        example: 'keg docker compose build --log false',
        default: true,
      }
    }
  }
}