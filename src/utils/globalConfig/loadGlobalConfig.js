const { getGlobalConfig } = require('./getGlobalConfig')
const { configSetup } = require('KegScripts/cli/configSetup')
const { throwWrap } = require('../error/throwWrap')

/**
 * Helpers loads the globalConfig, or kicks off the globalConfig setup
 * @function
 *
 * @returns {Object} - global config object
 */
const loadGlobalConfig = async () => {
  // Try to load the globalConfig
  let globalConfig = getGlobalConfig()

  // If no config could be loaded, then call the configSetup script
  globalConfig = globalConfig || await configSetup()

  return globalConfig || throwWrap(`Keg CLI global config could not be loaded!`)
}

module.exports = {
  loadGlobalConfig
}