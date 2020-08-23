const { Logger } = require("@svkeg/ask-it/src/logger")

/**
 * Formats and throws an error when a required argument is not included
 * @param {Object} task - Current task being run
 * @param {string} key - Name of the argument that's required
 * @param {Object} meta - Information about the missing required argument
 * @param {boolean} skipTaskFailed - Should the throwTaskFailed call be skipped
 *
 * @returns {void}
 */
const throwRequired = (task, key, meta={}) => {
  const requireType = (meta.require || meta.required) ? 'requires' : 'enforces a'

  Logger.error(`\n Task '${task.name}' ${requireType} '${key}' argument.`)

  meta.alias && Logger.pair(`  * Alias:`, [ key[0] ].concat(meta.alias).join(' | '))
  meta.description && Logger.pair(`  * Description:`, meta.description)
  meta.allowed && Logger.pair(`  * Allowed Values:`, meta.allowed.join(' | '))
  meta.example && Logger.pair(`  * Example:`, meta.example)

  // Try catch the thrown error to get the stack trace.
  try {
    throw new Error(`Task failed!`)
  }
  catch(err){
    Logger.error(err.stack)
    process.exit(1)
  }

}

module.exports = {
  throwRequired
}
