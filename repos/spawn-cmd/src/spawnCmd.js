const { isArr, isStr, isObj, get, checkCall, isFunc } = require('jsutils')
const rootDir = require('app-root-path').path
const { errorHandler } = require('./utils')
const { create, kill } = require('./childProcess')

/**
 * Default events used to monitor the spawned process
 * Can be overwritten by passing in a config object with methods when calling spawnCmd
 * @param {Object} config - Object used to override the default event methods
 *
 * @returns {Object} - Contains the event methods for the spawn command
 */
const defEvents = (config, res, rej) => ({
  onStdOut: (data, procId) => {
    const onOut = get(config, 'onStdOut')
    isFunc(onOut)
      ? onOut(data, procId)
      : process.stdout.write(data)
  },
  onStdErr: (err, procId) => {
    const onErr = get(config, 'onStdErr')
    isFunc(onErr)
      ? onErr(err, procId)
      : errorHandler(err)
  },
  onError: (err, procId) => {
    const onErr = get(config, 'onError')
    isFunc(onErr)
      ? onErr(err, procId)
      : (() => {
        errorHandler(err)
        kill(procId)
      })()
  },
  onExit: (exitCode, procId) => {
    checkCall(get(config, 'onExit'), exitCode, procId)
    kill(procId)
    res(exitCode)
  }
})

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
      ? str.split(' ')
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
  args = cmdSplit.concat(args)

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

/**
 * Simplified method to spawn a child process
 * @param {Array} args - arguments needed to run the spawned command
 *
 * @returns {Promise} - resolves when the spawned process resolves
 */
module.exports = (...args) => {
  const { cmd, config, cwd } = getArgs(...args)

  return new Promise((res, rej) => {
    create({
      ...config,
      ...checkExtraArgs(cmd, get(config, 'args', [])),
      ...defEvents(config, res, rej),
      options: {
        env: process.env,
        ...(cwd && { cwd: cwd }),
        ...get(config, 'options', {}),
      },
    })
  })

}
