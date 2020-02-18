const path = require('path')
const fs = require('fs')
const rimraf = require('rimraf')
const { deepMerge, logData, get } = require('jsutils')
const getAppConfig = require('../resolvers/getAppConfig')
const { validateApp, ensureDirSync, isDirectory, checkTapKegPath } = require('../helpers')
const tapConstants = require('./tapConstants')
const { configKeys }  = tapConstants

// Default location to store files
const TEMP_DEF_FOLDER = './temp'

/**
 * Gets the path to the app.json tap folder
 * @param {Object} options - Settings to built the babel config
 * @param {Object} options.config - Joined Tap and Keg configs
 * @param {string} options.tapPath - Path to the tap
 * @param {string} options.kegPath - Path to the keg
 *
 * @returns {string} - path to the base tap
 */
const getBaseTapPath = ({ config, tapPath, kegPath }) => {

  // Get the base tap path
  const baseLoc = get(config, [ 'keg', 'tapResolver', 'paths', 'kegSrc' ])

  // Find the full path
  const basePath = checkTapKegPath(tapPath, kegPath, baseLoc)

  // Ensure it's a directory, and return
  return isDirectory(basePath, true) && basePath

}

/**
 * Get the name of the active tap from the passed in param, ENV, app.json config
 * @param {Object} config - mobile keg app.json config
 *
 * @returns {string} - name of the active tap
 */
const getActiveTapName = config => {
  const tapName = process.env.TAP || config.name
  if(tapName !== config.name ) config.name = tapName

  return config.name
}

/**
 * Get the tap source directory if it exists, otherwise use the tapPath
 * @param {Object} options - Settings to built the babel config
 * @param {Object} options.config - Joined Tap and Keg configs
 * @param {string} options.tapPath - Path to the tap
 * @param {string} options.kegPath - Path to the keg
 * @param {boolean} HAS_TAP - if a tap exists for not
 *
 * @returns {string} - tap source directory
 */
const getTapSrc = (options, HAS_TAP) => {
  const tapSrc = HAS_TAP && get(options, [ 'config', 'keg', 'tapResolver', 'paths', 'tapSrc' ], '')
  return tapSrc && path.join(options.tapPath, tapSrc) || options.tapPath
}

/**
 * Try's to remove the fold temp folder if it exists
 * @param {string} TEMP_FOLDER_PATH - Path to the config temp folder
 *
 * @returns {void}
 */
const cleanupOldTempConfig = TEMP_FOLDER_PATH => {
  // Try to remove the current temp file if it exits
  try {
    rimraf.sync(TEMP_FOLDER_PATH)
  }
  catch (e) {
    // If there is a different error then the folder doesn't exist, throw it
    if (e.code !== 'ENOENT') throw e
  }
}


/**
 * Finds the path where temp config files should be stored
 * If the temp path is defined in config
 * It's resolved relative to the specific clients folder
 * @param {Object} options - Settings to built the babel config
 * @param {Object} options.config - Joined Tap and Keg configs
 * @param {string} options.tapPath - Path to the tap
 * @param {string} options.kegPath - Path to the keg
 * @param {string} TAP_PATH - path to the clients folder
 *
 * @returns {string} - path to the temp folder
 */
const getTempFolderPath = (options, TAP_PATH) => {
  // Check the app config for a temp folder path
  // Or use the default
  const tempLocation = get(
    options,
    [ 'config', 'keg', 'tapResolver', 'paths', 'temp' ],
    TEMP_DEF_FOLDER
  )
  // Build the path
  const configTemp = path.join(TAP_PATH, tempLocation)

  // Ensure the directory exists
  ensureDirSync(configTemp)

  return configTemp

}

/**
 * Joins the app config root with the taps config
 * <br> Writes the joined config to disk inside a temp folder
 * @param {Object} config - default app.json config
 * @param {string} TAP_PATH - Path to the taps folder
 * @param {string} TEMP_FOLDER_PATH - Path to the temp folder
 *
 * @returns {Object} - Merged app config, and it's path
 */
