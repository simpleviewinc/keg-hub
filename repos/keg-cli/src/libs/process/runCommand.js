const { Logger } = require('KegLog')
const { isObj, isArr, isBool } = require('@svkeg/jsutils')
const { spawnCmd, asyncCmd } = require('@svkeg/spawn-cmd')

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
 * Checks the passed in args to see if the command should be logged
 * @param {Array} args - Arguments to run a command
 * @param {Array} message - Message to be logged
 *
 * @returns {void}
 */
const logSpawn = (args, message) => {
  // Get the last argument
  const lastArg = args[ args.length - 1 ]

  // Check if the command should br logged
  ;( args.length < 3 || !isBool(lastArg) || lastArg !== false ) && Logger.pair(...message)
}

/**
 * Checks if the the command to be run should be logged,
 * <br/> Then calls spawnProc to run the passed in command
 * @param {Array} args - Arguments to run a command
 * @param {string} args.cmd - Command to be passed to the node child process
 * @param {Array|Object*} args.options - Options to pass to the node child process
 * @param {string*} args.location - Path the child process will use as the cwd
 * @param {string*} args.log - Should the command be logged
 *
 * @returns {*} - Response from spawned process
 */
const doSpawnCmd = (...args) => {
  logSpawn(args, [ `Running command: `, `${ args[0] }${ getExtraArgs(args[1]) }` ])
  return spawnProc(...args)
}

/**
 * Spawns a new process to run a passed in cmd
 * @param {Array} args - Arguments to run a command
 * @param {string} args.cmd - Command to be passed to the node child process
 * @param {Array|Object*} args.options - Options to pass to the node child process
 * @param {string*} args.location - Path the child process will use as the cwd
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
 * @param {Array|Object*} args.options - Options to pass to the node child process
 * @param {string*} args.location - Path the child process will use as the cwd
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