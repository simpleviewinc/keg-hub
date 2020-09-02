const { limbo, isStr, get } = require('@keg-hub/jsutils')
const shellExec = require('shell-exec')
const { errorHandler } = require('./utils')
const rootDir = require('app-root-path').path
const { checkExtraArgs, getCWD } = require('./utils/cmdArgs')

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
module.exports = async (command, options={}, cwd) => {
  // Ensure the command to run is a string
  if(!isStr(command))
    return errorHandler(new Error(`asyncCmd requires a string as the first argument!`))
  
  // Ensure we have a directory to run the command from
  cwd = getCWD(options, cwd)

  // Wait for the process to finish
  const [ error, output ] = await limbo(shellExec(
    command,
    { 
      ...cmdOpts,
      ...options,
      env: { ...cmdOpts.env, ...options.env },
      ...(cwd && { cwd: cwd })
    }
  ))


  // Return the buffered output
  return {
    error: get(error, 'message', get(output, 'stderr')) || get(output, 'stderr'),
    data: get(output, 'stdout'),
    exitCode: get(output, 'code')
  }

}