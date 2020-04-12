const { getPathFromConfig } = require('../globalConfig')

/**
 * Gets the version of keg core
 * @param {Object} globalConfig - Global Keg cli config
 *
 * @returns {string} - Package.json verion of keg-core
 */
const getCoreVersion = globalConfig => {
  const corePath = getPathFromConfig(globalConfig, 'core')
  const { version } = require(`${corePath}/package.json`)

  return version
}

module.exports = {
  getCoreVersion
}