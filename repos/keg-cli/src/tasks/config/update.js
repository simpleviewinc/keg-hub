const { Logger } = require('KegLog')
const { GLOBAL_CONFIG_EDITOR_CMD } = require('KegConst/constants')
const { confirmExec, addGlobalConfigProp } = require('KegUtils')

/**
 * Updates the globalConfig to the latest version
 * @function
 * @param {Object} args - arguments passed from the runTask method
 * @param {Object} args.globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const updateConfig = async args => {
  const { globalConfig, options, params } = args
  const { command } = params


}

module.exports = {
  update: {
    name: 'update',
    alias: [ 'upd' ],
    action: updateConfig,
    description: `Updates the globalConfig and defaults.env to the latest version`,
    example: 'keg config update',
  }
}