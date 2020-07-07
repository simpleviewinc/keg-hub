const { Logger } = require('KegLog')
const { throwTaskFailed } = require('./throwTaskFailed')

/**
 * Formats and throws an error when a required argument is not included
 * @param {Object} task - Current task being run
 * @param {string} key - Name of the argument that's required
 * @param {Object} meta - Information about the missing required argument
 * @param {boolean} skipTaskFailed - Should the throwTaskFailed call be skipped
 *
 * @returns {void}
 */
const throwRequired = (task, key, meta, skipTaskFailed) => {
  const requireType = (meta.require || meta.required) ? 'requires' : 'enforces a'

  Logger.error(`\n Task '${task.name}' ${requireType} '${key}' argument.`)

  meta.alias && Logger.pair(`  * Alias:`, [ key[0] ].concat(meta.alias).join(' | '))
  meta.description && Logger.pair(`  * Description:`, meta.description)
  meta.allowed && Logger.pair(`  * Allowed Values:`, meta.allowed.join(' | '))
  meta.example && Logger.pair(`  * Example:`, meta.example)

  !skipTaskFailed && Logger.empty()
  !skipTaskFailed && throwTaskFailed()
}

module.exports = {
  throwRequired
}