const { spawnCmd } = require('KegProc')
const { confirmExec, getPathFromConfig, throwNoConfigPath } = require('KegUtils')

/**
 * Cleans docker-sync containers
 * @function
 * @param {Object} args - arguments passed from the runTask method
 * @param {Object} args.globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const stopDockerSync = async args => {
  const { globalConfig } = args

  const location = getPathFromConfig(globalConfig, 'containers')
  if(!location) throwNoConfigPath(globalConfig, 'containers')

  confirmExec({
    confirm: `Running this command will stop all running docker-sync containers. Are you sure?`,
    success: `Finished running 'docker-sync stop' command`,
    cancel: `Command 'keg docker sync stop' has been cancelled!`,
    execute: async () => {
      await spawnCmd(`docker-sync stop`, location)
    },
  })

}

module.exports = {
  name: 'stop',
  alias: [ 'sp' ],
  action: stopDockerSync,
  description: `Stops the docker-sync deamon`,
  example: 'keg docker sync stop',
}