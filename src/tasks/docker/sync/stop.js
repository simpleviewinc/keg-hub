const { get } = require('jsutils')
const { spawnCmd } = require('KegProc')
const { confirmExec } = require('KegUtils')
const { buildContainerContext } = require('KegUtils/builders/buildContainerContext')
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
const stopDockerSync = async args => {
  const { globalConfig, task, params } = args

  // Get the context data for the command to be run
  const { location, contextEnvs, cmdContext } = await buildContainerContext({
    globalConfig,
    task,
    params
  })

  confirmExec({
    confirm: `Running this command will stop all running docker-sync ${ cmdContext } containers. Are you sure?`,
    success: `Finished running 'docker-sync stop' command`,
    cancel: `Command 'keg docker sync stop' has been cancelled!`,
    preConfirm: getSetting('docker.preConfirm') === false ? false : true,
    execute: async () => {
      await spawnCmd(`docker-sync stop`, { options: { env: contextEnvs }}, location)
    },
  })

}

module.exports = {
  name: 'stop',
  alias: [ 'sp' ],
  action: stopDockerSync,
  description: `Stops the docker-sync deamon`,
  example: 'keg docker sync stop',
  options: {
    context: {
      allowed: DOCKER.IMAGES,
      description: 'Context of docker compose up command (components || core || tap)',
      example: 'keg docker sync start --context core',
      required: true
    }
  }
}
