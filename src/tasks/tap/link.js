const { Logger } = require('KegLog')
const inquirer = require('inquirer')
const { get, set, isObj } = require('jsutils')
const { ask } = require('KegQuestions')
const { GLOBAL_CONFIG_PATHS } = require('KegConst')
const { getArguments, addGlobalConfigProp, getTapPath } = require('KegUtils')

/**
 * Gets the arguments from the passed in options array
 * @param {Array} options - Arguments passed from the command line
 *
 * @returns {Object} - Contains the found options from the options array
 */
const getArgs = (args) => {

  const { name, path } = getArguments(args, { path: process.cwd() })

  if(!name)  throw new Error(`Tap name is required to link at tap!`)

  return { tapName: name, tapPath: path }
}

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
 * @param {string} linkPath - Path to the linked tap
 * @param {string} tapPath - Path to the local tap directory
 *
 * @returns {void}
 */
const addTapLink = (globalConfig, linkPath, tapName, tapPath) => {

  // Ensure the path to save tap links exists
  !isObj(get(globalConfig, GLOBAL_CONFIG_PATHS.TAP_LINKS)) &&
    set(globalConfig, GLOBAL_CONFIG_PATHS.TAP_LINKS, {})

  // Save the link to the global config
  addGlobalConfigProp(
    globalConfig,
    linkPath,
    tapPath
  )

  Logger.success(`Successfully linked tap '${tapName}' => '${tapPath}'`)
  Logger.empty()

}

/**
 * Creates a link in the global config to a tap's path by name
 * @param {*} args
 *
 * @returns {void}
 */
const linkTap = async args => {
  const { command, options, tasks, globalConfig } = args

  // Get the args needed to link the tap
  const { tapName, tapPath } = getArgs(args)

  // Check if the link alread exists, and if we should overwrite it
  const addLink = await ensureAddLink(globalConfig, tapName)

  // Build the path in the globalConfig where the link will be saved
  const linkPath = `${GLOBAL_CONFIG_PATHS.TAP_LINKS}.${tapName}`

  // Check if we should add the link, or log that the link was canceled!
  addLink
    ? addTapLink(globalConfig, linkPath, tapName, tapPath)
    : Logger.info(`Tap link canceled!`) || Logger.empty()

}

module.exports = {
  name: 'link',
  alias: [ 'ln' ],
  action: linkTap,
  description: `Links a tap's path to the global config`,
  example: 'keg tap link <options>',
  options: {
    name: 'Name used to access the linked tap.',
    path: `Path to the local tap directory. Example => /Users/developer/taps/my-tap.\nDefaults to current directory.`,
  }
}