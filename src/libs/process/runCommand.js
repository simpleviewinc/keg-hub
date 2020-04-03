const { isObj, isArr } = require('jsutils')
const { spawnCmd, asyncCmd } = require('spawn-cmd')
const { Logger } = require('../terminal/logger')

/**
 * Gets any extra arguments passed to the spawned command so they can be logged
 * @param {Object|Array} extra
 *
 * @returns {String} - Extra arguments joined as a string
 */
const getExtraArgs = extra => {
  return isArr(extra)
    ? ' ' + extra.join(' ')
    : isObj(extra) && isArr(extra.args)
      ? ' ' + extra.args.join(' ')
      : ''
}

/**
 * Logs the command to be run, the spawns a new process to run the command
 * @param {Array} args - Arguments to run a command
 *
 * @returns {*} - Response from spawned process
 */
const doSpawnCmd = (...args) => {
  const extra = getExtraArgs(args[1])
  Logger.info(`Running command: ${args[0]}${extra}`)

  return spawnCmd(...args)
}

module.exports = {
  executeCmd: asyncCmd,
  spawnCmd: doSpawnCmd,
}