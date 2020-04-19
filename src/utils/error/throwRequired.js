const { Logger } = require('KegLog')

/**
 * Prints formatted a title and message
 * @param {string} title - Key of the info to print
 * @param {string} message - Information related to the title
 *
 * @returns {void}
 */
const printInfo = (title, message) => {
  console.log(
    Logger.colors.cyan(title),
    Logger.colors.brightWhite(message),
  )
}

/**
 * Formats and throws an error when a required argument is not included
 * @param {Object} task - Current task being run
 * @param {string} key - Name of the argument that's required
 * @param {Object} meta - Information about the missing required argument
 *
 * @returns {void}
 */
const throwRequired = (task, key, meta) => {

  Logger.error(`\n Task '${task.name}' requires '${key}' argument.`)

  meta.alias && printInfo(`  * Alias:`, [ key[0] ].concat(meta.alias).join(' | '))
  meta.description && printInfo(`  * Description:`, meta.description)
  meta.allowed && printInfo(`  * Allowed Values:`, meta.allowed.join(' | '))
  meta.example && printInfo(`  * Example:`, meta.example)

  Logger.empty()

  throw new Error(`Task failed!`)
}

module.exports = {
  throwRequired
}