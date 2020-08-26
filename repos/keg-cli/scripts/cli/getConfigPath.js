require('module-alias/register')

const { get } = require('@svkeg/jsutils')
const { getGlobalConfig } = require('KegUtils/globalConfig/getGlobalConfig')
const { Logger } = require('KegLog')
const { GLOBAL_CONFIG_FOLDER, GLOBAL_CONFIG_PATHS } = require('KegConst/constants')
const { CLI_PATHS, TAP_LINKS } = GLOBAL_CONFIG_PATHS

/**
 * Logs the found path so the bash script can use it to change dirs
 * @param {*} foundPath - Path to navigate to
 *
 */
const logPathResponse = foundPath => {

  // -------- **IMPORTANT** -------- //
  // The order of this logging is important
  // The foundPath variable should always be logged second
  // -------- **IMPORTANT** -------- //

  // Log the move to path, and the path
  Logger.info(`Moving to path ${foundPath}`)

  // -------- **IMPORTANT** -------- //
  // ALWAYS LOG THIS SECOND.
  // -------- **IMPORTANT** -------- //
  console.log(foundPath)

}

/**
 * Gets a path from the global config and prints it, so the bash script can pick it up
 * If no path is found, it does nothing
 *
 * @returns {void}
 */
const getConfigPath = () => {

  const args = process.argv.slice(2)
  const pathName = args[0]
  const globalConfig = getGlobalConfig()

  const foundPath = pathName === 'config'
    // If getting the global config path, just use the constants
    ? GLOBAL_CONFIG_FOLDER
    // Load the global config and get the path from the config cli paths or from linked taps
    : get(globalConfig, `${ CLI_PATHS }.${ pathName }`)

  // If no path, then just return
  if(foundPath) return logPathResponse(foundPath)

  // If more then on argument is passed, then just return
  if(!args.length > 1) return

  // Otherwise check for a path in the tap links
  const tapPath = get(globalConfig, `${ TAP_LINKS }.${ pathName }`)
  // If a tap path is found, then use it
  tapPath && logPathResponse(tapPath)

}

getConfigPath()