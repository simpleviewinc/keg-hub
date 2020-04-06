const { Logger } = require('KegLog')
const inquirer = require('inquirer')
const { get, set, isObj } = require('jsutils')
const { ask } = require('KegQuestions')
const { GLOBAL_CONFIG_PATHS } = require('KegConst')
const { getArgument, addGlobalConfigProp } = require('KegUtils')

/**
 * Gets the arguments from the passed in options array
 * @param {Array} options - Arguments passed from the command line
 *
 * @returns {Object} - Contains the found options from the options array
 */
const getArgs = options => {
  const tapName = getArgument({ options, long: 'name', short: 'n' })
  if(!tapName)  throw new Error(`Tap name is required to link at tap!`)

  const tapPath = getArgument({ options, long: 'path', short: 'p', def: process.cwd() })

  return { tapName, tapPath }
}

/**
 * Checks if the link already exists, and if it does asks if the user wants to overwrite
 * @param {Object} globalConfig - Global config object for the keg-cli
 * @param {string} linkPath - Path to the linked tap
 *
 * @returns {boolean} - If the link should be added
 */
const ensureAddLink = async (globalConfig, linkPath, tapName) => {
  const exists = get(globalConfig, linkPath)

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

  !isObj(get(globalConfig, GLOBAL_CONFIG_PATHS.TAP_LINKS)) &&
    set(globalConfig, GLOBAL_CONFIG_PATHS.TAP_LINKS, {})

  addGlobalConfigProp(
    globalConfig,
    linkPath,
    tapPath
  )

  Logger.success(`Successfully linked tap '${tapName}' => '${tapPath}'`)
  Logger.emptyLine()

}

/**
 * Creates a link in the global config to a tap's path by name
 * @param {*} args
 *
 * @returns {void}
 */
const linkTap = async args => {
  const { command, options, tasks, globalConfig } = args
  
  const { tapName, tapPath } = getArgs(options)

  const linkPath = `${GLOBAL_CONFIG_PATHS.TAP_LINKS}.${tapName}`
  
  const addLink = await ensureAddLink(globalConfig, linkPath, tapName)

  addLink
    ? addTapLink(globalConfig, linkPath, tapName, tapPath)
    : Logger.info(`Tap link canceled!`) || Logger.emptyLine()

}

module.exports = {
  name: 'link',
  alias: [ 'ln' ],
  action: linkTap,
  description: `Links a tap's path to the global config`,
  example: 'keg tap link <options>',
  options: {
    name: 'Name used to access the linked tap.',
    p: `Path to the local tap directory. Example => /Users/developer/taps/my-tap.\nDefaults to current directory.`,
  }
}