const { executeCmd } = require('KegProc')
const { getPathFromConfig } = require('KegUtils')
const { Logger } = require('KegLog')
/**
 * Opens the CLI global config in VS Code
 * @function
 * @param {Object} args - arguments passed from the runTask method
 * @param {Object} args.globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const openKeg = async args => {

  // TODO: Get the command to open users editor from global config
  // get(globalConfig, 'path.to.editor.command')
  const { globalConfig } = args
  const kegPath = getPathFromConfig(globalConfig, 'keg')

  Logger.info(`Opening keg folder!`)
  await executeCmd(`code ${ kegPath }`)

}


module.exports = {
  open: {
    name: 'open',
    action: openKeg,
    description: `Opens the keg in configured IDE`,
    example: 'keg open',
  }
}