const { spawnCmd, executeCmd } = require('KegProc')
const { GLOBAL_CONFIG_FOLDER } = require('KegConst')
const { Logger } = require('KegLog')
/**
 * Opens the CLI global config in VS Code
 * @function
 * @param {Object} args - arguments passed from the runTask method
 * @param {Object} args.globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const openConfig = async args => {

  // TODO: Get the command to open users editor from global config
  // const { globalConfig } = args
  // get(globalConfig, 'path.to.editor.command')

  Logger.info(`Opening global config folder!`)
  await executeCmd(`code ${ GLOBAL_CONFIG_FOLDER }`)

}

module.exports = {
  name: 'open',
  action: openConfig,
  description: `Print the global config to the terminal`,
  example: 'keg global open'
}