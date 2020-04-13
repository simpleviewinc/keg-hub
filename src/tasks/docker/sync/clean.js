const { spawnCmd } = require('KegProc')
const { confirmExec, getPathFromConfig, throwNoConfigPath } = require('KegUtils')
const { Logger } = require('KegLog')
/**
 * Cleans docker-sync containers
 * @function
 * @param {Object} args - arguments passed from the runTask method
 * @param {Object} args.globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const cleanDockerSync = ({ globalConfig }) => {

  const location = getPathFromConfig(globalConfig, 'docker')
  if(!location) throwNoConfigPath(globalConfig, 'docker')

  confirmExec({
    confirm: `Running this command will remove all running docker-sync containers. Are you sure?`,
    success: `Finished running 'docker-sync clean' command`,
    cancel: `Command 'keg docker sync clean' has been cancelled!`,
    execute: async () => {
      await spawnCmd(`docker-sync clean`, location)
    },
  })

}

module.exports = {
  name: 'clean',
  alias: [ 'cl' ],
  action: cleanDockerSync,
  description: `Cleans the docker-sync containers`,
  example: 'keg docker sync clean'
}