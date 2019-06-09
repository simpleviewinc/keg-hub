'use strict'
const { logData, setLogs } = require('../log')
const { promisify } = require('../promise')
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
* @param  {any} message - message to log
* @param  { object } error - thrown during service account process
* @param  {string} [type='error'] - type of message to log
* @return { void }
*/
const errorHelper = (message, error, type = 'error') => {
  setLogs(true)
  logData(message, error, type)
  if(!SHOW_LOGS) setLogs(false)
}

/**
* Logs a message to the condole
* @param  { string } message - message to be logged
* @param  { string } type - method that shoudl be called  ( log || error || warn )
* @return { void }
*/
const logMessage = (message, type = 'log', force) => {
  if(force) setLogs(true)
  logData(message, type)

  if(force && !SHOW_LOGS) setLogs(false)
}

/**
* Stops execution for a given amount of time
* @param  { number } time
* @return { void }
*/
const wait = time => (new Promise((res, rej) => setTimeout(() => res(true), time)))

/**
* Gets arguments from the cmd line
* @return { object } - converted CMD Line arguments as key / value pair
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
* Ensures all required arguments exist
* @param  { object } args - passed in arguments
* @param  { object } errors - error message for required arguments
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
* @param  { string } line - command to be run in the shell
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
* Copies files to a new location
* @param  { string } file - file to be copied
* @param  { string } loc - location to put the copied file
* @return { void }
*/
const copyFile = async (file, loc) => await cmd(
  `cp ${file} ${loc}`
)

/**
* Ensures a file path exists, if it does not, then it creates it
* @param  { string } checkPath - path to check
* @return { boolean } - if the path exists
*/
const ensurePath = async checkPath => {
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
* @param  { string } path - location to save the file
* @param  { string } data - data to save in the file
* @return { promies || boolean } - if the file was saved
*/
const writeFile = (filePath, data) => (
  new Promise((req, rej) => fs.writeFile(filePath, data, err => err ? rej(err) : req(true)))
)

module.exports = {
  cmd,
  copyFile,
  ensurePath,
  errorHelper,
  getArgs,
  logMessage,
  wait,
  writeFile,
  validateArgs
}

