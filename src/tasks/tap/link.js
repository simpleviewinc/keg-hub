const { Logger } = require('KegLog')
const { get, set, isObj } = require('jsutils')
const { ask } = require('KegQuestions')
const { GLOBAL_CONFIG_PATHS } = require('KegConst')
const { addGlobalConfigProp, getTapPath } = require('KegUtils')

/**
 * Checks if the link already exists, and if it does asks if the user wants to overwrite
 * @param {Object} globalConfig - Global config object for the keg-cli
 * @param {string} tapName - Path to the linked tap
 *
 * @returns {boolean} - If the link should be added
 */
const ensureAddLink = async (globalConfig, tapName) => {
  const exists = getTapPath(globalConfig, tapName)
  return exists
    ? ask.confirm(`Overwrite tap link '${tapName}' => '${exists}'?`)
    : true
}


/**
 * Adds the tap link to the global config object and saves it
 * @param {Object} globalConfig - Global config object for the keg-cli
 * @param {string} linkPath - Path in the global config were the link is saved
 * @param {string} name - Name of the tap to link
 * @param {string} path - Path to the tap repo on the local HDD
 *
 * @returns {void}
 */
const addTapLink = (globalConfig, name, path) => {

  // Ensure the path to save tap links exists
  !isObj(get(globalConfig, GLOBAL_CONFIG_PATHS.TAP_LINKS)) &&
    set(globalConfig, GLOBAL_CONFIG_PATHS.TAP_LINKS, {})

  // Save the link to the global config
  addGlobalConfigProp(
    globalConfig,
      // Build the path in the globalConfig where the link will be saved
    `${GLOBAL_CONFIG_PATHS.TAP_LINKS}.${name}`,
    path
  )

  Logger.success(`Successfully linked tap '${name}' => '${path}'`)
  Logger.empty()

}

/**
 * Creates a link in the global config to a tap's path by name
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const linkTap = async args => {
  const { command, globalConfig, options, params, tasks } = args
  const { name, path } = params

  // Check if the link alread exists, and if we should overwrite it
  const addLink = await ensureAddLink(globalConfig, name)

  // Check if we should add the link, or log that the link was canceled!
  addLink
    ? addTapLink(globalConfig, name, path)
    : Logger.warn(`Tap link canceled!`) || Logger.empty()

}

module.exports = {
  name: 'link',
  alias: [ 'ln' ],
  action: linkTap,
  description: `Links a tap's path to the global config`,
  example: 'keg tap link <options>',
  options: {
    name: {
      description: 'Name used to access the linked tap',
      required: true,
    },
    path: {
      description: `Path to the local tap directory. Example => /Users/developer/taps/my-tap`,
      default: process.cwd(),
    }
  }
}