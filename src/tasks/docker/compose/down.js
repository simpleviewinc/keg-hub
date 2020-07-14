const { Logger } = require('KegLog')
const { DOCKER } = require('KegConst/docker')
const { spawnCmd } = require('KegProc')
const { buildContainerContext } = require('KegUtils/builders/buildContainerContext')
const { buildComposeCmd } = require('KegUtils/docker')

/**
 * Runs the docker-compose build command
 * @function
 * @param {Object} args - arguments passed from the runTask method
 * @param {Object} args.globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const composeDown = async args => {
  const { globalConfig, __internal, params } = args
  const { log } = params

  // Get the context data for the command to be run
  const containerContext = await buildContainerContext(args)
  const { location, cmdContext, contextEnvs } = containerContext

  // Build the docker compose command
  const dockerCmd = await buildComposeCmd(
    globalConfig,
    'down',
    cmdContext,
    params
  )

  // Run the docker compose build command
  await spawnCmd(
    dockerCmd,
    { options: { env: contextEnvs }},
    location,
    !Boolean(__internal),
  )

  log && Logger.highlight(`Compose service`, `"${ cmdContext }"`, `destroyed!`)

  return containerContext

}

module.exports = {
  down: {
    name: 'down',
    alias: [ 'kill' ],
    action: composeDown,
    description: `Run docker-compose down command`,
    example: 'keg docker compose down <options>',
    options: {
      context: {
        allowed: DOCKER.IMAGES,
        description: 'Context of docker compose down command (tap | core | components)',
        example: 'keg docker compose down --context core',
        required: true
      },
      log: {
        description: 'Log the compose command to the terminal',
        example: 'keg docker compose down --log false',
        default: true,
      },
      tap: {
        description: 'Name of the tap to down. Required when "context" is "tap"',
        example: 'keg docker compose down --context tap --tap events-force',
      },
      remove: {
        alias: [ 'rm' ],
        allowed: [ 'images', 'volumes', 'all', 'orphans' ],
        description: 'Remove collateral docker items while bringing the docker-compose service down',
        example: 'keg docker compose down --remove images,volumes'
      },
    }
  }
}
