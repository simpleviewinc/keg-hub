const fs = require('fs')
const path = require('path')
const APP_ROOT = require('app-root-path')
const { logData, setLogs, get } = require('jsutils')
const buildAliases = require('./buildAliases')
const buildConstants = require('./buildConstants')
const getAppConfig = require('./getAppConfig')
const contentResolver = require('./contentResolver')

setLogs(process.env.LOG, `log`, `[ Tap Resolver ]`)

/**
 * Setups up the project to load the tap
 * @param {string} appRoot - Path to the root of the project
 * @param {Object} appConfig - app.json config file
 * @param {function} contentResolver - Function to help resolve file paths
 *
 * @return {Object} - Alias map to load files
 */
module.exports = (appRoot, appConfig, contentResolver, tapName) => {
  appRoot = appRoot || APP_ROOT
  appConfig = appConfig || getAppConfig(appRoot)
  
  const {
    ALIASES,
    APP_CONFIG,
    APP_CONFIG_PATH,
    BASE_CONTENT,
    BASE_PATH,
    DYNAMIC_CONTENT,
    EXTENSIONS,
    HAS_TAP
  } = buildConstants(appRoot, appConfig, tapName)

  const aliasesBuilder = buildAliases(
    APP_CONFIG,
    contentResolver,
    { ...ALIASES },
    {
      base: BASE_CONTENT,
      basePath: BASE_PATH,
      dynamic: DYNAMIC_CONTENT,
      tap: HAS_TAP,
      extensions: EXTENSIONS
    }
  )

  return {
    EXTENSIONS,
    buildAliases: aliasesBuilder,
  }
}