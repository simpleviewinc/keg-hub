const path = require('path')
const fs = require('fs')
const { deepMerge, cloneArr, get, isObj, reduceObj, logData } = require('jsutils')
const buildAssets = require('./buildAssets')
const setupClient = require('./setupClient')
const { validateApp } = require('./helpers')

const freezeObj = Object.freeze

/**
 * Adds the Namespace to all keys of the passed in object
 * @param {Object} appConfig - app.json config file
 * @param {Object} addTo - Object to have it's keys name spaced
 *
 * @returns {Object} - new addTo object with it's keys updated
 */
const addNameSpace = (appConfig, addTo) => {
  const nameSpace = get(appConfig, [ 'clientResolver', 'aliases', 'nameSpace' ], '')
  if(!nameSpace || !isObj(addTo)) return addTo
  
  return reduceObj(addTo, (key, value, updated) => {
    updated[`${nameSpace}${key}`] = value
    return updated
  }, {})

}

/**
 * File extensions to search for when looking for client override
 *  Only files found in the clients folder with these extensions can override the base file path
 * @param {Object} [appConfig={}] - app.json config file
 *
 * @returns {Object} - Allowed file extensions
 */
 const buildExtensions = (appConfig={}) => {
  return freezeObj(
    cloneArr([
      '.ios.js',
      '.android.js',
      'web.js',
      '.js',
      '.json',
      '.sqlite',
      '.ttf',
      ...get(appConfig, [ 'clientResolver', 'extensions'], [])
    ])
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
      ...get(appConfig, [ 'clientResolver', 'aliases', 'base'], {})
    })
  )
 }

/**
 * Builds the default folders used to build an alias
 * Pull from clients and base folder
 * Can be over-written by clients folder
 * @param {Object} [appConfig={}] - app.json config file
 *
 * @returns {Object} - all dynamically mapped paths
 */
const buildDynamicContent = (appConfig={}) => {

  return freezeObj(
    addNameSpace(appConfig, {
      ...get(appConfig, [ 'clientResolver', 'aliases', 'dynamic'], {})
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
      Client: paths.client,
      Config: paths.config,
      ...reduceObj(
        get(appConfig, [ 'clientResolver', 'aliases', 'root'], {}),
        (key, value, addAliases) => {
          addAliases[key] = path.join(appRoot, value)
          return addAliases
        }, {})
    })
  )
 }


/**
 * Builds the constants which contains paths to the clients folder
 * @param {string} appRoot - Path to the root of the project
 * @param {Object} appConfig - app.json config file
 * @param {string} clientName - Name of the client to build for
 *
 * @return {Object} - Alias map to load files
 */
module.exports = (appRoot, appConfig, clientName) => {
  
  // Ensure the required app data exists
  validateApp(appRoot, appConfig)

  // Setup the client, to get the correct path data
  const {
    APP_CONFIG_PATH,
    BASE_PATH,
    CLIENT_NAME,
    CLIENT_PATH,
    HAS_CLIENT,
  } = setupClient(appRoot, appConfig, clientName)

  // Build the assets for the client
  const ASSETS_PATH = buildAssets(appConfig, BASE_PATH, CLIENT_NAME, CLIENT_PATH)

  // Build the aliasPaths object from the built client data
  const aliasPaths = {
    assets: ASSETS_PATH,
    base: BASE_PATH,
    client: CLIENT_PATH,
    config: APP_CONFIG_PATH,
    core: path.join(appRoot, './core')
  }

  // Return the constants set from the client data
  return freezeObj({
    APP_CONFIG_PATH,
    BASE_PATH,
    ASSETS_PATH,
    CLIENT_NAME,
    CLIENT_PATH,
    HAS_CLIENT,
    ALIASES: buildAliases(appRoot, appConfig, aliasPaths),
    BASE_CONTENT: buildBaseContent(appConfig),
    DYNAMIC_CONTENT: buildDynamicContent(appConfig),
    EXTENSIONS: buildExtensions(appConfig),
  })
  
}