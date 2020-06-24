const { get, reduceObj } = require('jsutils')
const { Logger } = require('KegLog')
const { spawnCmd } = require('KegProc')
const { buildComposeCmd, buildComposeName } = require('KegUtils/docker')
const { buildContainerContext } = require('KegUtils/builders/buildContainerContext')
const { DOCKER } = require('KegConst/docker')

/**
 * Runs the docker-compose build command
 * @function
 * @param {Object} args - arguments passed from the runTask method
 * @param {Object} args.globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const buildDockerCompose = async args => {
  const { globalConfig, params, task } = args
  const { cache, remove, pull, context, log } = params

  // Get the context data for the command to be run
  const { location, cmdContext, contextEnvs } = await buildContainerContext({
    globalConfig,
    task,
    params
  })

  // Build the docker compose command
  const dockerCmd = await buildComposeCmd(
    globalConfig,
    'build',
    cmdContext,
    params
  )

  // Build the name of the composer service
  const buildName = buildComposeName(cmdContext, contextEnvs)

  // Run the docker compose build command
  await spawnCmd(
    `${dockerCmd} ${ buildName }`,
    { options: { env: contextEnvs }},
    location
  )

  log && Logger.highlight(`Compose build service`, `"${ cmdContext }"`, `complete!`)

}

module.exports = {
  build: {
    name: 'build',
    alias: [ 'b' ],
    action: buildDockerCompose,
    description: `Run docker-compose build command`,
    example: 'keg docker compose build <options>',
    options: {
      context: {
        allowed: DOCKER.IMAGES,
        description: 'Context of docker compose build command (tap || core)',
        example: 'keg docker compose build --context core',
        default: 'base'
      },
      clean: {
        alias: [ 'remove' ],
        description: 'Always remove intermediate containers',
        example: 'keg docker compose build --clean',
        default: true
      },
      cache: {
        description: 'Use cache when building the container',
        example: 'keg docker compose build --cache',
        default: true
      },
      log: {
        description: 'Log the compose command to the terminal',
        example: 'keg docker compose build --log false',
        default: true,
      },
      pull: {
        description: 'Always attempt to pull a newer version of the image',
        example: 'keg docker compose build --pull',
        default: true
      }
    }
  }
}