const buildJoinedConfigs = (config, TAP_PATH, TEMP_FOLDER_PATH) => {

  // Rebuild the temp folder path
  fs.mkdirSync(TEMP_FOLDER_PATH)

  // Build the temp config path with the temp folder path and the name of the config file
  const TEMP_CONFIG_PATH = path.join(
    TEMP_FOLDER_PATH,
    config[configKeys.TAP_RESOLVER_FILE]
  )

  // Write the temp config file
  fs.writeFileSync(
    TEMP_CONFIG_PATH,
    JSON.stringify(config, null, 2),
    'utf8'
  )

  // Return the joined config, and the path to the temp config file
  return { APP_CONFIG: config, APP_CONFIG_PATH: TEMP_CONFIG_PATH }
}

/**
 * Looks up the taps app.json file and joins it with the default app.json
 * <br> Writes the joined config to disk inside a temp folder
 * @param {Object} options - Settings to built the babel config
 * @param {Object} options.config - Joined Tap and Keg configs
 * @param {string} options.tapPath - Path to the tap
 * @param {string} options.kegPath - Path to the keg
 * @param {string} TAP_PATH - path to the tap folder
 * @param {boolean} HAS_TAP - if an active tap is set
 *
 * @returns {Object} - Merged app config, and it's path
 */
const setupTapConfig = (options, TAP_PATH, HAS_TAP) => {
  const { kegPath, config } = options

  // Data to load tap from
  let tapData = { APP_CONFIG: config, APP_CONFIG_PATH: config[configKeys.TAP_RESOLVER_LOC] }

  // If no tap just return the default tapData
  if (!HAS_TAP) return tapData

  // Get the location where temp tap configs should be stored
  const TEMP_FOLDER_PATH = getTempFolderPath(options, TAP_PATH)

  // Clean up any past client configs
  cleanupOldTempConfig(TEMP_FOLDER_PATH)

  try {
    // Join the root config with the tap config
    tapData = buildJoinedConfigs(config, TAP_PATH, TEMP_FOLDER_PATH)
  }
  catch (e) {
    // If there's an error, just show the message, and will return the default tapData
    logData(e.message, 'warn')
  }

  return tapData
}

/**
 * Sets up a the taps folder based on the app.json config
 * <br> Builds the paths for the current TAP based on ENV or app.json config
 * @param {Object} options - Settings to built the babel config
 * @param {Object} options.config - Joined Tap and Keg configs
 * @param {string} options.tapPath - Path to the tap
 * @param {string} options.kegPath - Path to the keg
 *
 * @returns {Object} - Build constants and paths data for the active tap
 */
module.exports = options => {

  const { config, tapPath, kegPath } = options

  // Ensure the required app data exists
  validateApp(kegPath, config)

  // Set the default tap path
  const BASE_PATH = getBaseTapPath(options)

  // Get the name of the active tap
  const TAP_NAME = getActiveTapName(config)

  // Flag set if the active tap is different from the default keg
  const HAS_TAP = Boolean(TAP_NAME !== get(config, ['keg', 'name']))

  // Set the tap path if an active tap is set
  const TAP_PATH = HAS_TAP ? tapPath : BASE_PATH

  // Set the tap source path
  const TAP_SRC = getTapSrc(options, HAS_TAP)

  // Get the path to the app config ( either the config or joined temp config )
  const { APP_CONFIG, APP_CONFIG_PATH } = setupTapConfig(
    options,
    TAP_PATH,
    HAS_TAP
  )

  !HAS_TAP && logData(
    `No tap folder found at ${TAP_PATH}, using defaults at ${BASE_PATH}`,
    'warn'
  )

  return {
    APP_CONFIG,
    APP_CONFIG_PATH,
    BASE_PATH,
    TAP_NAME,
    TAP_PATH,
    TAP_SRC,
    HAS_TAP
  }
}
