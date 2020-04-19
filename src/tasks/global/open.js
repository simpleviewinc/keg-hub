const { executeCmd } = require('KegProc')
const { getPathFromConfig } = require('KegUtils')
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
const open = async args => {

  // TODO: Get the command to open users editor from global config
  // get(globalConfig, 'path.to.editor.command')
  const { globalConfig, options } = args
  const toOpen = options[0]
  let logText = `Opening keg folder!`
  let openPath = getPathFromConfig(globalConfig, 'keg')

  switch(toOpen){
    case 'config':
    case 'con':
    case 'c': {
      logText = `Opening global config folder!`
      openPath = GLOBAL_CONFIG_FOLDER
      break
    }
    case 'core':
    case 'co': {
      logText = `Opening core folder!`
      openPath = getPathFromConfig(globalConfig, 'core')
    }
    case 'components':
    case 'comp':
    case 'cm': {
      logText = `Opening components folder!`
      openPath = getPathFromConfig(globalConfig, 'components')
    }
    // Add other open cases here
  }

  if(!openPath) return Logger.info(`Could not find path for ${ toOpen }`)

  Logger.info(logText)
  await executeCmd(`code ${ openPath }`)

}


module.exports = {
  open: {
    name: 'open',
    alias: [ 'op' ],
    action: open,
    description: `Opens the keg || globalConfig in configured IDE`,
    example: 'keg open <options>',
  }
}