const { Logger } = require('KegLog')
const { throwTaskFailed } = require('./throwTaskFailed')
/**
 * Logs an error when the current git branch can not be found
 *
 * @returns {void}
 */
const throwNoGitBranch = (context) => {

  Logger.empty()
  Logger.error(`Can not find current git branch for path "${ context }"`)
  Logger.empty()

  throwTaskFailed()

}


module.exports = {
  throwNoGitBranch
}