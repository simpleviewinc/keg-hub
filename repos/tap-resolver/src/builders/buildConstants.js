const path = require('path')
const { cloneArr, get, isObj, reduceObj } = require('@keg-hub/jsutils')
const buildAssets = require('./buildAssets')
const { validateApp } = require('../helpers')
const { setupTap, tapConstants } = require('../tap')
const freezeObj = Object.freeze

/**
 * Adds the Namespace and BaseNameSpace to all keys of the passed in object
 * The BaseNameSpace allows the base to use alias that are not impacted by the taps namespace alias
 * Technically they both resolve to the same location, but the BaseNameSpace is constant
 * Where the a taps namespace can be different per tap
 * @param {Object} appConfig - app.json config file
 * @param {Object} addTo - Object to have it's keys name spaced
 *
 * @returns {Object} - new addTo object with it's keys updated to include the namespaces 
 */
const addNameSpace = (appConfig, addTo) => {
  const nameSpace = get(
    appConfig,
    [ 'keg', 'tapResolver', 'aliases', 'nameSpace' ],
    ''
  )
  const baseNameSpace = get(
    appConfig,
    [ 'keg', 'tapResolver', 'aliases', 'baseNameSpace' ],
    ''
  )

  if ((!nameSpace && !baseNameSpace) || !isObj(addTo)) return addTo

  const sameNameSpace = baseNameSpace && baseNameSpace === nameSpace

  return reduceObj(
    addTo,
    (key, value, updated) => {
      nameSpace && (updated[`${nameSpace}${key}`] = value)

      // TODO: Investigate getting the base value and using that
      // Instead of using the current value

      // Only add the baseNamespace if it's not the same as namespace
      // Otherwise we're just duplicating the alias
      !sameNameSpace &&
        baseNameSpace &&
        (updated[`${baseNameSpace}${key}`] = value)

      return updated
    },
    {}
  )
}

/**
 * File extensions to search for when looking for tap override
 *  Only files found in the taps folder with these extensions can override the base file path
 * @param {Object} [appConfig={}] - app.json config file
 *
 * @returns {Object} - Allowed file extensions
 */
const buildExtensions = (appConfig = {}) => {
  return freezeObj(
    cloneArr(
      // Try to pull the extensions from the config
      get(
        appConfig,
        [ 'keg', 'tapResolver', 'extensions', 'resolve' ],
        // Otherwise set the default extensions
        get(tapConstants, [ 'extensions', 'resolve' ], [])
      )
    )
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
const buildBaseContent = (appConfig = {}) => {
  return freezeObj(
    addNameSpace(appConfig, {
      ...get(appConfig, [ 'keg', 'tapResolver', 'aliases', 'base' ], {}),
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
const buildDynamicContent = (appConfig = {}) => {
  // Build the dynamic alias paths
  return freezeObj(
    addNameSpace(appConfig, {
      ...get(appConfig, [ 'keg', 'tapResolver', 'aliases', 'dynamic' ], {}),
    })
  )
}

/**
 * Builds the default Alias to load app content
 * Can not be over-written
 * Paths that pull base folder only
 * @param {string} kegPath - path to the root of the project
 * @param {Object} [appConfig={}] - app.json config file
 * @param {Object} [paths={}] - object holds the paths to be set
 *
 * @returns {Object} - all paths that should be an alias
 */
const buildAliases = (kegPath, appConfig = {}, paths = {}) => {
  return freezeObj(
    addNameSpace(appConfig, {
      AppRoot: kegPath,
      Assets: paths.assets,
      Fonts: paths.fonts,
      Base: paths.base,
      Tap: paths.tap,
      TapSrc: paths.tapSrc,
      Config: paths.config,
      ...reduceObj(
        get(appConfig, [ 'keg', 'tapResolver', 'aliases', 'root' ], {}),
        (key, value, addAliases) => {
          addAliases[key] = path.join(kegPath, value)
          return addAliases
        },
        {}
      ),
    })
  )
}

/**
 * Builds the constants which contains paths to the taps folder
 * @param {Object} options - Settings to built the babel config
 * @param {Object} options.config - Joined Tap and Keg configs
 * @param {string} options.tapPath - Path to the tap
 * @param {string} options.kegPath - Path to the keg
 *
 * @return {Object} - Alias map to load files
 */
module.exports = options => {
  const { config, kegPath } = options

  // Ensure the required app data exists
  validateApp(kegPath, config)

  // Setup the tap, to get the correct path data
  const {
    APP_CONFIG,
    APP_CONFIG_PATH,
    BASE_PATH,
    TAP_NAME,
    TAP_PATH,
    TAP_SRC,
    HAS_TAP,
  } = setupTap(options)

  // Build the assets for the tap
  const { ASSETS_PATH, FONTS_PATH } = buildAssets(
    APP_CONFIG,
    BASE_PATH,
    TAP_PATH
  )

  // Build the aliasPaths object from the built tap data
  const aliasPaths = {
    assets: ASSETS_PATH,
    fonts: FONTS_PATH,
    base: BASE_PATH,
    tap: TAP_PATH,
    tapSrc: TAP_SRC,
    config: APP_CONFIG_PATH,
  }

  // Return the constants set from the tap data
  return freezeObj({
    APP_CONFIG,
    APP_CONFIG_PATH,
    BASE_PATH,
    ASSETS_PATH,
    FONTS_PATH,
    TAP_NAME,
    TAP_PATH,
    HAS_TAP,
    ALIASES: buildAliases(kegPath, APP_CONFIG, aliasPaths),
    BASE_CONTENT: buildBaseContent(APP_CONFIG),
    DYNAMIC_CONTENT: buildDynamicContent(APP_CONFIG),
    EXTENSIONS: buildExtensions(APP_CONFIG),
  })
}
