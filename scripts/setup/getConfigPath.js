require('module-alias/register')

const { get } = require('jsutils')
const { getGlobalConfig } = require('KegUtils')
const { GLOBAL_CONFIG_FOLDER } = require('KegConst')
const { Logger } = require('KegTerm/logger')

/**
 * Gets the name of the path to load from the global config from passed in arguments
 *
 * @returns {string} - Name of key in the global config
 */
const getPathName = () => {
  const [ pathName ] = process.argv.slice(2)
  return pathName
}

/**
 * Gets a path from the global config and prints it, so the bash script can pick it up
 * If no path is found, it does nothing
 *
 * @returns {void}
 */
const getPathFromConfig = () => {

  const pathName = getPathName()

  const foundPath = pathName === 'config'
    // If getting the global config path, just use the constants
    ? GLOBAL_CONFIG_FOLDER
    // Load the global config and get the path from the config
    : get(getGlobalConfig(), `keg.cli.paths.${pathName}`)

  // If no path, then just return
  if(!foundPath) return

  // **IMPORTANT**
  // The order of this logging is important
  // The foundPath variable should always be logged second
  // **IMPORTANT**

  // Log the move to path, and the path
  Logger.info(`Moving to path ${foundPath}`)
  // Always log this second.
  console.log(foundPath)
}

getPathFromConfig()