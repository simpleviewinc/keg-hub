const { get } = require('jsutils')
const { getGlobalConfig } = require('./getGlobalConfig')
/**
 * Gets a setting from the global config
 * @param {Object} setting - Name of the setting to get
 *
 * @returns {string|number|Object|Array} - Found setting
 */
const getSetting = setting => get(getGlobalConfig(), 'settings.${ setting }')

module.exports = {
  getSetting
}