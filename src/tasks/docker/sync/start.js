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
const startDockerSync = async args => {
  const { globalConfig, params } = args

  const location = getPathFromConfig(globalConfig, 'containers')
  if(!location) throwNoConfigPath(globalConfig, 'containers')

  const { detached } = params

  Boolean(detached)
    ? await spawnCmd(`docker-sync start`, location)
    : await spawnCmd(`docker-sync-stack start`, location)

}

module.exports = {
  name: 'start',
  alias: [ 'st' ],
  action: startDockerSync,
  description: `Starts the docker-sync`,
  example: 'keg docker sync start',
  options: {
    detached: {
      description: 'Runs the docker-sync process in the background',
      default: false
    }
  }
}