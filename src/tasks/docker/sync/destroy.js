const { get, checkCall } = require('jsutils')
const { spawnCmd } = require('KegProc')
const { buildLocationContext } = require('KegUtils/builders')
const { confirmExec } = require('KegUtils/helpers')
const { DOCKER } = require('KegConst/docker')
const { getSetting } = require('KegUtils/globalConfig/getSetting')
const docker = require('KegDocCli')

/**
 * Destroys all docker-sync artifacts for the passed in context
 * @function
 * @param {Object} args - arguments passed from the runTask method
 * @param {Object} args.globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const destroyDockerSync = async args => {

  const { globalConfig, params, options, task, tasks } = args
  const { context } = params

  // Get the context data for the command to be run
  const { location, cmdContext, contextEnvs } = await buildLocationContext({
    globalConfig,
    task,
    params,
    // Set a default context path as it's not needed for cleaning up a tap container
    // And it will throw if not set for a tap
    envs: { CONTEXT_PATH: 'INITIAL' }
  })

  confirmExec({
    confirm: `This will remove all docker items related to ${ cmdContext }. Are you sure?`,
    success: `Finished running 'docker-sync destroy' command`,
    cancel: `Command 'keg docker sync destroy' has been cancelled!`,
    preConfirm: getSetting('docker.preConfirm') === false ? false : true,
    execute: async () => {

      // Remove the container
      const container = cmdContext && get(
        DOCKER,
        `CONTAINERS.${cmdContext.toUpperCase()}.ENV.CONTAINER_NAME`
      )

      container && await docker.remove({
        item: container,
        force: true,
        skipError: true,
        type: 'container',
      })

      // Remove the docker-sync container volumes
      // Must come after removing the container
      await spawnCmd(`docker-sync clean`, { options: { env: contextEnvs }}, location)

      // Get the image remove task action and call it
      // Helpful because it contains the logic to pull the image id by name
      // TODO: Update to use the docker API lib
      const removeImgTask = get(tasks, 'docker.tasks.image.tasks.remove.action')
      await checkCall(removeImgTask, {
        __skipThrow: true,
        params: { name: cmdContext, force: true }
      })

      // Stop the docker-sync daemon
      await spawnCmd(`docker-sync stop`, { options: { env: contextEnvs }}, location)

    },
  })



}

module.exports = {
  name: 'destroy',
  alias: [ 'dest', 'des' ],
  action: destroyDockerSync,
  description: `Destroys the created docker-sync containers and images`,
  example: 'keg docker sync destroy <options>',
  options: {
    context: {
      allowed: DOCKER.IMAGES,
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