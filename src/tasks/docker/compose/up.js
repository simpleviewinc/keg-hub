const { get } = require('jsutils')
const { Logger } = require('KegLog')
const { DOCKER } = require('KegConst')
const { spawnCmd } = require('KegProc')
const { buildComposeCmd } = require('KegUtils/docker')
const { buildContainerContext, buildDockerImage } = require('KegUtils/builders')
const { logVirtualUrl } = require('KegUtils/log')

/**
 * Runs docker-compose up command for (components | core | tap)
 * @function
 * @param {Object} args - arguments passed from the runTask method
 * @param {Object} args.globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const upDockerCompose = async args => {
  const { globalConfig, __internal, params, options, task } = args
  const { detached, build, context } = params

  // Get the context data for the command to be run
  const { location, cmdContext, contextEnvs, tap } = await buildContainerContext({
    globalConfig,
    task,
    params,
    __internal,
  })

  // Check if build param is passed, and use the docker build to build container
  // This allow use of BuildKit which is faster, and has better caching
  // Docker compose currently does NOT support BuildKit, so we do it manually
  build && await buildDockerImage(args, cmdContext, tap)

  // Build the docker compose command
  const dockerCmd = await buildComposeCmd(
    globalConfig,
    'up',
    cmdContext,
    params
  )

  logVirtualUrl()

  // Run the docker-compose up command
  await spawnCmd(
    `${dockerCmd} ${ contextEnvs.IMAGE }`,
    { options: { env: contextEnvs }},
    location
  )

  // Return the built context info, so it can be reused if needed
  return {
    tap,
    params,
    location,
    cmdContext,
    contextEnvs,
  }

}

module.exports = {
  up: {
    name: 'up',
    alias: [ 'u' ],
    action: upDockerCompose,
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
        default: 'core'
      },
      detached: {
        description: 'Runs the docker-sync process in the background',
        example: 'keg docker compose up --detached',
        default: false
      },
      sync: {
        description: 'Add the compose-sync.yml file as a config. Which setups docker-sync volumes',
        example: 'keg docker compose up --sync',
        default: false
      }
    }
  }
}
