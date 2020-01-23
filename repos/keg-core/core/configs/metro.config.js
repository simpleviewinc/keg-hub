const path = require('path')
const fs = require('fs')
const { get } = require('jsutils')
const tapPath = require('app-root-path').path
const kegPath = path.resolve(__dirname, "../../")

/**
 * Builds metro config, adds taps node_modules, and taps folder
 * Checks if the node_module exists before adding
 * @param  { string } rootPath - path to root of zr-mobile-keg
 * @return { object } - metro config object
 */
const buildMetroConfig = rootPath => {
  return {
    resolver: {
      extraNodeModules: {
        expo: path.resolve(kegPath, "node_modules/expo"),
        react: path.resolve(kegPath, "node_modules/react"),
        "react-native": path.resolve(kegPath, "node_modules/react-native"),
        "@babel/core": path.resolve(kegPath, "node_modules/@babel/core"),
        "@babel/runtime": path.resolve(kegPath, "node_modules/@babel/runtime"),
        "babel-preset-expo": path.resolve(kegPath, "node_modules/babel-preset-expo"),
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
