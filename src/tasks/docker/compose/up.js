const { get } = require('jsutils')
const { spawnCmd } = require('KegProc')
const { Logger } = require('KegLog')
const {buildComposeCmd, buildComposeName } = require('KegUtils/docker')

/**
 * Runs docker-compose up command for (components | core | tap)
 * @function
 * @param {Object} args - arguments passed from the runTask method
 * @param {Object} args.globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const upDockerCompose = async args => {
  const { globalConfig, params, options, task } = args
  const { detached, build, context } = params

  // Get the context data for the command to be run
  const { location, cmdContext, contextEnvs } = await buildLocationContext({
    globalConfig,
    task,
    params
  })

  // Build the docker compose command
  const dockerCmd = await buildComposeCmd(
    globalConfig,
    'up',
    cmdContext,
    params
  )

  // Build the name of the composer service
  const buildName = buildComposeName(cmdContext, contextEnvs)

  await spawnCmd(
    `${dockerCmd} ${ buildName }`,
    { options: { env: contextEnvs }},
    location
  )

}

module.exports = {
  name: 'up',
  alias: [ 'u' ],
  action: upDockerCompose,
  description: `Run docker-compose up command`,
  example: 'keg docker compose up <options>',
  options: {
    build: {
      description: 'Build the docker containers before starting',
      example: 'keg docker compose up --build false',
      default: true
    },
    context: {
      allowed: [ 'components', 'core', 'tap' ],
      description: 'Context of docker compose up command (components || core || tap)',
      example: 'keg docker compose up --context core',
      default: 'core'
    },
    detached: {
      description: 'Runs the docker-sync process in the background',
      example: 'keg docker compose up --detached',
      default: false
    }
  }
}
