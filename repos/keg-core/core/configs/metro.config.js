const path = require('path')
const fs = require('fs')
const { get } = require('jsutils')
const tapPath = require('app-root-path').path
const tapPackage = require(path.resolve(tapPath, 'package.json'))
const kegPath = path.resolve(__dirname, "../../")
const kegPackage = require(path.resolve(kegPath, 'package.json'))

/**
 * Modules names to not be included in the extraNodeModules config
 */
const blackList = [
  '@expo/webpack-config',
  'react-dom',
  'react-native-web',
  'react-router-dom',
  'sv-keg'
]

/**
 * Pulls in the package.json dependencies and adds them to the extraNodeModules key
 * Any modules defined in the blackList array will not be included ( i.e. web packages )
 *
 * @returns {Object} - Build node modules paths
 */
const extraNodeModules = (package) => {
  return package.dependencies && Object.keys(package.dependencies)
    .reduce((nodeModules, name) => {
      blackList.indexOf(name) === -1 &&
      (nodeModules[name] = path.resolve(kegPath, 'node_modules', name))

      return nodeModules
    }, {}) || {}
}

/**
 * Builds metro config, adds taps node_modules, and taps folder
 * Checks if the node_module exists before adding
 * @param  {string} rootPath - path to root of zr-mobile-keg
 * @return {Object} - metro config object
 */
const buildMetroConfig = rootPath => {
  return {
    resolver: {
      extraNodeModules: {
        ...extraNodeModules(tapPackage),
        ...extraNodeModules(kegPackage),
      },
    },
    projectRoot: kegPath,
    resetCache: true,
    watchFolders: [
      tapPath,
      path.resolve(kegPath),
    ],
  }
}

module.exports = buildMetroConfig
