const { get } = require('jsutils')
const { spawnCmd } = require('KegProc')
const { confirmExec } = require('KegUtils')
const { buildContainerContext } = require('KegUtils/builders')
const { getSetting } = require('KegUtils/globalConfig/getSetting')
const { DOCKER } = require('KegConst/docker')

/**
 * Cleans docker-sync containers
 * @function
 * @param {Object} args - arguments passed from the runTask method
 * @param {Object} args.globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const cleanDockerSync = async args => {
  const { globalConfig, task, params } = args
  const { detached, context } = params
  
  // Get the context data for the command to be run
  const { location, cmdContext, contextEnvs } = await buildContainerContext({
    globalConfig,
    task,
    params
  })

  confirmExec({
    confirm: `Running this command will remove all docker-sync containers. Are you sure?`,
    success: `Finished running 'docker-sync clean' command`,
    cancel: `Command 'keg docker sync clean' has been cancelled!`,
    preConfirm: getSetting('docker.preConfirm') === false ? false : true,
    execute: async () => {
      // Remove the container
      const container = cmdContext && get(DOCKER, `CONTAINERS.${cmdContext.toUpperCase()}.ENV.CONTAINER_NAME`)
      container && await spawnCmd(`docker container rm ${ container }`)
      await spawnCmd(`docker-sync clean`, { options: { env: contextEnvs }}, location)
    },
  })

}

module.exports = {
  name: 'clean',
  alias: [ 'cl' ],
  action: cleanDockerSync,
  description: `Cleans the docker-sync containers`,
  example: 'keg docker sync clean <options>',
  options: {
    context: {
      allowed: DOCKER.IMAGES,
      description: 'Context of docker compose up command (components || core || tap)',
      example: 'keg docker sync start --context core',
      required: true
    }
  }
}