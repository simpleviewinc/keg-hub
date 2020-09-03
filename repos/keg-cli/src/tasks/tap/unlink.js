const { Logger } = require('KegLog')
const { get, set, isObj } = require('@keg-hub/jsutils')
const { ask } = require('@keg-hub/ask-it')
const { GLOBAL_CONFIG_PATHS } = require('KegConst/constants')
const { removeGlobalConfigProp, getTapPath } = require('KegUtils')

/**
 * Confirms removing the tap link from the global config
 * @param {Object} globalConfig - Global config object for the keg-cli
 * @param {string} tapName - Path to the linked tap
 *
 * @returns {boolean} - If the link should be added
 */
const ensureRemoveLink = async (globalConfig, name) => {
  return getTapPath(globalConfig, name)
    ? ask.confirm(`Are you sure you want to unlink '${name}' tap?`)
    : false
}

/**
 * Removes the tap link from the global config object and saves it
 * @param {Object} globalConfig - Global config object for the keg-cli
 * @param {string} linkPath - Path to the linked tap
 * @param {string} tapPath - Path to the local tap directory
 *
 * @returns {void}
 */
const removeTapLink = (globalConfig, linkPath, tapName, tapPath) => {

  // Save the link to the global config
  removeGlobalConfigProp(
    globalConfig,
    linkPath
  )

  Logger.success(`Successfully unlinked '${tapName}' tap!`)
  Logger.empty()

}

/**
 * Removes a tap link in the global config
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const unlinkTap = async args => {
  const { command, globalConfig, options, params, tasks } = args
  const { name } = params

  // Check if the link alread exists, and if we should overwrite it
  const removeLink = await ensureRemoveLink(globalConfig, name)

  // Build the path in the globalConfig where the link will be saved
  const linkPath = `${GLOBAL_CONFIG_PATHS.TAP_LINKS}.${name}`

  // Check if we should add the link, or log that the link was canceled!
  removeLink
    ? removeTapLink(globalConfig, linkPath, name)
    : Logger.warn(`Tap unlink canceled!`) || Logger.empty()

}

module.exports = {
  unlink: {
    name: 'unlink',
    alias: [ 'ul', 'remove', 'rm' ],
    action: unlinkTap,
    description: `Unlinks a tap path in the global config`,
    example: 'keg tap unlink <options>',
    options: {
      name: {
        description: 'Name used to access the linked tap',
        required: true,
      }
    }
  }
}