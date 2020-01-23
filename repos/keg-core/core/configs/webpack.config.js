/* eslint-disable */

const path = require('path')
const tapPath = require('app-root-path').path
const kegPath = path.join(__dirname, '../../')
const babelConfig = require(path.join(kegPath, './babel.config'))()
const mergeWebpack = require('webpack-merge')
const expoConfig = require('@expo/webpack-config')
const { NODE_ENV } = process.env

const buildConfig = (ootDir, env, argv) => {
  const config = { module: {} }
  // Add custom webpack config settings here
  // ...

  return config
}

module.exports = rootDir => {
  return async (env, argv) => {
    const expoWebpack = await expoConfig(env, argv)

    return mergeWebpack(expoWebpack || {}, buildConfig(rootDir, env, argv))
  }
}

