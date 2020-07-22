const { Logger } = require('KegLog')
const { DOCKER } = require('KegConst/docker')
const { spawnCmd } = require('KegProc')
const { get, checkCall } = require('@ltipton/jsutils')
const { logVirtualUrl } = require('KegUtils/log')
const { buildComposeCmd, buildServiceName } = require('KegUtils/docker')
const { buildContainerContext, buildDockerImage } = require('KegUtils/builders')
const { checkKillRunning } = require('KegUtils/docker/compose/checkKillRunning')

/**
 * Runs docker-compose up command for (components | core | tap)
 * @function
 * @param {Object} args - arguments passed from the runTask method
 * @param {Object} args.globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const composeRestart = async args => {
  const { globalConfig, __internal, params, task } = args
  const { context, log } = params

  // Get the context data for the command to be run
  const containerContext = await buildContainerContext({
    globalConfig,
    task,
    params,
    __internal,
  })
  const { location, cmdContext, contextEnvs, tap, image } = containerContext

  // Build the docker compose command
  const dockerCmd = await buildComposeCmd(
    globalConfig,
    'restart',
    cmdContext,
    params
  )

  // Log the virtual url so users know how to access the running containers
  logVirtualUrl(cmdContext)

  // Get the name of the docker-compose service
  const serviceName = buildServiceName(cmdContext, contextEnvs)

  // Run the docker-compose restart command
  await spawnCmd(
    `${ dockerCmd } ${ serviceName }`,
    { options: { env: contextEnvs }},
    location,
    !Boolean(__internal),
  )

  log && Logger.highlight(`Compose service`, `"${ cmdContext }"`, `is restarting!`)

  // Return the built context info, so it can be reused if needed
  return containerContext

}

module.exports = {
  restart: {
    name: 'restart',
    alias: [ 'rest', 'rerun', 'rr', 'rst' ],
    action: composeRestart,
    description: `Run docker-compose up command`,
    example: 'keg docker compose up <options>',
    options: {
      context: {
        allowed: DOCKER.IMAGES,
        description: 'Context of docker compose up command (components || core || tap)',
        example: 'keg docker compose restart --context core',
        required: true
      },
      tap: { 
        description: 'Name of the tap to run. Must be a tap linked in the global config',
        example: 'keg tap restart --tap events-force',
      },
      log: {
        description: 'Log the compose command to the terminal',
        example: 'keg docker compose build --log false',
        default: false,
      }
    }
  }
}
