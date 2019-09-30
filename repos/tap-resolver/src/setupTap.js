const path = require('path')
const fs = require('fs')
const rimraf = require('rimraf')
const { deepMerge, logData, setLogs, isStr, isObj, get } = require('jsutils')
const getAppConfig = require('./getAppConfig')
const { validateApp, ensureDirSync, isDirectory } = require('./helpers')
const tapConstants = require('./tapConstants')
const { configNames, configKeys }  = tapConstants

// Default location to store files
const TEMP_DEF_FOLDER = path.join(__dirname, '..', './temp')
ensureDirSync(TEMP_DEF_FOLDER)

/**
 * Gets the path to the app.json tap folder
 * @param {string} appRoot - Root directory of the mobile keg
 * @param {Object} appConfig - mobile keg app.json config
 *
 * @returns {string} - path to the base tap
 */
const getBaseTapPath = (appRoot, appConfig) => {

  // Get the base tap path
  const { baseTap } = get(appConfig, [ 'tapResolver', 'paths' ], {})
  
  // Helper method to check for a directory
  const checkBaseTap = check => isDirectory(check, true) && check
  
  // Check for the base tap from the app config
  return checkBaseTap(path.join(appRoot, baseTap)) ||
    // Check for a taps folder with the app config name
    checkBaseTap(path.join(appRoot, '/taps', appConfig.name)) ||
    // Check for a folder with the app config name
    checkBaseTap(path.join(appRoot, appConfig.name)) ||
    // If none of the above, just return the root
    appRoot

}

/**
 * Get the name of the active tap from the passed in param, ENV, app.json config
 * @param {string} tapName - name of the active tap
 * @param {Object} appConfig - mobile keg app.json config
 *
 * @returns {string} - name of the active tap
 */
const getActiveTapName = (appConfig, tapName) => {
  const { TAP } = process.env
  return tapName || TAP || appConfig.name
}

/**
 * Gets the location of the active taps directory
 * <br> First checks root_dir/node_modules/zr-rn-taps/TAP_NAME
 * <br> Next checks root_dir/taps/TAP_NAME
 * @param {string} appRoot - Root directory of the mobile keg
 * @param {Object} appConfig - Root app.json config
 * @param {string} TAP_NAME - Name of the active tap
 *
 * @returns {string} - Path to the active tap folder, or null if no path exists on disk. 
 */
const getTapPath = (appRoot, appConfig, tapName) => {
  const { externalTaps, localTaps } = get(appConfig, [ 'tapResolver', 'paths' ], {})

  // Get External taps root path
  const externalTap = path.join(appRoot, externalTaps, tapName)

  // Get Local tap path
  const localTap = path.join(appRoot, localTaps, tapName)

  // returns local tap if it exists
  return fs.existsSync(localTap)
    ? localTap
    // Else check for external tap
    : fs.existsSync(externalTap)
      ? externalTap
      : null
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
 * If the temp path is defined in appConfig
 * It's resolved relative to the specific clients folder
 * @param {Object} appConfig - default app.json config
 * @param {*} TAP_PATH - path to the clients folder
 *
 * @returns {string} - path to the temp folder
 */
const getTempFolderPath = (appConfig, TAP_PATH) => {
  // Check the app config for a temp folder path
  const configTemp = get(appConfig, [ 'tapResolver', 'paths', 'temp' ])
  
  // If the path exists join it with the client path and return it
  // Otherwise return the default
  return configTemp
    ? path.join(TAP_PATH, configTemp)
    : TEMP_DEF_FOLDER
}

/**
 * Joins the app config root with the taps config
 * <br> Writes the joined config to disk inside a temp folder
 * @param {Object} appConfig - default app.json config
 * @param {string} TAP_PATH - Path to the taps folder
 * @param {string} TEMP_FOLDER_PATH - Path to the temp folder
 *
 * @returns {Object} - Merged app config, and it's path
 */
const buildJoinedConfigs = (appConfig, TAP_PATH, TEMP_FOLDER_PATH) => {
  
  // Get the clientConfig, but we don't care if it's not valid
  const clientConfig = getAppConfig(TAP_PATH, false, false) || {}

  // Join the root config with the tap config
  const joinedConfig = deepMerge(appConfig, clientConfig)

  // Rebuild the temp folder path
  fs.mkdirSync(TEMP_FOLDER_PATH)

  // Build the temp config path with the temp folder path and the name of the config file
  const TEMP_CONFIG_PATH = path.join(
    TEMP_FOLDER_PATH,
    joinedConfig[configKeys.TAP_RESOLVER_FILE]
  )

  // Write the temp config file
  fs.writeFileSync(
    TEMP_CONFIG_PATH,
    JSON.stringify(joinedConfig, null, 2),
    'utf8'
  )

  // Return the joined config, and the path to the temp config file
  return { APP_CONFIG: joinedConfig, APP_CONFIG_PATH: TEMP_CONFIG_PATH }
}

/**
 * Looks up the taps app.json file and joins it with the default app.json
 * <br> Writes the joined config to disk inside a temp folder
 * @param {string} appRoot - Root directory of the mobile keg
 * @param {Object} appConfig - default app.json config
 * @param {string} TAP_PATH - path to the tap folder
 * @param {boolean} HAS_TAP - if an active tap is set
 *
 * @returns {Object} - Merged app config, and it's path
 */
const setupTapConfig = (appRoot, appConfig, TAP_PATH, HAS_TAP) => {

  // Data to load tap from
  let tapData = { APP_CONFIG: appConfig, APP_CONFIG_PATH: configKeys.TAP_RESOLVER_LOC }

  // If no tap just return the default tapData
  if(!HAS_TAP) return tapData

  // Get the location where temp tap configs should be stored
  const TEMP_FOLDER_PATH = getTempFolderPath(appConfig, TAP_PATH)

  // Clean up any past client configs
  cleanupOldTempConfig(TEMP_FOLDER_PATH)

  try {
    // Join the root config with the tap config
    tapData = buildJoinedConfigs(appConfig, TAP_PATH, TEMP_FOLDER_PATH)
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
 * @param {string} appRoot - Root directory of the mobile keg
 * @param {string} tapName - name of the active tap
 *
 * @returns {Object} - Build constants and paths data for the active tap
 */
module.exports = (appRoot, appConfig, tapName) => {

  // Ensure the required app data exists
  validateApp(appRoot, appConfig)

  // Set the default tap path
  const BASE_PATH = getBaseTapPath(appRoot, appConfig)

  // Get the name of the active tap
  const TAP_NAME = getActiveTapName(appConfig, tapName)

  // Flag set if the active tap is different from the default root tap
  const HAS_TAP = Boolean(TAP_NAME !== appConfig.name)

  // Set the tap path if an active tap is set
  const TAP_PATH = HAS_TAP
    ? getTapPath(appRoot, appConfig, TAP_NAME)
    : BASE_PATH

  // Get the path to the app config ( either the appConfig or joined temp config )
  const { APP_CONFIG, APP_CONFIG_PATH } = setupTapConfig(
    appRoot,
    appConfig,
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
    HAS_TAP
  }
}
