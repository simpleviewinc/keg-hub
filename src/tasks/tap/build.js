const { getArguments, getTapPath } = require('KegUtils')
const { buildDockerCmd } = require('KegDocker')
const { spawnCmd, executeCmd } = require('KegProc')

/**
 * Builds a docker container for a tap so it can be run
 *
 * @param {*} args
 */
const buildTap = async (args) => {
  const { command, options, tasks, globalConfig } = args

  const { name, env } = getArguments(args)
  const location = getTapPath(globalConfig, name)
  const { version } = require(`${location}/package.json`)

  const dockerCmd = buildDockerCmd(globalConfig, {
    name,
    location,
    version,
    cmd: `build`,
    tags: options,
  })

  await spawnCmd(dockerCmd, location)

}

module.exports = {
  name: 'build',
  alias: [ 'bld', 'make' ],
  action: buildTap,
  description: `Builds a taps docker container`,
  example: 'keg tap build <options>',
  options: {
    name: 'Name of the tap to build a Docker image for',
    env: 'Environment to build the Docker image for. Gets added as a tag to the image.'
  }
}