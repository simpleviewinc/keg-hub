const { get } = require('@keg-hub/jsutils')
const getAppConfig = require('@keg-hub/tap-resolver/src/resolvers/getAppConfig')
const path = require('path')
const fs = require('fs')

/**
 * @param {string} tapPath - path to the current tap's root
 * @param {string} kegPath - path to keg-core's root
 * @return {Object} - default replacement definitions from the keg and tap package json
 */
const getPackageMetaEntries = (tapPath, kegPath) => {
  const tapPackage = tapPath 
    ? require(path.join(tapPath,'package.json'))
    : {}

  const kegPackage = kegPath 
    ? require(path.join(kegPath, 'package.json') )
    : {}

  return {
    'process.env.TAP_VERSION': JSON.stringify(get(tapPackage, 'version')),
    'process.env.TAP_HOMEPAGE': JSON.stringify(get(tapPackage, 'homepage')),
    'process.env.KEG_VERSION': JSON.stringify(get(kegPackage, 'version')),
    'process.env.KEG_HOMEPAGE': JSON.stringify(get(kegPackage,'homepage')),
  }
}

/**
 * @param {string} tapPath - path to the current tap's root
 * @param {string} kegPath - path to keg-core's root
 * @return {Object} - merged object containing the replacement
 * definitions from the core and tap app configs, merged together 
 * (definitions are tap-preferred)
 */
const getAppConfigEntries = (tapPath, kegPath) => {
  const tapConfig = tapPath 
    ? getAppConfig(tapPath, false, false)
    : {}

  const coreConfig = kegPath
    ? getAppConfig(kegPath, false, false)
    : {}

  return {
    ...get(coreConfig, 'keg.replace', {}),
    ...get(tapConfig, 'keg.replace', {}),
  }
}

/**
 * @param {string} tapPath - path to the current tap's root
 * @param {string} kegPath - path to keg-core's root
 * @return {Object} - all replacement definitions from the tap and core,
 * merged into one object, to be used in a plugin
 */
const getReplacements = (tapPath, kegPath) => {
  if (!fs.existsSync(tapPath) && !fs.existsSync(kegPath)) {
    console.error(
      'Cannot set replacements. Expected at least one path to exist on system: ', 
      { tapPath, kegPath }
    )
    return {}
  }

  return {
    ...getPackageMetaEntries(tapPath, kegPath),
    ...getAppConfigEntries(tapPath, kegPath)
  }

}

module.exports = {
  getReplacements
}
