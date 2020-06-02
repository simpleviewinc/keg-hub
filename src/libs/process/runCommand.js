const { isObj, isArr } = require('jsutils')
const { spawnCmd, asyncCmd } = require('spawn-cmd')
const { Logger } = require('KegLog')

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
 * Logs the command to be run, then calls spawnProc to run the passed in command
 * @param {Array} args - Arguments to run a command
 *
 * @returns {*} - Response from spawned process
 */
const doSpawnCmd = (...args) => {
  const extra = getExtraArgs(args[1])
  Logger.message(`Running command: `, `${args[0]}${extra}`)
  return spawnProc(...args)
}


/**
 * Spawns a new process to run a passed in cmd
 * @param {Array} args - Arguments to run a command
 *
 * @returns {*} - Response from spawned process
 */
const spawnProc = (...args) => {
  return args.length > 1
    ? spawnCmd(...args)
    : spawnCmd(...args, process.cwd())
}

module.exports = {
  spawnProc,
  executeCmd: asyncCmd,
  spawnCmd: doSpawnCmd,
}