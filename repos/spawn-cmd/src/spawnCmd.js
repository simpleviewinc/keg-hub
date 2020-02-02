const { isArr, get, checkCall, isFunc } = require('jsutils')
const rootDir = require('app-root-path').path
const { errorHandler } = require('./utils')
const { create, kill } = require('./childProcess')

const defEvents = (config, res, rej) => ({
  onStdOut: (data, procId) => {
    const onOut = get(config, 'onStdOut')
    isFunc(onOut)
      ? onOut(data, procId)
      : console.log(data)
  },
  onStdErr: (err, procId) => {
    const onErr = get(config, 'onStdErr')
    isFunc(onErr)
      ? onErr(err, procId)
      : (() => {
        errorHandler(err)
        kill(procId)
      })()
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
 * Simplified method to spawn a child process
 * @param {string} cmd - cmd to run in the spawned process
 * @param {Array} args - Arguments to pass to the spawned command
 * @param {string} cwd - Directory the command should be spawned from
 *
 * @returns {Promise} - resolves when the spawned process resolves
 */
module.exports = (cmd, config, cwd) => {
  cwd = cwd || get(config, 'cwd', rootDir)

  return new Promise((res, rej) => {
    create({
      ...config,
      ...checkExtraArgs(cmd, get(config, 'args', [])),
      ...defEvents(config, res, rej),
      options: {
        env: process.env,
        cwd: cwd,
        ...get(config, 'options', {}),
      },
    })
  })
}
