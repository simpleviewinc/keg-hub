const fs = require('fs')
const path = require('path')
const { get } = require('jsutils')
const { isDirectory, pathExists, validateApp } = require('./helpers')

/**
 * Adds a folder's sub-folders to an object as key = sub-folder name, value = sub-folder path.
 * @param {string} tapsList - path to parent folder to search for sub-folders
 * @param {Object} found - perviously found sub-folders
 * @param {Object} appConfig - Global app configuration
 *
 * @return {Object} updated passed in found object
 */
const loopTaps = (tapsList, found={}, appConfig={}) => {

  // ensure the taps directory exists
  return isDirectory(tapsList)
    ? fs
      .readdirSync(tapsList)
      .reduce((allTaps, name) => {

        // Don't add the root app to the all taps
        if(name == appConfig.name) return allTaps

        // Create the tap path
        const tapPath = path.join(tapsList, name)
        
        // Check if it's a directory
        if(isDirectory(tapPath))
          allTaps[name] = tapPath

        // return the taps
        return allTaps
      }, found)
    : {}
}

/**
 * Searches the node_modules and local taps folders for taps.
 * @param {string} nodeModuleTaps - Path to node_modules taps folder
 * @param {string} localTaps - path to local taps folder
 *
 * @return {Object} - found taps
 */
const tapFolders = async (nodeModuleTaps, localTaps, appConfig) => {
  // Check the node_module taps folder exists
  const existsNM = await pathExists(nodeModuleTaps)

  // Get all node_module taps
  const foundNM = existsNM ? loopTaps(nodeModuleTaps, {}, appConfig) : {}

  // Check the local taps folder exists
  const existsLocal = await pathExists(localTaps)

  // Get all local taps, overwrite and duplicate node_module taps
  const taps = existsLocal ? loopTaps(localTaps, foundNM, appConfig) : foundNM

  return taps
}

/**
 * Generates a tap image cache file, which allows loading tap specific images.
 * @param {string} appRoot - Base directory of the app
 * @param {Object} appConfig - Global app configuration
 *
 * @return {void}
 */
module.exports =  async (appRoot, appConfig) => {

  // Ensure the required app data exists
  validateApp(appRoot, appConfig)
  
  const {
    externalTaps,
    localTaps,
    tapList,
    tapListFile
  } = get(appConfig, [ 'tapResolver', 'paths' ], {})

  // Check for local tap path
  const localTap = path.join(appRoot, localTaps)

  // Check for external tap path
  const nodeModuleTap = path.join(appRoot, externalTaps)

  // Get's all the tap folders in nm and locally
  let tapsObj = await tapFolders(nodeModuleTap, localTap, appConfig)
  
  // Get all the tap names
  const allNames = Object.keys(tapsObj)

  // Convert the tapsObj into a string of key / value pair - tap name / tap path
  const tapsStr = Object
    .entries(tapsObj)
    .reduce((allTaps, [ name, path ], index) => {

      // Check if it's the last tap
      const end = index === (allNames.length - 1) ? '' : ',\n'

      // Add the key value pair
      allTaps += `  '${name}': '${path}'${end}`

      // Return the taps string
      return allTaps
    }, '')

  // Add the found taps to the list of taps
  const tapListData = `const tapPaths = {\n${tapsStr}\n}\n\nexport default tapPaths`

  // Build the tapList path
  const tapListPath = path.join(appRoot, tapList, tapListFile || 'tapList.js')
  
  // Write the taps file
  fs.writeFileSync(tapListPath, tapListData, 'utf8')
}
