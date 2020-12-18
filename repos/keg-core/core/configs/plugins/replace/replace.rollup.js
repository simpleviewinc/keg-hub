const replace = require('@rollup/plugin-replace').default
const { getReplacements } = require('./replace.helper')

/**
 * 
 * @param {Object} params
 * @param {string} params.tapPath - path to the current tap's root
 * @param {string} params.kegPath - path to keg-core's root
 * @return {Object} result of calling @rollup/plugin-replace with the keg replacement definitions
 * defined in the app configs and package jsons
 */
const replacePlugin = ({ tapPath, kegPath }) => replace(getReplacements(tapPath, kegPath))

module.exports = { replacePlugin }