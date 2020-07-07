const { getPathFromConfig } = require('../globalConfig/getPathFromConfig')
const { getTapPath } = require('../globalConfig/getTapPath')
const { getGlobalConfig } = require('../globalConfig/getGlobalConfig')
/**
 * Get the path to a git repo
 * @param {Object} globalConfig - Global config object for the keg-cli
 * @param {Object} name - Name of the repo in the global config to get
 *
 * @returns {string} - path to a git repo || the current dir
 */
const getRepoPath = (name, globalConfig) => {
  globalConfig = globalConfig || getGlobalConfig()
  return name && (getPathFromConfig(globalConfig, name) || getTapPath(globalConfig, name))
}

module.exports = {
  getRepoPath
}