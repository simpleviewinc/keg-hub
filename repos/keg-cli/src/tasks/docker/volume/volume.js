const docker = require('KegDocCli')
const { Logger } = require('KegLog')

/**
 * Execute a docker prune command
 * @function
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 *
 * @returns {void}
 */
const dockerVolume = async args => {
  const volumes = await docker.volume.list()

  Logger.info(`Docker Volumes: `)
  Logger.data(volumes)

}

module.exports = {
  volume: {
    name: 'volume',
    alias: [ 'vol' ],
    action: dockerVolume,
    description: 'Run tasks on docker volume',
    example: 'keg docker volume <options>',
  }
}