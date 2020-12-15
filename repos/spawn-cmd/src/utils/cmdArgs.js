const { isArr, isStr, isObj, get } = require('@keg-hub/jsutils')
const rootDir = require('app-root-path').path
const { errorHandler } = require('./error')
const { parseQuotes } = require('./parseQuotes')

/**
 * Ensures the args Array is an Array
 * @param {Array} args - Arguments to pass to the spawned command
 *
 * @returns {Array} - Updated args array
 */
const ensureArgsArray = args => {
  return isArr(args)
    ? args
    : isStr(args)
      ? args.split(' ')
      : errorHandler({ message: 'Arguments must be a string or an array of strings!' }) || []
}

/**
 * Helper to check if the cmd includes any arguments
 * If it does, they get added to the args array
 * @param {string} cmd - cmd to run in the spawned process
 * @param {Array} args - Arguments to pass to the spawned command
 *
 * @returns {Object} - Updated cmd and args
 */
const checkExtraArgs = (cmd, args) => {

  const cmdSplit = cmd.split(' ')
  cmd = cmdSplit.shift()

  args = ensureArgsArray(args)
  args = parseQuotes(cmdSplit.concat(args))

  return { cmd, args }
}

/**
 * Gets the directory to use as the root of the spawned process
 * @param {Object|string} config - Options passed from the consumer
 * @param {string} config.cwd - Directory to use as the root of the spawned process
 * @param {string} cwd - Directory to use as the root of the spawned process
 *
 * @returns {string} - Directory to use as the root of the spawned process
 */
const getCWD = (config, cwd) => {
  return isStr(cwd)
    ? cwd
    : isStr(config)
      ? config
      : isObj(config) && get(config, 'cwd', rootDir)
}

/**
 * Formats the passed in arguments, to ensure requred arguments exist
 * @param {string} cmd - cmd to run in the spawned process
 * @param {Object|string} config - Options passed from the consumer
 * @param {string} cwd - Directory the command should be spawned from
 *
 * @returns {Object} - Containes the formatted properties to run the spawned process
 */
const getArgs = (cmd, config, cwd) => {
  return {
    cmd,
    config: isObj(config) ? config : {},
    cwd: getCWD(config, cwd),
  }
}

module.exports = {
  checkExtraArgs,
  ensureArgsArray,
  getArgs,
  getCWD,
}