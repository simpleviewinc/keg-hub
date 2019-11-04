/** @module command */

'use strict'

const { logData, setLogs } = require('../log')
const { promisify, wait } = require('../promise')
const { exec } = require('child_process')
const cmdExec = promisify(exec)
const fs = require('fs')

const { SHOW_LOGS, NODE_ENV } = process.env
const cmdOpts = {
  groupID: process.getgid(),
  userID: process.getuid(),
  maxBuffer: Infinity
}
SHOW_LOGS && setLogs(true)
const ERROR_PREFIX = 'ERROR'

/**
* Logs a message to the console
* @function
* @param {any} message - message to log
* @param {Object} error - thrown during service account process
* @param {string} [type='error'] - type of message to log
* @return { void }
*/
const errorHelper = (message, error, type = 'error') => {
  setLogs(true)
  logData(message, error, type)
  if(!SHOW_LOGS) setLogs(false)
}

/**
* Logs a message to the console
* @function
* @param {string} message - message to be logged
* @param {string} type - method that shoudl be called  ( log || error || warn )
* @return { void }
*/
const logMessage = (message, type = 'log', force) => {
  if(force) setLogs(true)
  logData(message, type)

  if(force && !SHOW_LOGS) setLogs(false)
}

/**
 * Gets arguments from the cmd line
 * @function
 *
 * @return {Object} - converted CMD Line arguments as key / value pair
 */
const getArgs = () => {
  return process.argv
    .slice(2)
    .reduce((args, arg) => {
      if (arg.indexOf('-') !== 0) throw new Error(`Invalid Argument: ${arg} is missing "-". Argument key should be "-${arg}"`)
      arg = arg
        .split('-')
        .filter(it => it)
        .join('-')

      if (arg.indexOf('=') === -1) args[arg] = true
      else {
        const parts = arg.split('=')
        const name = parts[0]
        const val = parts[1]
        args[name] = val.indexOf(',') === -1
          ? val
          : val.split(',')
      }

      return args
    }, {})
}

/**
* Ensures all required arguments exist based on passed in error object
* @function
* @param {Object} args - passed in arguments
* @param {Object} errors - error message for required arguments
* @return { void }
*/
const validateArgs = (args, errors) => (
  Object
    .keys(errors)
    .map(key => {
      if (!args[key]) {
        if (typeof errors[key] === 'object'){
          if (errors[key].condition && args[ errors[key].condition ]) return
          if (errors[key].message) throw Error(errors[key].message)
        }
        throw Error(errors[key])
      }
    })
)

/**
* Makes calls to the cmd line shell
* @function
* @param {string} line - command to be run in the shell
* @return response from the shell
*/
const cmd = async line => {
  SHOW_LOGS && logData(`CMD => ${line}`, 'log')
  const response = await cmdExec(line, cmdOpts)
  const { stdout, stderr } = response
  if (stderr && stderr.indexOf(ERROR_PREFIX) === 0)

    throw new Error(stderr)

  return stdout
}

/**
* Copies file from one location to another
* @function
* @param {string} file - file to be copied
* @param {string} loc - location to put the copied file
* @return { void }
*/
const copyFile = async (file, loc) => await cmd(
  `cp ${file} ${loc}`
)

/**
* Ensures a folder path exists, if it does not, then it creates it
* @function
* @param {string} checkPath - path to check
* @return {boolean} - if the path exists
*/
const ensureFolderPath = async checkPath => {
  try {
    // Check if the path exists, if not, then create it
    const pathExists = fs.existsSync(checkPath)
    !pathExists && await cmd(`mkdir -p ${checkPath}`)
  }
  catch (e){
    return true
  }
}

/**
* Writes a file to the local system
* @function
* @param {string} path - location to save the file
* @param {string} data - data to save in the file
* @return { promise || boolean } - if the file was saved
*/
const writeFile = (filePath, data) => (
  new Promise((req, rej) => fs.writeFile(filePath, data, err => err ? rej(err) : req(true)))
)

module.exports = {
  cmd,
  copyFile,
  ensureFolderPath,
  errorHelper,
  getArgs,
  logMessage,
  writeFile,
  validateArgs
}

