/*
  * What buildTap method should do
    1. Build a docker container for the tap
*/

const { getArgument, getBuildTags } = require('KegUtils')
const { TAP_DOCKER_FILE } = require('KegConst')
const { spawnCmd } = require('KegProc')
const path = require('path')

/**
 * Builds a docker container for a tap so it can be run
 *
 * @param {*} args
 */
const buildTap = async (args) => {
  const { command, options, tasks, globalConfig } = args
  const name = getArgument({ options, def: `tap` })
  const dockerCmd = `docker build -f ${TAP_DOCKER_FILE} ${ getBuildTags(name, options) } .`

  await spawnCmd(
    dockerCmd,
    path.join(__dirname, '../../../../events-force')
  )

}

module.exports = {
  name: 'build',
  alias: [ 'bld', 'make' ],
  action: buildTap,
  description: `Builds a taps docker container`,
  example: 'keg tap build <options>'
}