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
  Logger.pair(`Running command: `, `${args[0]}${extra}`)
  return spawnProc(...args)
}

/**
 * Spawns a new process to run a passed in cmd
 * @param {Array} args - Arguments to run a command
 *
 * @returns {*} - Response from spawned process
 */
const spawnProc = (...args) => {
  return args.length === 1
    ? spawnCmd(...args, {}, process.cwd())
    : spawnCmd(...args)
}

/**
 * Executes an inline async call to the command line
 * @param {string} cmd - Command to be run
 * @param {Array} args - Arguments to run a command
 *
 * @returns {*} - Response from async exec cmd
 */
const executeCmd = (cmd, ...args) => {
  // Get the options and location from the args
  const [ options={}, location=process.cwd() ] = args

  // Ensure the cwd is set
  options.cwd = options.cwd || location

  return asyncCmd(cmd, options)
}

module.exports = {
  spawnProc,
  executeCmd,
  spawnCmd: doSpawnCmd,
}