const webpack = require('webpack')
const { getReplacements } = require('./replace.helper')

/**
 * 
 * @param {Object} params
 * @param {string} params.tapPath - path to the current tap's root
 * @param {string} params.kegPath - path to keg-core's root
 * 
 */
const replacePlugin = ({ tapPath, kegPath }) =>
  new webpack.DefinePlugin(
    getReplacements(tapPath, kegPath)
  )

module.exports = { replacePlugin }