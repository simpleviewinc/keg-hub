const { limbo, isStr } = require('jsutils')
const { promisify } = require('util')
const { exec } = require('child_process')
const cmdExec = promisify(exec)
const { errorHandler } = require('./utils')

/**
 * Runs a command in async by wrapping exec in a promise and try/catch
 * @param {string} command - command to run
 *
 * @returns {string} - Response from the run command
 */
module.exports = async command => {

  // Ensure the command to run is a string
  if(!isStr(command))
    return errorHandler(new Error(`syncCmd requires a string as the first argument!`))
  
  // Call the AWS Cli command
  const [ error, response ] = await limbo(cmdExec(command))
  
  // Check if an error and log it || return the response
  return error
    ? errorHandler(error)
    : response

}