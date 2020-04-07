/*
  * What buildTap method should do
    1. Build a docker container for the tap
*/

const { getArgument, getTapPath } = require('KegUtils')
const { buildDockerCmd, getBuildTags } = require('KegDocker')
const { SSH_KEY_PATH } = require('KegConst')
const { spawnCmd, executeCmd } = require('KegProc')
const path = require('path')

/**
 * Builds a docker container for a tap so it can be run
 *
 * @param {*} args
 */
const buildTap = async (args) => {
  const { command, options, tasks, globalConfig } = args

  const name = getArgument({ options, long: 'name', short: 'n' })
  const location = getTapPath(globalConfig, name)

  const dockerCmd = buildDockerCmd({
    name,
    location,
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
  example: 'keg tap build <options>'
}