const { getGlobalConfig } = require('./getGlobalConfig')
const { throwWrap } = require('../error/throwWrap')

/**
 * Loads then Runs the global config setup script
 * @function
 *
 * @returns {Object} - global config object
 */
const doConfigSetup = () => {
  // Load the configSetup script inline to speed up load times
  const { configSetup } = require('KegScripts/cli/configSetup')
  return configSetup()
}

/**
 * Helpers loads the globalConfig, or kicks off the globalConfig setup
 * @function
 *
 * @returns {Object} - global config object
 */
const loadGlobalConfig = async () => {
  // Try to load the globalConfig
  // If no config could be loaded, then doConfigSetup the configSetup script
  const globalConfig = getGlobalConfig() || await doConfigSetup()

  return globalConfig || throwWrap(`Keg CLI global config could not be loaded!`)
}

module.exports = {
  loadGlobalConfig
}