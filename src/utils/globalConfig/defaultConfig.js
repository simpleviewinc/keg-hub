const path = require('path')
const packageJson = require('../../../package.json')
const appJson = require('../../../app.json')
const { deepMerge } = require('jsutils') 

const cliRoot = path.join(__dirname, '../../../')
const cliParent = path.join(__dirname, '../../../../')

/**
 * Builds the default global config from the package.json and the app.json
 * Merges the two together, and returns it
 *
 * @returns {Object} - Default global config
 */
const defaultConfig = () => {
  const config = {}
  config.version = packageJson.version
  config.name = packageJson.name
  config.cli = { root: cliRoot, parent: cliParent }

  return deepMerge(config, appJson)
}


module.exports = {
  defaultConfig,
}