const { get } = require('@svkeg/jsutils')
const { __getGlobalConfig } = require('./globalConfigCache')
/**
 * Gets a setting from the global config
 * @param {Object} setting - Name of the setting to get
 *
 * @returns {string|number|Object|Array} - Found setting
 */
const getSetting = setting => get(__getGlobalConfig(), `cli.settings.${ setting }`)


module.exports = {
  getSetting
}