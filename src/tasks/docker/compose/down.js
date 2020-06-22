const { get, reduceObj } = require('jsutils')
const { Logger } = require('KegLog')
const { spawnCmd } = require('KegProc')
const { buildComposeCmd, buildComposeName } = require('KegUtils/docker')
const { buildContainerContext } = require('KegUtils/builders/buildContainerContext')

/**
 * Runs the docker-compose build command
 * @function
 * @param {Object} args - arguments passed from the runTask method
 * @param {Object} args.globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const downDockerCompose = async args => {
  const { globalConfig, params, task } = args
  const { cache, remove, pull, context } = params

  // Get the context data for the command to be run
  const { location, cmdContext, contextEnvs } = await buildContainerContext({
    globalConfig,
    task,
    params
  })

  // Run the docker compose build command
  await spawnCmd(
    `docker-compose down`,
    { options: { env: contextEnvs }},
    location
  )

}

module.exports = {
  down: {
    name: 'down',
    alias: [ 'd' ],
    action: downDockerCompose,
    description: `Run docker-compose down command`,
    example: 'keg docker compose down <options>',
    options: {
      context: {
        allowed: [ 'components', 'core', 'tap' ],
        description: 'Context of docker compose down command (tap || core)',
        example: 'keg docker compose down --context core',
        default: 'base'
      },
      tap: {
        description: 'Name of the tap to down. Only needed if "context" argument is "tap"',
      },
    }
  }
}
