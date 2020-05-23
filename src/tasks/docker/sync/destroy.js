const { get } = require('jsutils')
const { spawnCmd } = require('KegProc')
const { buildLocationContext } = require('KegUtils/builders')
const { BUILD } = require('KegConst/docker/build')

/**
 * Destroys all docker-sync artifacts for the passed in context
 * @function
 * @param {Object} args - arguments passed from the runTask method
 * @param {Object} args.globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const destroyDockerSync = async args => {

  const { globalConfig, params, options, task } = args
  const { context } = params

  // Get the context data for the command to be run
  const { location, cmdContext, contextEnvs } = buildLocationContext({
    globalConfig,
    task,
    params,
    // Set a default context path as it's not needed for cleaning up a tap container
    // And it will throw if not set for a tap
    envs: { CONTEXT_PATH: 'PLACEHOLDER' }
  })

  // Remove the container
  const container = cmdContext && get(BUILD, `${cmdContext.toUpperCase()}.ENV.CONTAINER_NAME`)
  container && await spawnCmd(`docker container rm ${ container }`)

  // Remove the docker-sync container volumes
  // Must come after removing the container
  await spawnCmd(`docker-sync clean`, { options: { env: contextEnvs }}, location)

  // Remove the image
  // TODO: would be better to get the image ID
  // Need to add a helper to pull the image ID based on name
  const image = cmdContext && get(BUILD, `${cmdContext.toUpperCase()}.ENV.IMAGE`)
  image && await spawnCmd(`docker image rm ${ image }`)

  // Stop the docker-sync daemon
  await spawnCmd(`docker-sync stop`, { options: { env: contextEnvs }}, location)

}

module.exports = {
  name: 'destroy',
  alias: [ 'dest', 'des' ],
  action: destroyDockerSync,
  description: `Destroys the created docker-sync containers and images`,
  example: 'keg docker sync destroy <options>',
  options: {
    context: {
      allowed: [ 'components', 'core', 'tap' ],
      description: 'Context of docker compose up command (components || core || tap)',
      example: 'keg docker sync start --context core',
      required: true
    },
    tap: {
      description: 'Name of the linked tap to run. Overrides the context option!',
      example: 'keg docker sync start --tap name-of-tap',
      default: false
    }
  }
}