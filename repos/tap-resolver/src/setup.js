const fs = require('fs')
const path = require('path')
const APP_ROOT = require('app-root-path')
const { logData, setLogs, get } = require('jsutils')
const buildAliases = require('./buildAliases')
const buildConstants = require('./buildConstants')
const getAppConfig = require('./getAppConfig')
const getContentPath = require('./getContentPath')

setLogs(process.env.LOG, `log`, `[ Client Resolver ]`)

/**
 * Setups up the project to load the client
 * @param {string} appRoot - path to the root of the project
 * @param {Object} appConfig - app.json config file
 *
 * @return {Object} - Alias map to load files
 */
module.exports = (appRoot, appConfig, clientName) => {
  appRoot = appRoot || APP_ROOT
  appConfig = appConfig || getAppConfig(appRoot)
  
  const {
    ALIASES,
    APP_CONFIG_PATH,
    BASE_CONTENT,
    BASE_PATH,
    DYNAMIC_CONTENT,
    EXTENSIONS,
    HAS_CLIENT
  } = buildConstants(appRoot, appConfig, clientName)

  const aliasesBuilder = buildAliases(
    appConfig,
    { ...ALIASES },
    {
      base: BASE_CONTENT,
      basePath: BASE_PATH,
      dynamic: DYNAMIC_CONTENT,
      client: HAS_CLIENT,
      extensions: EXTENSIONS
    }
  )

  return {
    EXTENSIONS,
    buildAliases: aliasesBuilder,
  }
}