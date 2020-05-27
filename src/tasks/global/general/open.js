const { executeCmd } = require('KegProc')
const { Logger } = require('KegLog')
const { getPathFromConfig, getEditorCmd, generalError, getTapPath } = require('KegUtils')
const { GLOBAL_CONFIG_FOLDER, GLOBAL_CONFIG_EDITOR_CMD } = require('KegConst/constants')

/**
 * Opens the CLI global config in VS Code
 * @function
 * @param {Object} args - arguments passed from the runTask method
 * @param {Object} args.globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const open = async args => {

  const { globalConfig, options, params } = args
  const { name } = params
  const toOpen = name || options[0]

  const editorCmd = getEditorCmd(globalConfig)

  if(!editorCmd)
    return generalError(
      `Keg Global Config setting "${GLOBAL_CONFIG_EDITOR_CMD}" is not set!`
    )

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
      break
    }
    case 'components':
    case 'comp':
    case 'cm': {
      logText = `Opening components folder!`
      openPath = getPathFromConfig(globalConfig, 'components')
    }
    default: {
      logText = `Opening ${ toOpen } folder!`
      openPath = getPathFromConfig(globalConfig, toOpen) || getTapPath(globalConfig, toOpen)
      break
    }
    // Add other open cases here
  }

  if(!openPath) return Logger.info(`Could not find path for ${ toOpen }`)

  Logger.info(logText)

  await executeCmd(`${ editorCmd } ${ openPath }`)

}


module.exports = {
  open: {
    name: 'open',
    alias: [ 'op' ],
    action: open,
    description: `Opens the keg || globalConfig in configured IDE`,
    example: 'keg open <options>',
    options: {
      name: {
        description: 'Key name of the path or tap in globalConfig',
        example: 'keg open core',
        enforced: true
      }
    }
  }
}