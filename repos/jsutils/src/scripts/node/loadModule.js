/** @module command */

'use strict'

const path = require('path')
const { isArr } = require('../array')
const { isFunc } = require('../method')
const { isObj } = require('../object')
const { isStr } = require('../string')

const getRelativePath = pathToModule => {
  const { filename } = module.parent
  const split = filename.split('/')
  split.pop()

  return path.resolve(split.join('/'), pathToModule)
}

/**
 * Use nodes require method to load a module by file path.
 * <br> Use the rootDir to load the module if it's passed in
 * <br> If rootDir + pathToModule fails, will try to load the module without the rootDir
 * @param {Path|string} pathToModule - Path to the module to load
 * @param {Object} config - settings to load the module
 * @param {Path|string} config.rootDir - root directory to load the module from
 * @param {boolean} config.logErrors - should require errors be logged
 * @returns {Object|function} - Loaded module
 */
const requireModule = (pathToModule, config) => {
  const { rootDir, logErrors } = config
  try {
    // Check if a rootDir exists
    return rootDir
      // If rootDir exists, use it to load the module
      ? require(path.join(rootDir, pathToModule))
      // If no rootDir, try to load the module without it
      : require(getRelativePath(pathToModule))
  }
  catch(err){
    // Show errors if set to true
    logErrors && logData(err.message, `error`)

    // If there's and error, call requireModule again, without the rootDir
    return rootDir
      ? requireModule(pathToModule, null)
      : undefined
  }
}

/**
 * Checks if the module is a function and calls it
 * <br> Or if it's an object return it
 * @param {*} foundModule - module loaded from require
 * @param {*} params - arguments to pass to the module if it's a function
 * @returns
 */
const loadByType = (foundModule, params) => {
  // Check the type of the foundModule
  return isFunc(foundModule)
    // If it's a function call it with params
    ? foundModule(...params)
    // If it's an object just return it
    : isObj(foundModule) || isArr(foundModule)
      ? foundModule
      // If it's not a function or object, return undefined
      : undefined
}

/**
 * Loops through the pathsToModule array trying to require them 
 *
 * @param {Array} pathsToModule - Potential paths to a module
 * @param {Object} config - settings to load the module
 * @param {Path|string} config.rootDir - root directory to load the module from
 * @param {boolean} config.logErrors - should require errors be logged
 * @param {Array} params - Arguments to pass the the module when called if it's a function
 *
 * @returns {Object} - Loaded module object
 */
const loopLoad = (pathsToModule, config, params) => {
  try {
    const modulePath = pathsToModule.shift()
    const foundModule = requireModule(modulePath, config)
    const loadedModule = foundModule && loadByType(foundModule, params)

    if(!loadedModule) throw new Error(`No Module!`)

    return loadedModule
  }
  catch(err){
    if(!isArr(pathsToModule) || !pathsToModule.length) return undefined

    return loopLoad(pathsToModule, config, params)
  }
}


/**
 * Use nodes require method to load a module by file path.
 * <br> If the path does not exist check the altPaths to see if any of those paths exist
 * <br> If it's a function call it and pass in the params array
 * <br> Module path is relative to the caller, NOT this function file location!
 * @function
 * @example
 * const packageConfig = loadModule('../package.json')
 * @example
 * const packageConfig = loadModule([ './package.json', '../package.json', '../../package.json', ])
 * @example
 * const packageConfig = loadModule([ './package.json' ], { rootDir: 'path to root directory' })
 * @example
 * const packageConfig = loadModule([ './functionModule' ], {}, param1, param2, param2)
 * // Module will be called if it's a function, and param1, param2, param2 will be passed in
 * @param {Array|string} pathsToModule - Potential paths to a module
 * @param {Object} config - settings to load the module
 * @param {Path|string} config.rootDir - root directory to load the module from
 * @param {boolean} config.logErrors - should require errors be logged
 * @param {Array} params - Arguments to pass the the module when called if it's a function
 *
 * @returns {Object} - Loaded module object
 */
const loadModule = (pathsToModule, config={}, ...params) => {
  
  // Check If a string is passed in
  pathsToModule = isStr(pathsToModule)
    // If it's a string, convert to an array
    ? [ pathsToModule ]
    // Otherwise check if it's and array
    : isArr(pathsToModule) && pathsToModule
  
  // Check if there are paths to load
  return pathsToModule
    // Call loopLoad to load the module
    ? loopLoad(pathsToModule, config, params)
    // If not paths, log an error
    : lodData(`loadModule requires an array or string as the first argument.`, `error`)

}


module.exports = loadModule