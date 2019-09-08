const fs = require('fs')
const path = require('path')
const { get, isObj, isStr } = require('jsutils')

/**
 * Checks is a path is a directory
 * @param {string} check - path to check if it's a directory
 *
 * @return {boolean} - if passed in string is a directory path
 */
const isDirectory = (check, skipThrow) => {
  try {
    fs.lstatSync(check).isDirectory()
    return true
  }
  catch(e){
    if(skipThrow) return false

    throw e
  }
}

/**
 * Checks if a path exists.
 * @param {string} check - path to check if it exists
 *
 * @return {boolean} - if passed in string exists on the file system
 */
const pathExists = check => {
  return new Promise((res, rej) => {
    // Check if the file exists
    fs.stat(check, (err, stats) => {
      // If no error the it exits, so resolve ture
      !err
        ? res(true)
        // If the error is 34, means the file does not exist, so return false
        : err.errno === 34
          ? res(false)
          : rej(err)
    })
  })
}

/**
 * Wraps require in a try catch to app doesn't throw when require is called inline
 * @param {string} folder - The path to the file to require
 * @param {string} file - The file to require
 * @param {boolean} logError - If the require fails, should the app throw
 *
 * @returns {Object} - Content of the required file
 */
const requireFile = (folder, file, logError) => {
  try {
    return require(path.join(folder, file))
  }
  catch(e){
    if(!logError) return
    logData(`Could not require file from path => ${path.join(folder, file)}`, `error`)
    logData(e.message, `error`)
    logData(e.stack, `error`)
  }
}

/**
 * Validates the required App data
 * @param {string} appRoot - Path to the root of the project
 * @param {Object} appConfig - app.json config file
 *
 * @return {void}
 */
const validateApp = (appRoot, appConfig) => {
  if(!appRoot || !isStr(appRoot))
    throw new Error(`App root directory path ( String ) is required as the first argument!`)

  if(!appConfig || !isObj(appConfig))
    throw new Error(`App config ( Object ) is required as the second argument!`)
}

module.exports = {
  isDirectory,
  pathExists,
  requireFile,
  validateApp
}