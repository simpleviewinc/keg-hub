const path = require('path')
const fs = require('fs')
const { deepMerge, cloneArr, get, isObj, reduceObj, logData } = require('jsutils')
const buildAssets = require('./buildAssets')
const setupTap = require('./setupTap')
const { validateApp } = require('./helpers')
const tapConstants = require('./tapConstants')

const freezeObj = Object.freeze

/**
 * Adds the Namespace to all keys of the passed in object
 * @param {Object} appConfig - app.json config file
 * @param {Object} addTo - Object to have it's keys name spaced
 *
 * @returns {Object} - new addTo object with it's keys updated
 */
const addNameSpace = (appConfig, addTo) => {
  const nameSpace = get(appConfig, [ 'tapResolver', 'aliases', 'nameSpace' ], '')
  if(!nameSpace || !isObj(addTo)) return addTo
  
  return reduceObj(addTo, (key, value, updated) => {
    updated[`${nameSpace}${key}`] = value
    return updated
  }, {})

}

/**
 * File extensions to search for when looking for tap override
 *  Only files found in the taps folder with these extensions can override the base file path
 * @param {Object} [appConfig={}] - app.json config file
 *
 * @returns {Object} - Allowed file extensions
 */
 const buildExtensions = (appConfig={}) => {
  return freezeObj(
    cloneArr(
      // Try to pull the extensions from the config
      get(appConfig, [ 'tapResolver', 'extensions', 'resolve' ],
      // Otherwise set the default extensions
      get(tapConstants, [ 'extensions', 'resolve' ], [])
    ))
  )
 }

/**
 * Builds default folders at the base path
 * Pull from base folder only
 * Can not be over-written
 * @param {Object} [appConfig={}] - app.json config file
 *
 * @returns {Object} - static mapped paths
 */
 const buildBaseContent = (appConfig={}) => {
  return freezeObj(
    addNameSpace(appConfig, {
      ...get(appConfig, [ 'tapResolver', 'aliases', 'base'], {})
    })
  )
 }

/**
 * Builds the default folders used to build an alias
 * Pull from taps and base folder
 * Can be over-written by taps folder
 * @param {Object} [appConfig={}] - app.json config file
 *
 * @returns {Object} - all dynamically mapped paths
 */
const buildDynamicContent = (appConfig={}) => {
  // Build the dynamic alias paths
  return freezeObj(
    addNameSpace(appConfig, {
      ...get(appConfig, [ 'tapResolver', 'aliases', 'dynamic'], {}),
    })
  )
}


 /**
  * Builds the default Alias to load app content
  * Can not be over-written
  * Paths that pull base folder only
  * @param {string} appRoot - path to the root of the project
  * @param {Object} [appConfig={}] - app.json config file
  * @param {Object} [paths={}] - object holds the paths to be set
  *
  * @returns {Object} - all paths that should be an alias
  */
 const buildAliases = (appRoot, appConfig={}, paths={}) => {

  return freezeObj(
    addNameSpace(appConfig, {
      AppRoot: appRoot,
      Assets: paths.assets,
      Base: paths.base,
      Tap: paths.tap,
      Config: paths.config,
      ...reduceObj(
        get(appConfig, [ 'tapResolver', 'aliases', 'root'], {}),
        (key, value, addAliases) => {
          addAliases[key] = path.join(appRoot, value)
          return addAliases
        }, {})
    })
  )
 }


/**
 * Builds the constants which contains paths to the taps folder
 * @param {string} appRoot - Path to the root of the project
 * @param {Object} appConfig - app.json config file
 * @param {string} tapName - Name of the tap to build for
 *
 * @return {Object} - Alias map to load files
 */
module.exports = (appRoot, appConfig, tapName) => {
  
  // Ensure the required app data exists
  validateApp(appRoot, appConfig)

  // Setup the tap, to get the correct path data
  const {
    APP_CONFIG,
    APP_CONFIG_PATH,
    BASE_PATH,
    TAP_NAME,
    TAP_PATH,
    HAS_TAP,
  } = setupTap(appRoot, appConfig, tapName)

  // Build the assets for the tap
  const ASSETS_PATH = buildAssets(APP_CONFIG, BASE_PATH, TAP_PATH)

  // Build the aliasPaths object from the built tap data
  const aliasPaths = {
    assets: ASSETS_PATH,
    base: BASE_PATH,
    tap: TAP_PATH,
    config: APP_CONFIG_PATH
  }

  // Return the constants set from the tap data
  return freezeObj({
    APP_CONFIG,
    APP_CONFIG_PATH,
    BASE_PATH,
    ASSETS_PATH,
    TAP_NAME,
    TAP_PATH,
    HAS_TAP,
    ALIASES: buildAliases(appRoot, APP_CONFIG, aliasPaths),
    BASE_CONTENT: buildBaseContent(APP_CONFIG),
    DYNAMIC_CONTENT: buildDynamicContent(APP_CONFIG),
    EXTENSIONS: buildExtensions(APP_CONFIG),
  })
  
}