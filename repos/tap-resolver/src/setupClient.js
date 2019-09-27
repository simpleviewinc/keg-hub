const path = require('path')
const fs = require('fs')
const rimraf = require('rimraf')
const { deepMerge, logData, setLogs, isStr, isObj, get } = require('jsutils')
const { validateApp } = require('./helpers')

const APP_CONFIG_NAME = 'app.json'
/**
 * Gets the path to the app.json client folder
 * @param {string} appRoot - Root directory of the mobile keg
 * @param {Object} appConfig - mobile keg app.json config
 *
 * @returns {string} - path to the base client
 */
const getBaseClientPath = (appRoot, appConfig) => {
  const { baseClient } = get(appConfig, [ 'clientResolver', 'paths' ], {})
  return baseClient
    ? path.join(appRoot, baseClient)
    : path.join(appRoot, `/clients/`, appConfig.name)
}

/**
 * Get the name of the active client from the passed in param, ENV, app.json config
 * @param {string} clientName - name of the active client
 * @param {Object} appConfig - mobile keg app.json config
 *
 * @returns {string} - name of the active client
 */
const getActiveClientName = (appConfig, clientName) => {
  const { CLIENT } = process.env
  return clientName || CLIENT || appConfig.name
}

/**
 * Gets the location of the active clients directory
 * <br> First checks root_dir/node_modules/zr-rn-clients/CLIENT_NAME
 * <br> Next checks root_dir/clients/CLIENT_NAME
 * @param {string} appRoot - Root directory of the mobile keg
 * @param {Object} appConfig - Root app.json config
 * @param {string} CLIENT_NAME - Name of the active client
 *
 * @returns {string} - Path to the active client folder, or null if no path exists on disk. 
 */
const getClientPath = (appRoot, appConfig, clientName) => {
  const { externalClients, localClients } = get(appConfig, [ 'clientResolver', 'paths' ], {})

  // Get External clients root path
  const externalClient = path.join(appRoot, externalClients, clientName)

  // Get Local client path
  const localClient = path.join(appRoot, localClients, clientName)

  // returns local client if it exists
  return fs.existsSync(localClient)
    ? localClient
    // Else check for external client
    : fs.existsSync(externalClient)
      ? externalClient
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
 * Joins the app config root with the clients config
 * <br> Writes the joined config to disk inside a temp folder
 * @param {Object} appConfig - default app.json config
 * @param {string} CLIENT_PATH - Path to the clients folder
 * @param {string} TEMP_FOLDER_PATH - Path to the temp folder
 *
 * @returns {Object} - Merged app config, and it's path
 */
const buildJoinedConfigs = (appConfig, CLIENT_PATH, TEMP_FOLDER_PATH) => {
  // Join the root config with the client config
  const joinedConfig = deepMerge(
    appConfig,
    require(path.join(CLIENT_PATH, APP_CONFIG_NAME))
  )

  // Rebuild the temp folder path
  fs.mkdirSync(TEMP_FOLDER_PATH)

  // Build the temp config path
  const TEMP_CONFIG_PATH = path.join(TEMP_FOLDER_PATH, APP_CONFIG_NAME)

  // Write the temp config file
  fs.writeFileSync(
    path.join(TEMP_FOLDER_PATH, APP_CONFIG_NAME),
    JSON.stringify(joinedConfig),
    'utf8'
  )

  return { APP_CONFIG: joinedConfig, APP_CONFIG_PATH: TEMP_CONFIG_PATH }
}

/**
 * Looks up the clients app.json file and joins it with the default app.json
 * <br> Writes the joined config to disk inside a temp folder
 * @param {string} appRoot - Root directory of the mobile keg
 * @param {Object} appConfig - default app.json config
 * @param {string} CLIENT_PATH - path to the client folder
 * @param {boolean} HAS_CLIENT - if an active client is set
 *
 * @returns {Object} - Merged app config, and it's path
 */
const setupClientConfig = (appRoot, appConfig, CLIENT_PATH, HAS_CLIENT) => {
  const APP_CONFIG_PATH = path.join(appRoot, APP_CONFIG_NAME)

  // Data to load client from
  let clientData = { APP_CONFIG: appConfig, APP_CONFIG_PATH: APP_CONFIG_PATH }

  // If no client just return the default clientData
  if(!HAS_CLIENT) return clientData

  // build the temp folder path
  const TEMP_FOLDER_PATH = path.join(CLIENT_PATH, 'temp')
  cleanupOldTempConfig(TEMP_FOLDER_PATH)

  try {
    // Join the root config with the client config
    clientData = buildJoinedConfigs(appConfig, CLIENT_PATH, TEMP_FOLDER_PATH)
  }
  catch (e) {
    // If there's an error, just show the message, and will return the default clientData
    logData(e.message, 'warn')
  }

  return clientData
}

/**
 * Sets up a the clients folder based on the app.json config
 * <br> Builds the paths for the current CLIENT based on ENV or app.json config
 * @param {string} appRoot - Root directory of the mobile keg
 * @param {string} clientName - name of the active client
 *
 * @returns {Object} - Build constants and paths data for the active client
 */
module.exports = (appRoot, appConfig, clientName) => {

  // Ensure the required app data exists
  validateApp(appRoot, appConfig)

  // Set the default client path
  const BASE_PATH = getBaseClientPath(appRoot, appConfig)

  // Get the name of the active client
  const CLIENT_NAME = getActiveClientName(appConfig, clientName)

  // Flag set if the active client is different from the default root client
  const HAS_CLIENT = Boolean(CLIENT_NAME !== appConfig.name)

  // Set the client path if an active client is set
  const CLIENT_PATH = HAS_CLIENT
    ? getClientPath(appRoot, appConfig, CLIENT_NAME)
    : BASE_PATH

  // Get the path to the app config ( either the appConfig or joined temp config )
  const { APP_CONFIG, APP_CONFIG_PATH } = setupClientConfig(
    appRoot,
    appConfig,
    CLIENT_PATH,
    HAS_CLIENT
  )

  !HAS_CLIENT && logData(
    `No client folder found at ${CLIENT_PATH}, using defaults at ${BASE_PATH}`,
    'warn'
  )

  return {
    APP_CONFIG,
    APP_CONFIG_PATH,
    BASE_PATH,
    CLIENT_NAME,
    CLIENT_PATH,
    HAS_CLIENT
  }
}
