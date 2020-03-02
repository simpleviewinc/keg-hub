const path = require('path')
const fs = require('fs')
const { get } = require('jsutils')
const tapPath = require('app-root-path').path
const tapPackage = require(path.resolve(tapPath, 'package.json'))
const kegPath = path.join(__dirname, "../../")
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
const extraNodeModules = (package, repoPath) => {
  const dependencies = {
    ...get(package, 'dependencies', {}),
    ...get(package, 'devDependencies', {}),
  }

  return Object.keys(dependencies)
    .reduce((nodeModules, name) => {
      blackList.indexOf(name) === -1 &&
      (nodeModules[name] = path.resolve(repoPath, 'node_modules', name))

      return nodeModules
    }, {}) || {}
}

/**
 * builds the extra node modules for the metro config
 * @return {Object} - config obj for extraNodeModules
 */
const getNodeModules = () => {

  return tapPath !== kegPath 
    ? {
        ...extraNodeModules(kegPackage, kegPath),
        ...extraNodeModules(tapPackage, tapPath)
      }
    : extraNodeModules(tapPackage, tapPath)
    
}

/**
 * Builds metro config, adds taps node_modules, and taps folder
 * Checks if the node_module exists before adding
 * @param  {string} rootPath - path to root of zr-mobile-keg
 * @return {Object} - metro config object
 */
const buildMetroConfig = rootPath => {
  return metroConf = {
    resolver: {
      extraNodeModules: getNodeModules(),
    },
    projectRoot: kegPath,
    resetCache: true,
    watchFolders: [
      tapPath,
      kegPath,
    ],
  }
}

module.exports = buildMetroConfig
