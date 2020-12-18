const webpack = require('webpack')
const { get, isStr } = require('@keg-hub/jsutils')
const getAppConfig = require('@keg-hub/tap-resolver/src/resolvers/getAppConfig')

/**
 * @param {*} tapPath 
 * @param {*} kegPath 
 * @return {object}
 */
const getPackageMetaEntries = (tapPath, kegPath) => {
  const tapPackage = require(tapPath + '/package.json')
  const kegPackage = require(kegPath + '/package.json')

  return {
    'process.env.TAP_VERSION': JSON.stringify(get(tapPackage, 'version')),
    'process.env.TAP_HOMEPAGE': JSON.stringify(get(tapPackage, 'homepage')),
    'process.env.KEG_VERSION': JSON.stringify(get(kegPackage, 'version')),
    'process.env.KEG_HOMEPAGE': JSON.stringify(get(kegPackage,'homepage')),
  }
}

/**
 * @param {string} tapPath 
 * @param {string} kegPath 
 * @return {Object} - merged object containing the replacement
 * definitions from the core and tap, merged together 
 * (definitions are tap-preferred)
 */
const getAppConfigEntries = (tapPath, kegPath) => {
  const tapConfig = tapPath && getAppConfig(tapPath, false, false)
  const coreConfig = kegPath && getAppConfig(kegPath, false, false)
  return {
    ...get(coreConfig, 'keg.replace', {}),
    ...get(tapConfig, 'keg.replace', {}),
  }
}

const environmentPlugin = ({ tapPath, kegPath }) => {
  if (!isStr(tapPath) || !isStr(kegPath)) {
    console.error('Cannot set environment variables. Paths must be defined:', { tapPath, kegPath })
    return null
  }

  return new webpack.DefinePlugin({
    ...getPackageMetaEntries(tapPath, kegPath),
    ...getAppConfigEntries(tapPath, kegPath)
  })
}

module.exports = { environmentPlugin }