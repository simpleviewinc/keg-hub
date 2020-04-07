const { getArgument, getTapPath } = require('KegUtils')
const { buildDockerCmd } = require('KegDocker')
const { spawnCmd, executeCmd } = require('KegProc')

/**
 * Builds a docker container for a tap so it can be run
 *
 * @param {*} args
 */
const buildTap = async (args) => {
  const { command, options, tasks, globalConfig } = args

  const name = getArgument({ options, long: 'name', short: 'n' })
  const location = getTapPath(globalConfig, name)
  const { version } = require(`${location}/package.json`)

  const dockerCmd = buildDockerCmd({
    name,
    location,
    cmd: `build`,
    tags: options.concat([ '-t', version ]),
  })

  await spawnCmd(dockerCmd, location)

}

module.exports = {
  name: 'build',
  alias: [ 'bld', 'make' ],
  action: buildTap,
  description: `Builds a taps docker container`,
  example: 'keg tap build <options>'
}