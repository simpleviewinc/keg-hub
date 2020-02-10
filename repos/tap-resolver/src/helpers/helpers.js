const fs = require('fs')
const path = require('path')
const { get, isObj, isStr, keyMap, deepFreeze } = require('jsutils')

/**
 * Checks is a path is a directory
 * @param {string} check - path to check if it's a directory
 *
 * @return {boolean} - if passed in string is a directory path
 */
const isDirectory = (check, skipThrow) => {
  try {
    return fs.lstatSync(check).isDirectory()
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
 * Checks if a path exists.
 * @param {string} check - path to check if it exists
 *
 * @return {boolean} - if passed in string exists on the file system
 */
const pathExistsSync = checkPath => {
  try {
    const stats = fs.statSync(checkPath)
    return true
  }
  catch(err) {
    return false
  }
}

/**
 * Builds a path, then check if it exists
 * @param {string} basePath - Relative path location
 * @param {string} checkPath - Path to check if it exists
 *
 * @returns {string|boolean} - Path if it exists || false
 */
const buildCheckPath = (basePath, checkPath) => {
  if(!isStr(basePath) || !isStr(checkPath)) false
  
  const location = path.join(basePath, checkPath)

  return pathExistsSync(location) && location
}

/**
 * Checks if a path exists relative to the tap directory
 * If it does, then it returns that path, Otherwise
 * it checks if path exists relative to the keg directory and returns it
 * @param {*} tapPath - Tap root directory
 * @param {*} kegPath - Keg root directory
 * @param {*} checkPath - Path to check if it exists
 *
 * @returns {string|boolean} - Path if it exists || false
 */
const checkTapKegPath = (tapPath, kegPath, checkPath) => {
  return buildCheckPath(tapPath, checkPath) || buildCheckPath(kegPath, checkPath)
}

/**
 * Ensures a directory exists
 * @param {string} dirPath - path to ensure
 *
 * @return {string} - directory path that was ensured
 */
const ensureDirSync = dirPath => {
  try {
    // make the directory if it doesn't exist
    !fs.existsSync(dirPath) && fs.mkdirSync(dirPath)

    return dirPath
  }
  catch(err) {
    return false
  }
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
    // Build the path to the file
    const location = path.join(folder, file)
    // load the data
    const data = require(location)

    return { data, location }
  }
  catch(e){
    if(!logError) return {}
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
const validateApp = (kegPath, config) => {
  if(!kegPath || !isStr(kegPath))
    throw new Error(
      `Tap Resolver requires a kegPath as a valid string. Instead ${kegPath} was received!`
    )

  if(!config || !isObj(config))
    throw new Error(
      `Tap Resolver requires a config as a valid object. Instead ${config} was received!`
    )

}


module.exports = {
  checkTapKegPath,
  ensureDirSync,
  isDirectory,
  pathExists,
  pathExistsSync,
  requireFile,
  validateApp
}
