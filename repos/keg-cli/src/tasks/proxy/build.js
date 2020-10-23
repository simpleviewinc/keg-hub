
const { Logger } = require('KegLog')

/**
 * Placeholder task to give a warning when trying to build the keg-proxy
 * <br>Logs a warning when called
 * @returns {void}
 */
const buildProxy = async args => {
  Logger.empty()
  Logger.warn(`The keg-proxy does not need to be built!`)
  Logger.empty()
  Logger.log(`Did you mean to start keg-proxy instead?`)
  Logger.empty()
}

module.exports = {
  build: {
    name: 'build',
    alias: [ 'bld', 'make' ],
    action: buildProxy,
    description: `Do not call this task. Call the "start" task instead!`,
    example: 'keg proxy start <options>',
    options: {}
  }
}