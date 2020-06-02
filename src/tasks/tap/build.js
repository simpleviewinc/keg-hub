const { getCoreVersion } = require('KegUtils/getters')
const { getTapPath } = require('KegUtils/globalConfig')
const { buildDockerCmd } = require('KegUtils/docker')
const { spawnCmd, executeCmd } = require('KegProc')

/**
 * Builds a docker container for a tap so it can be run
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const buildTap = async (args) => {
  const { command, globalConfig, options, params, tasks } = args

  const { name, env } = params
  const location = getTapPath(globalConfig, name)
  const version = getCoreVersion(globalConfig)

  const dockerCmd = await buildDockerCmd(globalConfig, {
    location,
    version,
    name: 'tap',
    cmd: `build`,
    tags: options,
  })

  await spawnCmd(dockerCmd, location)

}

module.exports = {
  build: {
    name: 'build',
    alias: [ 'bld', 'make' ],
    action: buildTap,
    description: `Builds a taps docker container`,
    example: 'keg tap build <options>',
    options: {
      name: {
        description: 'Name of the tap to build a Docker image for',
        required: true
      },
      env: {
        description: 'Environment to build the Docker image for. Gets added as a tag to the image.',
        default: 'development',
      }
    }
  }
}