const { limbo, isStr, get } = require('jsutils')
const { promisify } = require('util')
const { exec } = require('child_process')
const cmdExec = promisify(exec)
const { errorHandler } = require('./utils')
const rootDir = require('app-root-path').path

/**
 * Default cmd options.
 * Passes all ENVs to the child process.
 * Sets cwd to the root directory.
*/
const cmdOpts = {
  gid: process.getgid(),
  uid: process.getuid(),
  env: process.env,
  cwd: rootDir,
}

/**
 * Runs a command in async by wrapping exec in a promise and try/catch
 * @param {string} command - command to run
 *
 * @returns {string} - Response from the run command
 */
module.exports = async (command, options) => {

  // Ensure the command to run is a string
  if(!isStr(command))
    return errorHandler(new Error(`syncCmd requires a string as the first argument!`))

  // Call the command
  const promiseCmd = cmdExec(command, { ...cmdOpts, ...options })

  // Wait for the process to finish
  const [ error, output ] = await limbo(promiseCmd)

  // Return the buffered output
  return {
    error: get(error, 'message', get(output, 'stderr')) || get(output, 'stderr'),
    data: get(output, 'stdout'),
    exitCode: get(promiseCmd, 'child.exitCode')
  }

}