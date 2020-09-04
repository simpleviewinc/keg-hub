const { isArr, isStr, isObj, get, checkCall, isFunc } = require('@keg-hub/jsutils')
const rootDir = require('app-root-path').path
const { errorHandler } = require('./utils')
const { create, kill } = require('./childProcess')
const { checkExtraArgs, getArgs } = require('./utils/cmdArgs')

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
      : process.stderr.write(err)
  },
  onError: (err, procId) => {
    const onErr = get(config, 'onError')
    isFunc(onErr)
      ? onErr(err, procId)
      : errorHandler(err)
  },
  onExit: (exitCode, procId) => {
    checkCall(get(config, 'onExit'), exitCode, procId)
    res(exitCode)
  }
})

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
