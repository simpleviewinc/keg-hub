const { Logger } = require('KegLog')
const { throwTaskFailed } = require('./throwTaskFailed')

/**
 * Formats and throws an error when a required argument is not included
 * @param {Object} task - Current task being run
 * @param {string} key - Name of the argument that's required
 * @param {Object} meta - Information about the missing required argument
 *
 * @returns {void}
 */
const throwRequired = (task, key, meta) => {
  const requireType = meta.required ? 'requires' : 'enforces a'

  Logger.error(`\n Task '${task.name}' ${requireType} '${key}' argument.`)

  meta.alias && Logger.message(`  * Alias:`, [ key[0] ].concat(meta.alias).join(' | '))
  meta.description && Logger.message(`  * Description:`, meta.description)
  meta.allowed && Logger.message(`  * Allowed Values:`, meta.allowed.join(' | '))
  meta.example && Logger.message(`  * Example:`, meta.example)

  Logger.empty()

  throwTaskFailed()
}

module.exports = {
  throwRequired
}