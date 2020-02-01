const { isArr } = require('jsutils')
const rootDir = require('app-root-path').path
const { errorHandler } = require('./utils')
const { create } = require('./childProcess')

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
module.exports = (cmd, args, cwd) => {
  cwd = cwd || rootDir

  return new Promise((res, rej) => {
    create({
      ...checkExtraArgs(cmd, args || []),
      onExit: () => res(true),
      options: {
        env: process.env,
        cwd: cwd,
      },
    })
  })
}
