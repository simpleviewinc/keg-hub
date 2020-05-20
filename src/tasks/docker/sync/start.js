const { spawnCmd } = require('KegProc')
const { buildLocationContext } = require('KegUtils/builders')
const { Logger } = require('KegLog')

/**
 * Starts docker-sync for the passed in context
 * @function
 * @param {Object} args - arguments passed from the runTask method
 * @param {Object} args.globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const startDockerSync = async args => {

  const { globalConfig, params, options, task } = args
  const { detached, clean, context, install } = params

  // Get the context data for the command to be run
  const { location, cmdContext, contextEnvs } = buildLocationContext(
    globalConfig,
    task,
    context,
    task.options.context.default,
    install && { NM_INSTALL: true }
  )

console.log(contextEnvs)

  // Check if docker-sync should be cleaned first
  clean && await spawnCmd(`docker-sync clean`, { options: { env: contextEnvs }}, location)

  // Check if sync should run in detached mode 
  const dockerCmd = `${ Boolean(detached) ? 'docker-sync' : 'docker-sync-stack' } start`

  // Run docker-sync
  await spawnCmd(dockerCmd, { options: { env: contextEnvs }}, location)

}

module.exports = {
  name: 'start',
  alias: [ 'st' ],
  action: startDockerSync,
  description: `Starts the docker-sync`,
  example: 'keg docker sync start',
  options: {
    context: {
      allowed: [ 'components', 'core', 'tap' ],
      description: 'Context of docker compose up command (components || core || tap)',
      example: 'keg docker sync start --context core',
      default: 'core'
    },
    clean: {
      description: 'Cleans docker-sync before running the docker-sync command',
      example: 'keg docker sync start --clean',
      default: false
    },
    command: {
      alias: [ 'cmd' ],
      description: 'The command to run within the docker container. Overwrites the default (yarn web)',
      example: 'keg docker sync start --command ios',
      default: 'web'
    },
    detached: {
      description: 'Runs the docker-sync process in the background',
      default: false
    },
    env: {
      description: 'Environment to start the Docker containers in',
      default: 'development',
    },
    install: {
      description: 'Install packages ( yarn install ) within the container before starting the application',
      default: false
    }
  }
}